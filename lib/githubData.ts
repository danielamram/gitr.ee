import { createClient } from "@/utils/supabase/client";
import { v4 as uuidv4 } from "uuid";

const supabase = createClient();

const GITHUB_API = "https://api.github.com";

// Helper to fetch from GitHub API with auth
async function githubFetch(endpoint: string, accessToken: string) {
  const res = await fetch(`${GITHUB_API}${endpoint}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/vnd.github+json",
    },
    next: { revalidate: 60 }, // cache for 1 min
  });
  if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
  return res.json();
}

// Fetch starred repos
export async function fetchAndStoreGithubStars(
  userId: string,
  accessToken: string
) {
  let page = 1;
  let hasMore = true;
  while (hasMore) {
    const stars = await githubFetch(
      `/user/starred?per_page=100&page=${page}`,
      accessToken
    );
    if (!Array.isArray(stars) || stars.length === 0) break;
    const upserts = stars.map((repo: any) => ({
      user_id: userId,
      repo_id: repo.id,
      repo_name: repo.full_name,
      repo_url: repo.html_url,
    }));
    if (upserts.length > 0) {
      await supabase
        .from("github_stars")
        .upsert(upserts, { onConflict: "user_id,repo_id" });
    }
    hasMore = stars.length === 100;
    page++;
  }
}

// Fetch follows (users the user follows)
export async function fetchAndStoreGithubFollows(
  userId: string,
  accessToken: string
) {
  let page = 1;
  let hasMore = true;
  while (hasMore) {
    const follows = await githubFetch(
      `/user/following?per_page=100&page=${page}`,
      accessToken
    );
    if (!Array.isArray(follows) || follows.length === 0) break;
    const upserts = follows.map((user: any) => ({
      user_id: userId,
      followed_user_id: user.id,
      followed_user_name: user.login,
      url: user.html_url,
    }));
    if (upserts.length > 0) {
      await supabase
        .from("github_follows")
        .upsert(upserts, { onConflict: "user_id,followed_user_id" });
    }
    hasMore = follows.length === 100;
    page++;
  }
}

// Fetch followers
export async function fetchAndStoreGithubFollowers(
  userId: string,
  accessToken: string
) {
  let page = 1;
  let hasMore = true;
  while (hasMore) {
    const followers = await githubFetch(
      `/user/followers?per_page=100&page=${page}`,
      accessToken
    );
    if (!Array.isArray(followers) || followers.length === 0) break;
    const upserts = followers.map((user: any) => ({
      user_id: userId,
      follower_user_id: user.id,
      follower_user_name: user.login,
      url: user.html_url,
    }));
    if (upserts.length > 0) {
      await supabase
        .from("github_followers")
        .upsert(upserts, { onConflict: "user_id,follower_user_id" });
    }
    hasMore = followers.length === 100;
    page++;
  }
}

// Fetch most used languages
export async function fetchAndStoreGithubLanguages(
  userId: string,
  accessToken: string
) {
  let page = 1;
  let hasMore = true;
  const languageCount: Record<string, number> = {};
  while (hasMore) {
    const repos = await githubFetch(
      `/user/repos?per_page=100&page=${page}&type=owner`,
      accessToken
    );
    if (!Array.isArray(repos) || repos.length === 0) break;
    for (const repo of repos) {
      if (repo.language) {
        languageCount[repo.language] = (languageCount[repo.language] || 0) + 1;
      }
    }
    hasMore = repos.length === 100;
    page++;
  }
  const upserts = Object.entries(languageCount).map(([language, count]) => ({
    user_id: userId,
    language,
    frequency: count,
  }));
  if (upserts.length > 0) {
    await supabase
      .from("github_languages")
      .upsert(upserts, { onConflict: "user_id,language" });
  }
}

// Fetch recent activity (public events)
export async function fetchAndStoreGithubActivity(
  userId: string,
  githubUsername: string,
  accessToken: string
) {
  const events = await githubFetch(
    `/users/${githubUsername}/events/public?per_page=30`,
    accessToken
  );
  if (!Array.isArray(events)) return;
  const upserts = events.map((event: any) => ({
    user_id: userId,
    action: event.type,
    repo: event.repo?.name,
    created_at: event.created_at,
    raw: event,
  }));
  if (upserts.length > 0) {
    await supabase
      .from("github_activity")
      .upsert(upserts, { onConflict: "user_id,created_at,action" });
  }
}

// Fetch starred repos by followed users
export async function fetchAndStoreFollowedUsersStars(
  currentUserId: string,
  accessToken: string,
  limitFollowedUsers: number = 20 // limit for performance, can be adjusted
) {
  const SPECIAL_UUID = "00000000-0000-0000-0000-000000000000";
  // 1. Get followed users from GitHub
  let page = 1;
  let hasMore = true;
  let followedUsers: any[] = [];
  while (hasMore && followedUsers.length < limitFollowedUsers) {
    const follows = await githubFetch(
      `/user/following?per_page=100&page=${page}`,
      accessToken
    );
    if (!Array.isArray(follows) || follows.length === 0) break;
    followedUsers = followedUsers.concat(follows);
    hasMore =
      follows.length === 100 && followedUsers.length < limitFollowedUsers;
    page++;
  }
  followedUsers = followedUsers.slice(0, limitFollowedUsers);

  // 2. For each followed user, fetch their starred repos
  for (const user of followedUsers) {
    const uuid = uuidv4();
    try {
      let starsPage = 1;
      let starsHasMore = true;
      while (starsHasMore) {
        const stars = await githubFetch(
          `/users/${user.login}/starred?per_page=100&page=${starsPage}`,
          accessToken
        );
        if (!Array.isArray(stars) || stars.length === 0) break;
        const upserts = stars.map((repo: any) => ({
          user_id: uuid,
          github_user_id: user.id,
          github_username: user.login,
          repo_id: repo.id,
          repo_name: repo.full_name,
          repo_url: repo.html_url,
        }));
        if (upserts.length > 0) {
          await supabase.from("github_stars").upsert(upserts, {
            onConflict: "user_id,repo_id",
          });
        }
        starsHasMore = stars.length === 100;
        starsPage++;
      }
    } catch (err) {
      // Fallback: skip this user on error
      // TODO: log error for analytics
      continue;
    }
  }
  // TODO: log feature usage for analytics
}

// Merge routine: Call this when a followed user signs up to update their stars
export async function mergeFollowedStarsToUser(
  userId: string,
  githubUserId: number
) {
  await supabase
    .from("github_stars")
    .update({ user_id: userId })
    .eq("github_user_id", githubUserId);
}

// Main function to fetch and store all data
export async function fetchAndStoreAllGithubData(
  userId: string,
  accessToken: string
) {
  await Promise.all([
    fetchAndStoreGithubStars(userId, accessToken),
    fetchAndStoreGithubFollows(userId, accessToken),
    fetchAndStoreGithubFollowers(userId, accessToken),
    fetchAndStoreGithubLanguages(userId, accessToken),
    fetchAndStoreFollowedUsersStars(userId, accessToken),
    // TODO: update to use the user's github username
    // fetchAndStoreGithubActivity(userId, "danielamram", accessToken),
  ]);
}
