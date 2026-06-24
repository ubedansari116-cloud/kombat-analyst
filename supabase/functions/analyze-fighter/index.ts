Deno.serve(async (req) => {
  return new Response(
    JSON.stringify({
      message: "Kombat Analyst backend is online.",
      function: "analyze-fighter",
      status: "success"
    }),
    {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    }
  );
});