import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client for reading summaries only
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseKey);

interface RepoInfo {
  name: string;
  description: string;
  readme?: string;
  topics?: string[];
}

/**
 * Fetches README content from GitHub
 */
export async function fetchRepoReadme(
  owner: string,
  repoName: string
): Promise<string | null> {
  try {
    const response = await fetch(
      `https://raw.githubusercontent.com/${owner}/${repoName}/main/README.md`
    );

    if (!response.ok) {
      // Try master branch if main fails
      const masterResponse = await fetch(
        `https://raw.githubusercontent.com/${owner}/${repoName}/master/README.md`
      );
      if (!masterResponse.ok) {
        return null;
      }
      return await masterResponse.text();
    }

    return await response.text();
  } catch (error) {
    console.error("Error fetching README:", error);
    return null;
  }
}

/**
 * Checks cache for existing summary
 */
async function getCachedSummary(repoName: string): Promise<string | null> {
  try {
    const { data, error } = await supabase
      .from("repo_summaries")
      .select("summary")
      .eq("repo_name", repoName)
      .single();

    if (error || !data) {
      return null;
    }

    return data.summary;
  } catch (error) {
    console.error("Error checking summary cache:", error);
    return null;
  }
}

/**
 * Generates a summary for a GitHub repository using OpenAI
 */
export async function summarizeRepo(repo: {
  name: string;
  owner: { login: string };
  description: string;
  topics?: string[];
}): Promise<string> {
  // Check cache first
  const cachedSummary = await getCachedSummary(
    `${repo.owner.login}/${repo.name}`
  );
  if (cachedSummary) {
    return cachedSummary;
  }

  const readme = await fetchRepoReadme(repo.owner.login, repo.name);

  const repoInfo = {
    name: `${repo.owner.login}/${repo.name}`,
    description: repo.description || "",
    readme: readme || undefined,
    topics: repo.topics,
  };

  try {
    // Call AI API (now handles caching on the server side)
    const response = await fetch("/api/generate-summary", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...repoInfo,
        shouldCache: true, // Tell the API to cache the result
      }),
    });

    if (!response.ok) {
      throw new Error(`API call failed with status: ${response.status}`);
    }

    const data = await response.json();
    return data.summary.trim();
  } catch (error) {
    console.error("Error generating summary:", error);
    return "A GitHub repository for code and development resources.";
  }
}
