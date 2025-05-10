import { fetchAndStoreAllGithubData } from "@/lib/githubData";
import { createClient } from "@/utils/supabase/server";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  console.log("Session data:", session);

  if (session) {
    // Get the user's access token and user ID
    const { user, provider_token } = session;
    const userId = user?.id;
    const githubAccessToken = provider_token;
    if (userId && githubAccessToken) {
      // Fetch and store GitHub data (do not block redirect)
      fetchAndStoreAllGithubData(userId, githubAccessToken).catch((err) => {
        // Optionally log error
        console.error("GitHub data fetch error:", err);
      });
    }
  } else if (code) {
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (data?.session) {
      console.log("Session data:", data.session);
      // Get the user's access token and user ID
      const { user, provider_token } = data.session;
      const userId = user?.id;
      const githubAccessToken = provider_token;
      if (userId && githubAccessToken) {
        // Fetch and store GitHub data (do not block redirect)
        fetchAndStoreAllGithubData(userId, githubAccessToken).catch((err) => {
          // Optionally log error
          console.error("GitHub data fetch error:", err);
        });
      }
    }
  }

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(new URL("/feed", request.url));
}
