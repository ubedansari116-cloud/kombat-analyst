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

  let imageName = data.name.toLowerCase().split(" ")[0];

  if (data.name === "Sean Strickland") {
  imageName = "Strickland";
}

  const profile = document.getElementById("fighter-profile");

  profile.innerHTML = `
    <div class="fighter-profile-card">

      <img
        src="images/${imageName}.jpg"
        alt="${data.name}"
        class="profile-image"
        onerror="this.src='https://placehold.co/600x600/FF6600/111111?text=${encodeURIComponent(data.name)}';"
      >

      <h1>${data.name}</h1>

      <h2>${data.nickname || "No Nickname"}</h2>

      <div class="fighter-badges">
        <span>${data.rank || "Unranked"}</span>
        <span>${data.division}</span>
      </div>

      <div class="stats-grid">

        <div class="stat-box">
          <h3>Record</h3>
          <p>${data.record}</p>
        </div>

        <div class="stat-box">
          <h3>Country</h3>
          <p>${data.country}</p>
        </div>

        <div class="stat-box">
          <h3>Reach</h3>
          <p>${data.reach}"</p>
        </div>

        <div class="stat-box">
          <h3>Striking Accuracy</h3>
          <p>${data.striking_accuracy}%</p>
        </div>

        <div class="stat-box">
          <h3>Striking Defense</h3>
          <p>${data.striking_defense}%</p>
        </div>

        <div class="stat-box">
          <h3>Takedown Avg</h3>
          <p>${data.takedown_avg}</p>
        </div>

        <div class="stat-box">
          <h3>Takedown Accuracy</h3>
          <p>${data.takedown_accuracy}%</p>
        </div>

        <div class="stat-box">
          <h3>Takedown Defense</h3>
          <p>${data.takedown_defense}%</p>
        </div>

        <div class="stat-box">
          <h3>KO %</h3>
          <p>${data.ko_percent}%</p>
        </div>

        <div class="stat-box">
          <h3>Submission %</h3>
          <p>${data.sub_percent}%</p>
        </div>

      </div>
      <div class="heatmap-section">

  <h2>Strike Heat Map</h2>

  <div class="heatmap-grid">

    <div class="heatmap-card">
      <h3>Offense</h3>

      <div class="heat-row">
        <span>Head</span>
        <div class="heat-bar"><div style="width: ${data.head_attack}%"></div></div>
        <strong>${data.head_attack}%</strong>
      </div>

      <div class="heat-row">
        <span>Body</span>
        <div class="heat-bar"><div style="width: ${data.body_attack}%"></div></div>
        <strong>${data.body_attack}%</strong>
      </div>

      <div class="heat-row">
        <span>Legs</span>
        <div class="heat-bar"><div style="width: ${data.leg_attack}%"></div></div>
        <strong>${data.leg_attack}%</strong>
      </div>
    </div>

    <div class="heatmap-card">
      <h3>Defense</h3>

      <div class="heat-row">
        <span>Head</span>
        <div class="heat-bar"><div style="width: ${data.head_defense}%"></div></div>
        <strong>${data.head_defense}%</strong>
      </div>

      <div class="heat-row">
        <span>Body</span>
        <div class="heat-bar"><div style="width: ${data.body_defense}%"></div></div>
        <strong>${data.body_defense}%</strong>
      </div>

      <div class="heat-row">
        <span>Legs</span>
        <div class="heat-bar"><div style="width: ${data.leg_defense}%"></div></div>
        <strong>${data.leg_defense}%</strong>
      </div>
    </div>

  </div>

</div>
    </div>
  `;
}

loadFighter();