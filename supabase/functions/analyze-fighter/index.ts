const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY");

Deno.serve(async (_req) => {
  return new Response(
    JSON.stringify({
      message: "Kombat Analyst backend is online.",
      geminiKeyLoaded: Boolean(GEMINI_API_KEY)
    }),
    {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    }
  );
});