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
let attackInsight = "Balanced Attacker";

if (data.head_attack >= 70)
  attackInsight = "Elite Head Hunter";

else if (data.leg_attack >= 25)
  attackInsight = "Leg Kick Specialist";

else if (data.body_attack >= 30)
  attackInsight = "Body Shot Specialist";


let defenseInsight = "Balanced Defender";

if (data.leg_defense >= 88)
  defenseInsight = "Elite Leg Defender";

else if (data.head_defense >= 55)
  defenseInsight = "Elite Head Defense";

else if (data.body_defense >= 80)
  defenseInsight = "Body Defense Specialist";

  const profile = document.getElementById("fighter-profile");

  profile.innerHTML = `
    <div class="fighter-profile-card">

      <div class="profile-hero">

  <img
    src="images/${imageName}.jpg"
    alt="${data.name}"
    class="profile-image"
    onerror="this.src='https://placehold.co/600x600/FF6600/111111?text=${encodeURIComponent(data.name)}';"
  >

  <div class="profile-hero-content">

    <div class="fighter-rank-badge">
      ${
        data.rank === "Champion"
          ? "🏆 Champion"
          : data.rank || "Unranked"
      }
    </div>

    <p class="profile-division">
      ${data.division}
    </p>

    <h1>${data.name}</h1>

    <h2>${data.nickname || "No Nickname"}</h2>

    <p class="profile-record">
      ${data.record}
    </p>

  </div>

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
    <p
      class="stat-number"
      data-target="${data.reach}"
    >
      0
    </p>
  </div>

  <div class="stat-box">
    <h3>Striking Accuracy</h3>
    <p
      class="stat-number"
      data-target="${data.striking_accuracy}"
    >
      0
    </p>
  </div>

  <div class="stat-box">
    <h3>Striking Defense</h3>
    <p
      class="stat-number"
      data-target="${data.striking_defense}"
    >
      0
    </p>
  </div>

  <div class="stat-box">
    <h3>Takedown Avg</h3>
    <p
      class="stat-number"
      data-target="${data.takedown_avg}"
    >
      0
    </p>
  </div>

  <div class="stat-box">
    <h3>Takedown Accuracy</h3>
    <p
      class="stat-number"
      data-target="${data.takedown_accuracy}"
    >
      0
    </p>
  </div>

  <div class="stat-box">
    <h3>Takedown Defense</h3>
    <p
      class="stat-number"
      data-target="${data.takedown_defense}"
    >
      0
    </p>
  </div>

  <div class="stat-box">
    <h3>KO %</h3>
    <p
      class="stat-number"
      data-target="${data.ko_percent}"
    >
      0
    </p>
  </div>

  <div class="stat-box">
    <h3>Submission %</h3>
    <p
      class="stat-number"
      data-target="${data.sub_percent}"
    >
      0
    </p>
  </div>

</div>
      <div class="heatmap-section">

  <h2>Strike Heat Map</h2>
  <div class="insight-grid">

  <div class="insight-card">
    <span>OFFENSIVE PROFILE</span>
    <h3>${attackInsight}</h3>
  </div>

  <div class="insight-card">
    <span>DEFENSIVE PROFILE</span>
    <h3>${defenseInsight}</h3>
  </div>

</div>

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
function animateStats() {

  const stats =
    document.querySelectorAll(".stat-number");

  stats.forEach((stat) => {

    const target =
      Number(stat.dataset.target);

    let current = 0;

    const increment =
      target / 40;

    const updateCounter = () => {

      current += increment;

      if (current >= target) {

        stat.textContent =
          target + "%";

        return;
      }

      stat.textContent =
        Math.floor(current) + "%";

      requestAnimationFrame(updateCounter);

    };

    updateCounter();

  });

}

setTimeout(animateStats, 600);