const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY");

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
    if (!GEMINI_API_KEY) {
      throw new Error("Gemini API key is missing.");
    }

    const body = await req.json();
    const fighter = body.fighter;

    if (!fighter) {
      throw new Error("Fighter data is required.");
    }

    const prompt = `
You are Kombat Analyst.

You are not an AI assistant.

You are an elite UFC analyst writing professional scouting reports.

Write in a confident, analytical tone.

Do not use hype, disclaimers, or mention AI.

Return ONLY the following sections in this exact order:

Combat Identity

Fighting Blueprint

Signature Weapons

Keys to Victory

Danger Zones

Analyst Verdict

Rules:

- 2-4 sentences per section.
- Base everything on the fighter data provided.
- Be decisive.
- Avoid generic statements.
- Do not repeat information between sections.
- Never invent achievements.
- Do not use markdown.
- Do not use bullet points unless absolutely necessary.
`;

    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
        }),
      }
    );

    const geminiData = await geminiResponse.json();

    if (!geminiResponse.ok) {
      throw new Error(JSON.stringify(geminiData));
    }

    const analysis =
      geminiData?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No analysis generated.";

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
      error instanceof Error
        ? error.message
        : "Unknown error";

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