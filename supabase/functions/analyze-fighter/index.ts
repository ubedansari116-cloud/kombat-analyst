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
You are Kombat Analyst, an elite MMA intelligence analyst.

Write a concise Combat Intelligence report for this fighter.

Fighter data:
Name: ${fighter.name}
Nickname: ${fighter.nickname || "N/A"}
Division: ${fighter.division}
Record: ${fighter.record}
Country: ${fighter.country}
Reach: ${fighter.reach}
Primary Style: ${fighter.primary_style}
Secondary Style: ${fighter.secondary_style}
Traits: ${fighter.trait_1}, ${fighter.trait_2}, ${fighter.trait_3}
Striking Accuracy: ${fighter.striking_accuracy}%
Striking Defense: ${fighter.striking_defense}%
Takedown Average: ${fighter.takedown_avg}
Takedown Accuracy: ${fighter.takedown_accuracy}%
Takedown Defense: ${fighter.takedown_defense}%
KO Percent: ${fighter.ko_percent}%
Submission Percent: ${fighter.sub_percent}%

Format the response exactly like this:

Combat Identity:
[one powerful identity line]

How They Fight:
[2-3 sentences]

Primary Weapons:
- [weapon]
- [weapon]
- [weapon]

Win Conditions:
- [condition]
- [condition]
- [condition]

Danger Areas:
- [risk]
- [risk]

Overall Assessment:
[2-3 sentences]
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