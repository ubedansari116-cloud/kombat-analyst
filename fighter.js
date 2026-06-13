const SUPABASE_URL = "https://xrjxoyfpkthkziodmfta.supabase.co";

const SUPABASE_ANON_KEY = "sb_publishable_jOtYU_rtJRq_2kuG3OyUVA_H5ugva2t";

const supabaseClient = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);

function getImageName(fighterName) {
  if (fighterName === "Sean Strickland") return "Strickland";
  if (fighterName === "Sean O'Malley") return "sean";

  return fighterName.toLowerCase().split(" ")[0];
}
function getFighterImage(fighter) {
  return fighter.image_url ||
    `images/${getImageName(fighter.name)}.jpg`;
}
function generateDangerZones(fighter) {

  let zones = [];

  if (fighter.primary_style === "Pressure Wrestler") {

    zones = [
      "Cage pressure exchanges",
      "Extended grappling sequences",
      "Late-round attritional battles",
      "Clinch transitions"
    ];

  }

  else if (fighter.primary_style === "Distance Striker") {

    zones = [
      "Long-range striking exchanges",
      "Open space movement",
      "Counter-entry moments",
      "Rhythm striking sequences"
    ];

  }

  else if (fighter.primary_style === "Submission Hunter") {

    zones = [
      "Scrambles",
      "Transitional grappling",
      "Submission chains",
      "Chaotic positional exchanges"
    ];

  }

  else {

    zones = [
      "Momentum swings",
      "Mixed striking exchanges",
      "Pressure transitions"
    ];

  }

  return zones;
}

function generateHistoricalComparison(fighter) {

  if (fighter.primary_style === "Pressure Wrestler") {
    return "Built around relentless pressure wrestling systems similar to dominant control-heavy grappling archetypes seen throughout MMA history.";
  }

  if (fighter.primary_style === "Distance Striker") {
    return "Resembles historical range-management strikers who controlled fights through movement, precision, and defensive spacing.";
  }

  if (fighter.primary_style === "Submission Hunter") {
    return "Fits the lineage of opportunistic submission specialists capable of turning chaotic exchanges into immediate finishing threats.";
  }

  if (fighter.primary_style === "Kickboxer") {
    return "Reflects layered kickboxing archetypes focused on tempo control, distance striking, and technical shot selection.";
  }

  return "Represents a modern hybrid MMA archetype blending multiple combat systems together.";
}

function generateMetaRelevance(fighter) {

  if (fighter.primary_style === "Pressure Wrestler") {
    return "Pressure wrestling remains one of the most dominant modern MMA systems because it consistently controls positioning, tempo, and scoring opportunities.";
  }

  if (fighter.primary_style === "Distance Striker") {
    return "Modern distance striking remains highly effective when combined with elite footwork, defensive awareness, and anti-pressure systems.";
  }

  if (fighter.primary_style === "Submission Hunter") {
    return "Submission-heavy fighters remain dangerous in modern MMA due to evolving scramble systems and transitional grappling threats.";
  }

  if (fighter.primary_style === "Well Rounded MMA Fighter") {
    return "Modern MMA increasingly rewards adaptable fighters capable of shifting between striking, wrestling, and grappling seamlessly.";
  }

  return "This archetype remains relevant through layered adaptability and evolving combat integration.";
}

function generateWinConditions(
  fighter
) {

  let conditions = [];

  // Pressure Wrestler

  if (
    fighter.primary_style ===
    "Pressure Wrestler"
  ) {

    conditions = [
      "Forces opponents backward toward cage",
      "Builds attritional pressure over rounds",
      "Chains takedowns to exhaust opponents",
      "Breaks striking rhythm through control"
    ];

  }

  // Distance Striker

  else if (
    fighter.primary_style ===
    "Distance Striker"
  ) {

    conditions = [
      "Controls range and punishes entries",
      "Wins through long-distance striking",
      "Maintains movement and defensive spacing",
      "Accumulates damage while avoiding pressure"
    ];

  }

  // Submission Hunter

  else if (
    fighter.primary_style ===
    "Submission Hunter"
  ) {

    conditions = [
      "Capitalizes on scrambles and transitions",
      "Punishes positional mistakes instantly",
      "Creates dangerous submission chains",
      "Turns aggressive pressure into grappling traps"
    ];

  }

  // Kickboxer

  else if (
    fighter.primary_style ===
    "Kickboxer"
  ) {

    conditions = [
      "Controls tempo through kick variety",
      "Maintains preferred striking range",
      "Punishes predictable entries",
      "Disrupts rhythm using layered striking attacks"
    ];

  }

  // Pressure Boxer

  else if (
    fighter.primary_style ===
    "Pressure Boxer"
  ) {

    conditions = [
      "Overwhelms opponents with pocket pressure",
      "Accumulates damage through combinations",
      "Breaks defensive composure over time",
      "Forces exchanges at dangerous boxing range"
    ];

  }

  // Chain Wrestler

  else if (
    fighter.primary_style ===
    "Chain Wrestler"
  ) {

    conditions = [
      "Sustains relentless takedown attempts",
      "Exhausts opponents through grappling pace",
      "Wins positional battles repeatedly",
      "Removes striking rhythm through constant wrestling"
    ];

  }

  // Well Rounded

  else if (
    fighter.primary_style ===
    "Well Rounded MMA Fighter"
  ) {

    conditions = [
      "Adapts dynamically to matchup conditions",
      "Mixes striking and grappling seamlessly",
      "Punishes predictable tactical patterns",
      "Creates layered threats across all phases"
    ];

  }

  // fallback

  else {

    conditions = [
      "Uses layered offensive systems",
      "Adapts to evolving fight conditions",
      "Creates pressure through mixed threats"
    ];

  }

  return conditions;

}

function generateMatchupTendencies(fighter) {
  let bestAgainst = [];
  let dangerAgainst = [];

  if (fighter.primary_style === "Pressure Wrestler") {
    bestAgainst = [
      "Distance Strikers",
      "Low-output counter fighters",
      "Pure kickboxers",
      "Fighters with weak cage defense"
    ];

    dangerAgainst = [
      "Submission Hunters",
      "Explosive scramblers",
      "Elite anti-wrestlers",
      "Fast lateral movers"
    ];
  }

  else if (fighter.primary_style === "Distance Striker") {
    bestAgainst = [
      "Slow pressure fighters",
      "Predictable strikers",
      "Low-mobility fighters",
      "Basic pocket boxers"
    ];

    dangerAgainst = [
      "Pressure Wrestlers",
      "Cage cutters",
      "Chain Wrestlers",
      "Relentless pressure fighters"
    ];
  }

  else if (fighter.primary_style === "Submission Hunter") {
    bestAgainst = [
      "Aggressive wrestlers",
      "Overcommitting grapplers",
      "Chaos exchanges",
      "Scramble-heavy opponents"
    ];

    dangerAgainst = [
      "Elite top control fighters",
      "Disciplined distance strikers",
      "Positional grapplers",
      "Low-risk control wrestlers"
    ];
  }

  else if (fighter.primary_style === "Kickboxer") {
    bestAgainst = [
      "Basic boxers",
      "Low-pressure strikers",
      "Slow forward movers",
      "Fighters who stay at kicking range"
    ];

    dangerAgainst = [
      "Pressure Wrestlers",
      "Chain Wrestlers",
      "Cage pressure fighters",
      "Clinch-heavy opponents"
    ];
  }

  else if (fighter.primary_style === "Pressure Boxer") {
    bestAgainst = [
      "Passive fighters",
      "Low-output counter strikers",
      "Rhythm-dependent strikers",
      "Fighters uncomfortable in pocket exchanges"
    ];

    dangerAgainst = [
      "Technical counter strikers",
      "Elite footwork fighters",
      "Wrestling-heavy opponents",
      "Long-range kickboxers"
    ];
  }

  else if (fighter.primary_style === "Chain Wrestler") {
    bestAgainst = [
      "Distance Strikers",
      "Kickboxers",
      "Weak cardio fighters",
      "Fighters with poor get-up ability"
    ];

    dangerAgainst = [
      "Submission Hunters",
      "Explosive scramblers",
      "Elite anti-wrestlers",
      "Dangerous counter grapplers"
    ];
  }

  else if (fighter.primary_style === "Well Rounded MMA Fighter") {
    bestAgainst = [
      "One-dimensional fighters",
      "Predictable specialists",
      "Style-limited opponents",
      "Fighters with major phase weaknesses"
    ];

    dangerAgainst = [
      "Elite specialists",
      "Extreme pressure archetypes",
      "Power finishers",
      "Dominant physical advantages"
    ];
  }

  else {
    bestAgainst = [
      "Predictable opponents",
      "Fighters with limited adaptability",
      "Single-phase specialists"
    ];

    dangerAgainst = [
      "Elite pressure fighters",
      "Dangerous finishers",
      "Highly adaptive opponents"
    ];
  }

  return {
    bestAgainst,
    dangerAgainst
  };
}

function generateStyleBreakdown(
  fighter
) {

  let strengths = [];
  let weaknesses = [];

  // Pressure Wrestler

  if (
    fighter.primary_style ===
    "Pressure Wrestler"
  ) {

    strengths = [
      "Elite cage pressure",
      "Chain wrestling control",
      "High cardio pressure",
      "Neutralizes range striking"
    ];

    weaknesses = [
      "Submission threats",
      "Dangerous scramblers",
      "Counter knees",
      "Fast lateral movement"
    ];

  }

  // Distance Striker

  else if (
    fighter.primary_style ===
    "Distance Striker"
  ) {

    strengths = [
      "Range management",
      "Long-distance striking",
      "Footwork control",
      "Entry punishment"
    ];

    weaknesses = [
      "Cage pressure",
      "Chain wrestling",
      "Sustained pressure"
    ];

  }

  // Submission Hunter

  else if (
    fighter.primary_style ===
    "Submission Hunter"
  ) {

    strengths = [
      "Submission danger",
      "Scramble finishing ability",
      "Opportunistic grappling",
      "Punishes reckless wrestling"
    ];

    weaknesses = [
      "Heavy top pressure",
      "Positional control wrestlers",
      "Distance striking control"
    ];

  }

  // Kickboxer

  else if (
    fighter.primary_style ===
    "Kickboxer"
  ) {

    strengths = [
      "Kick variety",
      "Range striking",
      "Distance control",
      "Intercept attacks"
    ];

    weaknesses = [
      "Wrestling pressure",
      "Clinch control",
      "Cage cutting"
    ];

  }

  // Well Rounded

  else if (
    fighter.primary_style ===
    "Well Rounded MMA Fighter"
  ) {

    strengths = [
      "Adaptability",
      "Layered offense",
      "Strategic flexibility",
      "Matchup versatility"
    ];

    weaknesses = [
      "Can lack specialization",
      "Vulnerable to elite specialists",
      "Sometimes less dangerous in single domains"
    ];

  }

  // fallback

  else {

    strengths = [
      "Layered offensive systems",
      "Multiple combat tools",
      "Adaptable engagement options"
    ];

    weaknesses = [
      "Can become vulnerable under sustained pressure",
      "Matchup dependent effectiveness"
    ];

  }

  return {
    strengths,
    weaknesses
  };

}
function generateFighterAnalysis(fighter) {
  if (fighter.primary_style === "Pressure Wrestler") {
    return `${fighter.name} builds success through relentless pressure, positional control, and sustained grappling exchanges. Their style is designed to compress space, force defensive reactions, and gradually overwhelm opponents through pace and control.`;
  }

  if (fighter.primary_style === "Distance Striker") {
    return `${fighter.name} relies heavily on range management, distance striking, and controlled engagements. Their effectiveness increases when they maintain open space and punish entries before opponents establish pressure.`;
  }

  if (fighter.primary_style === "Submission Hunter") {
    return `${fighter.name} creates danger through opportunistic grappling sequences, scrambles, and transitional exchanges. Even small positional mistakes can rapidly become fight-ending submission threats.`;
  }

  if (fighter.primary_style === "Well Rounded MMA Fighter") {
    return `${fighter.name} operates through layered adaptability across striking, wrestling, and grappling exchanges. Their effectiveness comes from adjusting dynamically to different matchup conditions rather than relying on a single system.`;
  }

  if (fighter.primary_style === "Kickboxer") {
    return `${fighter.name} uses layered kickboxing, range control, and striking variety to manage engagements from distance. Their success often depends on maintaining rhythm and avoiding extended grappling pressure.`;
  }

  if (fighter.primary_style === "Pressure Boxer") {
    return `${fighter.name} pressures opponents through boxing rhythm, pocket exchanges, and forward movement. Their success often comes from forcing defensive reactions and breaking opponent comfort over time.`;
  }

  if (fighter.primary_style === "Chain Wrestler") {
    return `${fighter.name} creates pressure through repeated wrestling attempts, transitions, and pace accumulation. Their style is built to force opponents into constant defensive decisions.`;
  }

  return `${fighter.name} brings a layered combat style that blends multiple offensive and defensive systems across striking and grappling exchanges.`;
}

async function loadFighter() {
  const params = new URLSearchParams(window.location.search);
  const fighterId = params.get("id");

  const profile = document.getElementById("fighter-profile");

  if (!fighterId) {
    profile.innerHTML = "<h1>Fighter not found.</h1>";
    return;
  }

  const { data, error } = await supabaseClient
    .from("fighters")
    .select("*")
    .eq("id", fighterId)
    .single();

  if (error || !data) {
    console.error(error);
    profile.innerHTML = "<h1>Fighter not found.</h1>";
    return;
  }

  const imageName = getImageName(data.name);

  let attackInsight = "Balanced Attacker";

  if (data.head_attack >= 70) {
    attackInsight = "Elite Head Hunter";
  } else if (data.leg_attack >= 25) {
    attackInsight = "Leg Kick Specialist";
  } else if (data.body_attack >= 30) {
    attackInsight = "Body Shot Specialist";
  }

  let defenseInsight = "Balanced Defender";

  if (data.leg_defense >= 88) {
    defenseInsight = "Elite Leg Defender";
  } else if (data.head_defense >= 55) {
    defenseInsight = "Elite Head Defense";
  } else if (data.body_defense >= 80) {
    defenseInsight = "Body Defense Specialist";
  }

  const fighterAnalysis = generateFighterAnalysis(data);

  const styleBreakdown = generateStyleBreakdown(data);

  const matchupTendencies = generateMatchupTendencies(data);

  const winConditions = generateWinConditions(data);

  const dangerZones =
  generateDangerZones(data);
  
  const historicalComparison =
  generateHistoricalComparison(data);
  
  const metaRelevance =
  generateMetaRelevance(data);

  profile.innerHTML = `
    <div class="fighter-profile-card">

      <div class="cinematic-hero">

  <div class="cinematic-overlay"></div>

  <div class="cinematic-content">

    <div class="cinematic-image-side">

      <img
        src="${getFighterImage(data)}"
        alt="${data.name}"
        class="cinematic-fighter-image"
        onerror="this.src='https://placehold.co/600x600/111827/FBBF24?text=${encodeURIComponent(data.name)}';"
      >

    </div>

    <div class="cinematic-info-side">

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

      <p class="fighter-intro-text">
        ${fighterAnalysis}
      </p>

    </div>

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
          <p>${data.reach}"</p>
        </div>

        <div class="stat-box">
          <h3>Striking Accuracy</h3>
          <p class="stat-number" data-target="${data.striking_accuracy}">0</p>
        </div>

        <div class="stat-box">
          <h3>Striking Defense</h3>
          <p class="stat-number" data-target="${data.striking_defense}">0</p>
        </div>

        <div class="stat-box">
          <h3>Takedown Avg</h3>
          <p>${data.takedown_avg}</p>
        </div>

        <div class="stat-box">
          <h3>Takedown Accuracy</h3>
          <p class="stat-number" data-target="${data.takedown_accuracy}">0</p>
        </div>

        <div class="stat-box">
          <h3>Takedown Defense</h3>
          <p class="stat-number" data-target="${data.takedown_defense}">0</p>
        </div>

        <div class="stat-box">
          <h3>KO %</h3>
          <p class="stat-number" data-target="${data.ko_percent}">0</p>
        </div>

        <div class="stat-box">
          <h3>Submission %</h3>
          <p class="stat-number" data-target="${data.sub_percent}">0</p>
        </div>

      </div>
      <div class="combat-dna">

  <h3>Combat DNA</h3>

  <div class="dna-styles">

    <span class="dna-style primary-style">
      ${data.primary_style || "Unknown Primary Style"}
    </span>

    <span class="dna-style secondary-style">
      ${data.secondary_style || "Unknown Secondary Style"}
    </span>

  </div>

  <div class="dna-traits">

    <span class="dna-trait">
      ${data.trait_1 || "Trait Unknown"}
    </span>

    <span class="dna-trait">
      ${data.trait_2 || "Trait Unknown"}
    </span>

    <span class="dna-trait">
      ${data.trait_3 || "Trait Unknown"}
    </span>

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
              <div class="heat-bar">
                <div style="width: ${data.head_attack}%"></div>
              </div>
              <strong>${data.head_attack}%</strong>
            </div>

            <div class="heat-row">
              <span>Body</span>
              <div class="heat-bar">
                <div style="width: ${data.body_attack}%"></div>
              </div>
              <strong>${data.body_attack}%</strong>
            </div>

            <div class="heat-row">
              <span>Legs</span>
              <div class="heat-bar">
                <div style="width: ${data.leg_attack}%"></div>
              </div>
              <strong>${data.leg_attack}%</strong>
            </div>

          </div>

          <div class="heatmap-card">
            <h3>Defense</h3>

            <div class="heat-row">
              <span>Head</span>
              <div class="heat-bar">
                <div style="width: ${data.head_defense}%"></div>
              </div>
              <strong>${data.head_defense}%</strong>
            </div>

            <div class="heat-row">
              <span>Body</span>
              <div class="heat-bar">
                <div style="width: ${data.body_defense}%"></div>
              </div>
              <strong>${data.body_defense}%</strong>
            </div>

            <div class="heat-row">
              <span>Legs</span>
              <div class="heat-bar">
                <div style="width: ${data.leg_defense}%"></div>
              </div>
              <strong>${data.leg_defense}%</strong>
            </div>

          </div>

        </div>

      </div>

    </div>

      
      <div class="style-breakdown-grid">

  <div class="style-box strengths-box">

    <h2>Style Strengths</h2>

    ${styleBreakdown.strengths
      .map(
        item => `
          <p>✓ ${item}</p>
        `
      )
      .join("")}

  </div>

  <div class="style-box weaknesses-box">

    <h2>Style Weaknesses</h2>

    ${styleBreakdown.weaknesses
      .map(
        item => `
          <p>✗ ${item}</p>
        `
      )
      .join("")}

  </div>

</div>

<div class="matchup-tendencies-grid">

  <div class="tendency-box best-matchups-box">

    <h2>Best Matchups</h2>

    ${matchupTendencies.bestAgainst
      .map(
        item => `
          <p>✓ ${item}</p>
        `
      )
      .join("")}

  </div>

  <div class="tendency-box danger-matchups-box">

    <h2>Danger Matchups</h2>

    ${matchupTendencies.dangerAgainst
      .map(
        item => `
          <p>⚠ ${item}</p>
        `
      )
      .join("")}

  </div>

</div>

<div class="win-conditions-box">

  <h2>Win Conditions</h2>

  ${winConditions
    .map(
      item => `
        <p>⚔ ${item}</p>
      `
    )
    .join("")}

</div>

<div class="danger-zones-box">

  <h2>Danger Zones</h2>

  ${dangerZones
    .map(
      item => `
        <p>☠ ${item}</p>
      `
    )
    .join("")}

</div>

<div class="historical-comparison-box">

  <h2>Historical Archetype</h2>

  <p>
    ${historicalComparison}
  </p>

</div>

<div class="meta-relevance-box">

  <h2>Modern Meta Relevance</h2>

  <p>
    ${metaRelevance}
  </p>

</div>
  `;

  animateStats();
}

function animateStats() {
  const stats = document.querySelectorAll(".stat-number");

  stats.forEach((stat) => {
    const target = Number(stat.dataset.target);

    if (Number.isNaN(target)) {
      stat.textContent = "N/A";
      return;
    }

    let current = 0;
    const increment = target / 40;

    const updateCounter = () => {
      current += increment;

      if (current >= target) {
        stat.textContent = target + "%";
        return;
      }

      stat.textContent = Math.floor(current) + "%";

      requestAnimationFrame(updateCounter);
    };

    updateCounter();
  });
}

loadFighter();