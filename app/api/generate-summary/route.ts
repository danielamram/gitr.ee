import { createAmazonBedrock } from "@ai-sdk/amazon-bedrock";
import { createClient } from "@supabase/supabase-js";
import { generateObject } from "ai";
import { NextResponse } from "next/server";
import { z } from "zod";

export const runtime = "edge";

const bedrock = createAmazonBedrock({
  region: process.env.AWS_REGION!,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
});

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
const supabase = createClient(supabaseUrl, supabaseServiceKey);

const model = bedrock("anthropic.claude-3-5-sonnet-20240620-v1:0");

export const maxDuration = 30;

export const summarizeRepoPrompt = (
  name: string,
  description: string,
  readme: string
) => `
You are a technical assistant helping developers discover useful GitHub repositories.

Summarize the following repository for a developer feed card in 2 sentences max.

Repository: ${name}

Description: ${description}

README:
${readme}

Respond with:
- What it does
- Who it's for
- Why it might be useful
Keep it concise and no filler.
`;

const summarySchema = z.object({
  summary: z
    .string()
    .describe("A concise summary of the repository in 2 sentences max"),
});

/**
 * Caches a generated summary in Supabase
 */
async function cacheSummary(repoName: string, summary: string): Promise<void> {
  try {
    await supabase.from("repo_summaries").upsert({
      repo_name: repoName,
      summary,
      created_at: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error caching summary:", error);
  }
}

export async function generateRepoSummary({
  name,
  description,
  readme,
}: {
  name: string;
  description: string;
  readme: string;
}): Promise<string> {
  const prompt = summarizeRepoPrompt(name, description, readme);

  const result = await generateObject({
    model,
    prompt,
    schema: summarySchema,
    temperature: 0.7,
  });

  return result.object.summary;
}

export async function POST(req: Request) {
  try {
    const { name, description, readme, shouldCache = false } = await req.json();

    if (!name || !description || !readme) {
      return NextResponse.json(
        { error: "Name, description, and readme are required" },
        { status: 400 }
      );
    }

    const summary = await generateRepoSummary({ name, description, readme });

    // Cache summary if requested
    if (shouldCache) {
      await cacheSummary(name, summary);
    }

    return NextResponse.json({ summary });
  } catch (error) {
    console.error("Error generating summary:", error);
    return NextResponse.json(
      { error: "Failed to generate summary" },
      { status: 500 }
    );
  }
}
