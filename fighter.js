const SUPABASE_URL = "https://xrjxoyfpkthkziodmfta.supabase.co";

const SUPABASE_ANON_KEY = "sb_publishable_jOtYU_rtJRq_2kuG3OyUVA_H5ugva2t";

const supabaseClient = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);

async function loadFighter() {
  const params = new URLSearchParams(window.location.search);

  const fighterId = params.get("id");

  const { data, error } = await supabaseClient
    .from("fighters")
    .select("*")
    .eq("id", fighterId)
    .single();

  if (error) {
    console.error(error);
    return;
  }

  const profile = document.getElementById("fighter-profile");

  profile.innerHTML = `
    <h1>${data.name}</h1>

    <p><strong>Nickname:</strong> ${data.nickname || "N/A"}</p>

    <p><strong>Division:</strong> ${data.division}</p>

    <p><strong>Record:</strong> ${data.record}</p>

    <p><strong>Country:</strong> ${data.country}</p>

    <p><strong>Reach:</strong> ${data.reach}"</p>

    <p><strong>Striking Accuracy:</strong> ${data.striking_accuracy}%</p>

    <p><strong>Striking Defense:</strong> ${data.striking_defense}%</p>

    <p><strong>Takedown Avg:</strong> ${data.takedown_avg}</p>

    <p><strong>Takedown Accuracy:</strong> ${data.takedown_accuracy}%</p>

    <p><strong>Takedown Defense:</strong> ${data.takedown_defense}%</p>

    <p><strong>KO %:</strong> ${data.ko_percent}%</p>

    <p><strong>Submission %:</strong> ${data.sub_percent}%</p>

    <p><strong>Rank:</strong> ${data.rank || "Unranked"}</p>
  `;
}

loadFighter();