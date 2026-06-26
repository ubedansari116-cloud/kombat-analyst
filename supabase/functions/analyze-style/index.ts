const OPENROUTER_API_KEY = Deno.env.get("OPENROUTER_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    if (!OPENROUTER_API_KEY) {
      throw new Error("OpenRouter API key missing.");
    }

    const { style } = await req.json();

    if (!style) {
      throw new Error("Style data is required.");
    }

    const prompt = `
You are Kombat Analyst.

You are an elite UFC analyst explaining combat style systems.

Do not mention AI.
Do not use markdown.
Be analytical, decisive, and specific.
Use short paragraphs.
Do not invent fighter achievements.

Analyze this combat style using the provided style data.

Return ONLY these sections, exactly in this order:

Style Philosophy

Core Weapons

Strengths

Weaknesses

Best Matchups

Danger Matchups

Modern MMA Relevance

Representative Fighters

Kombat Analyst Verdict

Style Data:
${JSON.stringify(style, null, 2)}
`;

    const openRouterResponse = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer":
            "https://ubedansari116-cloud.github.io/kombat-analyst/",
          "X-Title": "Kombat Analyst",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash",
          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
          temperature: 0.7,
          max_tokens: 1100,
        }),
      }
    );

    const data = await openRouterResponse.json();

    if (!openRouterResponse.ok) {
      throw new Error(JSON.stringify(data));
    }

    const analysis =
      data?.choices?.[0]?.message?.content ||
      "No style analysis generated.";

    return new Response(
      JSON.stringify({
        status: "success",
        analysis,
      }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown error";

    return new Response(
      JSON.stringify({
        status: "error",
        message,
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});