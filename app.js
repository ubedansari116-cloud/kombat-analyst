const SUPABASE_URL = "https://xrjxoyfpkthkziodmfta.supabase.co";

const SUPABASE_ANON_KEY = "sb_publishable_jOtYU_rtJRq_2kuG3OyUVA_H5ugva2t";

const supabaseClient = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);

let allFighters = [];

function getImageName(fighterName) {
  if (fighterName === "Sean Strickland") return "Strickland";
  if (fighterName === "Sean O'Malley") return "sean";

  return fighterName.toLowerCase().split(" ")[0];
}
function getFighterImage(fighter) {
  return fighter.image_url ||
    `images/${getImageName(fighter.name)}.jpg`;
}
function displayFighters(fighters) {
  const container = document.getElementById("fighters-container");
  const countElement = document.getElementById("fighter-count");

  countElement.textContent = `${fighters.length} fighters found`;
  if (!container) {
  return;
}
  container.innerHTML = "";
if (fighters.length === 0) {

  container.innerHTML = `
    <div class="empty-state">

      <h2>No Fighters Found</h2>

      <p>
        Try searching another fighter.
      </p>

    </div>
  `;

  return;
}
  fighters.forEach((fighter) => {
    const card = document.createElement("div");
    card.classList.add("fighter-card");

    card.addEventListener("click", () => {
      window.location.href = `fighter.html?id=${fighter.id}`;
    });

    const imageName = getImageName(fighter.name);

    card.innerHTML = `
      <div class="fighter-image-container">
        <img
          src="${getFighterImage(fighter)}"
          alt="${fighter.name}"
          class="fighter-image"
          onerror="this.src='https://placehold.co/600x600/111827/FBBF24?text=${encodeURIComponent(fighter.name)}';"
        >
      </div>

      <div class="fighter-card-overlay">

        <div class="fighter-rank-badge">
          ${
            fighter.rank === "Champion"
              ? "🏆 Champion"
              : fighter.rank || "Unranked"
          }
        </div>

        <div class="fighter-division">
          ${fighter.division}
        </div>

        <div class="fighter-name">
          ${fighter.name}
        </div>

        <div class="fighter-record">
          ${fighter.record}
        </div>

      </div>
    `;

    container.appendChild(card);
  });
}

function populateComparisonDropdowns() {
  const fighterA = document.getElementById("fighter-a");
  const fighterB = document.getElementById("fighter-b");

  fighterA.innerHTML = '<option value="">Select Fighter A</option>';
  fighterB.innerHTML = '<option value="">Select Fighter B</option>';

  allFighters.forEach((fighter) => {
    fighterA.innerHTML += `
      <option value="${fighter.id}">
        ${fighter.name}
      </option>
    `;

    fighterB.innerHTML += `
      <option value="${fighter.id}">
        ${fighter.name}
      </option>
    `;
  });
}

async function loadFighters() {
  const { data, error } = await supabaseClient
    .from("fighters")
    .select("*");

  if (error) {
    console.error("Supabase error:", error);
    return;
  }

  allFighters = data;

  displayFighters(allFighters);
  populateComparisonDropdowns();
}

function getWinnerClass(a, b) {
  if (Number(a) > Number(b)) return ["winner", ""];
  if (Number(b) > Number(a)) return ["", "winner"];
  return ["", ""];
}

function getWinnerIcon(a, b, side) {
  a = Number(a);
  b = Number(b);

  if (a === b) return "";
  if (side === "A" && a > b) return "🟢 ";
  if (side === "B" && b > a) return "🟢 ";

  return "";
}

function createComparisonRow(label, statA, statB, suffix = "") {
  const [classA, classB] = getWinnerClass(statA, statB);

  return `
    <tr>
      <td>${label}</td>

      <td class="${classA}">
        ${getWinnerIcon(statA, statB, "A")}
        ${statA}${suffix}
      </td>

      <td class="${classB}">
        ${getWinnerIcon(statA, statB, "B")}
        ${statB}${suffix}
      </td>
    </tr>
  `;
}

function calculateFighterScore(fighter) {
  return (
    Number(fighter.striking_accuracy) * 0.15 +
    Number(fighter.striking_defense) * 0.15 +
    Number(fighter.takedown_defense) * 0.20 +
    Number(fighter.ko_percent) * 0.15 +
    Number(fighter.sub_percent) * 0.15 +
    Number(fighter.head_attack) * 0.05 +
    Number(fighter.body_attack) * 0.05 +
    Number(fighter.leg_attack) * 0.05 +
    Number(fighter.head_defense) * 0.05
  );
}
function generateMomentumDynamics(
  fighterA,
  fighterB
) {

  let momentumNarrative = "";

  const fighterATraits = [
    fighterA.trait_1,
    fighterA.trait_2,
    fighterA.trait_3
  ];

  const fighterBTraits = [
    fighterB.trait_1,
    fighterB.trait_2,
    fighterB.trait_3
  ];

  // Aggressive momentum shifts

  if (
    fighterATraits.includes("Aggressive") ||
    fighterBTraits.includes("Aggressive")
  ) {

    momentumNarrative +=
      `Aggressive pressure sequences could rapidly shift momentum through damage accumulation and forced defensive reactions. `;

  }

  // Counter momentum danger

  if (
    fighterATraits.includes("Counter Heavy") ||
    fighterBTraits.includes("Counter Heavy")
  ) {

    momentumNarrative +=
      `Counter opportunities may dramatically alter momentum if entries become reckless during pressure exchanges. `;

  }

  // Chaos creates unstable momentum

  if (
    fighterATraits.includes("Chaos Fighter") ||
    fighterBTraits.includes("Chaos Fighter")
  ) {

    momentumNarrative +=
      `Chaotic exchanges and transitional scrambles may create unpredictable momentum swings throughout the fight. `;

  }

  // High pace overwhelms over time

  if (
    fighterATraits.includes("High Pace") ||
    fighterBTraits.includes("High Pace")
  ) {

    momentumNarrative +=
      `Sustained pace pressure may gradually force defensive deterioration and shift control over extended rounds. `;

  }

  // fallback

  if (momentumNarrative === "") {

    momentumNarrative =
      `Momentum may shift gradually through tactical adjustments, positional control, and accumulated pressure over time.`;

  }

  return momentumNarrative;

}
function generateUpsetPotential(
  fighterA,
  fighterB
) {

  let upsetNarrative = "";

  const fighterATraits = [
    fighterA.trait_1,
    fighterA.trait_2,
    fighterA.trait_3
  ];

  const fighterBTraits = [
    fighterB.trait_1,
    fighterB.trait_2,
    fighterB.trait_3
  ];

  let upsetDanger = 0;

  // Explosive danger

  upsetDanger +=
    fighterATraits.filter(
      trait => trait === "Explosive"
    ).length * 3;

  upsetDanger +=
    fighterBTraits.filter(
      trait => trait === "Explosive"
    ).length * 3;

  // Counter danger

  upsetDanger +=
    fighterATraits.filter(
      trait => trait === "Counter Heavy"
    ).length * 2;

  upsetDanger +=
    fighterBTraits.filter(
      trait => trait === "Counter Heavy"
    ).length * 2;

  // Submission threat

  if (
    fighterA.primary_style === "Submission Hunter"
  ) {
    upsetDanger += 4;
  }

  if (
    fighterB.primary_style === "Submission Hunter"
  ) {
    upsetDanger += 4;
  }

  // Chaos fighters increase unpredictability

  upsetDanger +=
    fighterATraits.filter(
      trait => trait === "Chaos Fighter"
    ).length * 3;

  upsetDanger +=
    fighterBTraits.filter(
      trait => trait === "Chaos Fighter"
    ).length * 3;

  // Narrative generation

  if (upsetDanger >= 14) {

    upsetNarrative =
      `Despite statistical advantages elsewhere, this matchup contains serious upset potential due to explosive offense, counter danger, and sudden momentum-shift opportunities.`;

  }

  else if (upsetDanger >= 9) {

    upsetNarrative =
      `The matchup contains meaningful upset pathways through counters, scrambles, pressure exchanges, or sudden finishing sequences.`;

  }

  else if (upsetDanger >= 5) {

    upsetNarrative =
      `While the matchup may appear controlled on paper, isolated momentum swings or positional mistakes could still create dangerous upset scenarios.`;

  }

  else {

    upsetNarrative =
      `The matchup appears relatively stable stylistically, with fewer sudden momentum-shift pathways likely to dramatically alter the expected fight trajectory.`;

  }

  return upsetNarrative;

}
function generateFinishProbability(
  fighterA,
  fighterB
) {

  let finishNarrative = "";

  const fighterATraits = [
    fighterA.trait_1,
    fighterA.trait_2,
    fighterA.trait_3
  ];

  const fighterBTraits = [
    fighterB.trait_1,
    fighterB.trait_2,
    fighterB.trait_3
  ];

  let finishDanger = 0;

  // Explosive danger

  finishDanger +=
    fighterATraits.filter(
      trait => trait === "Explosive"
    ).length * 3;

  finishDanger +=
    fighterBTraits.filter(
      trait => trait === "Explosive"
    ).length * 3;

  // Aggressive danger

  finishDanger +=
    fighterATraits.filter(
      trait => trait === "Aggressive"
    ).length * 2;

  finishDanger +=
    fighterBTraits.filter(
      trait => trait === "Aggressive"
    ).length * 2;

  // Power finishers

  if (
    fighterA.secondary_style === "Power Finisher"
  ) {
    finishDanger += 4;
  }

  if (
    fighterB.secondary_style === "Power Finisher"
  ) {
    finishDanger += 4;
  }

  // Submission hunters

  if (
    fighterA.primary_style === "Submission Hunter"
  ) {
    finishDanger += 3;
  }

  if (
    fighterB.primary_style === "Submission Hunter"
  ) {
    finishDanger += 3;
  }

  // Narrative generation

  if (finishDanger >= 14) {

    finishNarrative =
      `This matchup carries extremely high finishing danger due to explosive offense, aggressive exchanges, and multiple fight-ending pathways. Small defensive mistakes could immediately shift the outcome.`;

  }

  else if (finishDanger >= 9) {

    finishNarrative =
      `Both fighters possess meaningful finishing potential, particularly during momentum swings, pressure exchanges, and transitional sequences.`;

  }

  else if (finishDanger >= 5) {

    finishNarrative =
      `Finishing opportunities may emerge through accumulated pressure, counters, or positional mistakes, though the matchup may still develop through longer exchanges.`;

  }

  else {

    finishNarrative =
      `The matchup may lean more toward tactical pacing and controlled exchanges rather than immediate finishing sequences.`;

  }

  return finishNarrative;

}
function generateCardioDynamics(
  fighterA,
  fighterB
) {

  let cardioNarrative = "";

  const fighterATraits = [
    fighterA.trait_1,
    fighterA.trait_2,
    fighterA.trait_3
  ];

  const fighterBTraits = [
    fighterB.trait_1,
    fighterB.trait_2,
    fighterB.trait_3
  ];

  // High pace pressure

  if (
    fighterATraits.includes("High Pace") ||
    fighterBTraits.includes("High Pace")
  ) {

    cardioNarrative +=
      `Sustained pace and pressure may heavily influence cardio efficiency as the fight progresses. `;

  }

  // Wrestling fatigue

  if (
    fighterA.primary_style.includes("Wrestler") ||
    fighterB.primary_style.includes("Wrestler")
  ) {

    cardioNarrative +=
      `Extended grappling exchanges and wrestling pressure could gradually drain explosiveness and defensive reactions over multiple rounds. `;

  }

  // Durable fighters survive attrition

  if (
    fighterATraits.includes("Durable") &&
    fighterBTraits.includes("Durable")
  ) {

    cardioNarrative +=
      `Both fighters possess durability traits that may allow them to remain dangerous even during prolonged attritional sequences. `;

  }

  // fallback

  if (cardioNarrative === "") {

    cardioNarrative =
      `Cardio management and pacing adjustments may become increasingly important as momentum shifts across rounds.`;

  }

  return cardioNarrative;

}
function generateRoundDynamics(
  fighterA,
  fighterB
) {

  let dynamics = "";

  const fighterATraits = [
    fighterA.trait_1,
    fighterA.trait_2,
    fighterA.trait_3
  ];

  const fighterBTraits = [
    fighterB.trait_1,
    fighterB.trait_2,
    fighterB.trait_3
  ];

  // Explosive early danger

  if (
    fighterATraits.includes("Explosive") ||
    fighterBTraits.includes("Explosive")
  ) {

    dynamics +=
      `Early rounds may become highly dangerous due to explosive finishing potential and aggressive momentum swings. `;

  }

  // High pace pressure escalation

  if (
    fighterATraits.includes("High Pace") ||
    fighterBTraits.includes("High Pace")
  ) {

    dynamics +=
      `As the fight progresses, sustained pace and pressure could begin influencing cardio efficiency and defensive reactions. `;

  }

  // Durable attrition warfare

  if (
    fighterATraits.includes("Durable") &&
    fighterBTraits.includes("Durable")
  ) {

    dynamics +=
      `Both fighters possess durability traits that may allow the matchup to evolve into prolonged attritional exchanges over later rounds. `;

  }

  // Counter-heavy danger

  if (
    fighterATraits.includes("Counter Heavy") ||
    fighterBTraits.includes("Counter Heavy")
  ) {

    dynamics +=
      `Counter opportunities may become increasingly dangerous as pressure sequences and aggressive entries accumulate. `;

  }

  // Fallback

  if (dynamics === "") {

    dynamics =
      `The matchup may evolve gradually through positional adjustments, pacing changes, and tactical adaptation across rounds.`;

  }

  return dynamics;

}
function generateMetaInsight(
  fighterA,
  fighterB
) {

  let metaInsight = "";

  // Wrestler dominance

  if (
    fighterA.primary_style.includes("Wrestler") ||
    fighterB.primary_style.includes("Wrestler")
  ) {

    metaInsight =
      `Modern MMA has increasingly rewarded layered wrestling pressure, positional control, and pace management. Fighters capable of blending grappling with sustained pressure often shape the tempo of elite-level matchups.`;

  }

  // Well-rounded evolution

  else if (
    fighterA.primary_style ===
      "Well Rounded MMA Fighter" ||

    fighterB.primary_style ===
      "Well Rounded MMA Fighter"
  ) {

    metaInsight =
      `Modern championship-level MMA increasingly favors adaptable fighters capable of transitioning between striking, wrestling, and grappling without major weaknesses across phases of combat.`;

  }

  // Pressure fighting evolution

  else if (
    fighterA.primary_style.includes("Pressure") ||
    fighterB.primary_style.includes("Pressure")
  ) {

    metaInsight =
      `Aggressive pressure systems have become increasingly effective in modern MMA by disrupting rhythm, forcing defensive reactions, and limiting opponent comfort over extended exchanges.`;

  }

  // Generic fallback

  else {

    metaInsight =
      `Elite MMA continues evolving toward layered adaptability, strategic pacing, and fighters capable of managing multiple combat ranges under pressure.`;

  }

  return metaInsight;

}
function generateHistoricalInsight(
  fighterA,
  fighterB
) {

  let insight = "";

  // Wrestlers vs Distance Strikers

  if (
    fighterA.primary_style.includes("Wrestler") &&
    fighterB.primary_style === "Distance Striker"
  ) {

    insight =
      `Historically, pressure-based wrestling archetypes have performed strongly against distance strikers by reducing space, forcing defensive reactions, and controlling positioning over time.`;

  }

  else if (
    fighterB.primary_style.includes("Wrestler") &&
    fighterA.primary_style === "Distance Striker"
  ) {

    insight =
      `Historically, pressure-based wrestling archetypes have performed strongly against distance strikers by reducing space, forcing defensive reactions, and controlling positioning over time.`;

  }

  // Submission Hunter vs Wrestler

  else if (
    fighterA.primary_style === "Submission Hunter" &&
    fighterB.primary_style.includes("Wrestler")
  ) {

    insight =
      `Historically, aggressive wrestlers entering prolonged grappling exchanges against submission specialists can become vulnerable during scrambles and transitional positions.`;

  }

  else if (
    fighterB.primary_style === "Submission Hunter" &&
    fighterA.primary_style.includes("Wrestler")
  ) {

    insight =
      `Historically, aggressive wrestlers entering prolonged grappling exchanges against submission specialists can become vulnerable during scrambles and transitional positions.`;

  }

  // Kickboxer vs Pressure

  else if (
    fighterA.primary_style === "Kickboxer" &&
    fighterB.primary_style.includes("Pressure")
  ) {

    insight =
      `Historically, kickboxers facing sustained forward pressure often struggle once forced toward the cage and denied kicking range.`;

  }

  else if (
    fighterB.primary_style === "Kickboxer" &&
    fighterA.primary_style.includes("Pressure")
  ) {

    insight =
      `Historically, kickboxers facing sustained forward pressure often struggle once forced toward the cage and denied kicking range.`;

  }

  // Generic fallback

  else {

    insight =
      `Historically, matchups between layered MMA archetypes are often decided by adaptability, momentum shifts, and which fighter successfully imposes their preferred pace and positioning.`;

  }

  return insight;

}
function calculateFightVolatility(
  fighterA,
  fighterB
) {

  let volatilityScore = 0;

  const allTraits = [
    fighterA.trait_1,
    fighterA.trait_2,
    fighterA.trait_3,
    fighterB.trait_1,
    fighterB.trait_2,
    fighterB.trait_3
  ];

  // Explosive fighters increase volatility

  volatilityScore +=
    allTraits.filter(
      trait => trait === "Explosive"
    ).length * 3;

  // Aggressive fighters increase chaos

  volatilityScore +=
    allTraits.filter(
      trait => trait === "Aggressive"
    ).length * 2;

  // Chaos Fighters massively increase volatility

  volatilityScore +=
    allTraits.filter(
      trait => trait === "Chaos Fighter"
    ).length * 4;

  // Counter-heavy matchups create danger

  volatilityScore +=
    allTraits.filter(
      trait => trait === "Counter Heavy"
    ).length * 2;

  let volatilityDescription = "";

  if (volatilityScore >= 12) {

    volatilityDescription =
      `Both fighters bring explosive finishing potential and aggressive momentum swings into this matchup. Defensive mistakes could rapidly change the direction of the fight, especially during early exchanges and pressure sequences.`;

  }

  else if (volatilityScore >= 8) {

    volatilityDescription =
      `This matchup carries significant momentum-shift potential due to pressure, counter danger, and finishing threats. Small openings may quickly escalate into dangerous exchanges.`;

  }

  else if (volatilityScore >= 4) {

    volatilityDescription =
      `The matchup contains measured danger moments, particularly during transitions and pressure exchanges, though overall pacing may remain relatively controlled.`;

  }

  else {

    volatilityDescription =
      `This matchup is likely to develop through calculated exchanges, positional control, and tactical pacing rather than chaotic momentum swings.`;

  }

  return {
    volatilityScore,
    volatilityDescription
  };

}
function generateFightNarrative(
  fighterA,
  fighterB
) {

  let narrative = "";

  // Pressure vs Distance

  if (
    fighterA.primary_style === "Pressure Wrestler" &&
    fighterB.primary_style === "Distance Striker"
  ) {

    narrative =
      `${fighterA.name} will likely attempt to collapse distance early, forcing ${fighterB.name} into defensive reactions and grappling exchanges. If ${fighterB.name} cannot maintain range and lateral movement, sustained cage pressure may begin draining cardio and reducing striking rhythm.`;

  }

  // Counter vs Pressure

  else if (
    fighterA.primary_style === "Counter Striker" &&
    fighterB.primary_style === "Pressure Boxer"
  ) {

    narrative =
      `${fighterB.name}'s forward pressure creates opportunities for ${fighterA.name}'s counter timing. Early exchanges may become dangerous if aggressive entries are punished cleanly during pocket exchanges.`;

  }

  // Submission danger

  else if (
    fighterA.primary_style === "Submission Hunter" &&
    fighterB.primary_style.includes("Wrestler")
  ) {

    narrative =
      `${fighterB.name} may control wrestling exchanges early, but prolonged grappling sequences create constant submission danger from ${fighterA.name}. Scrambles and transitions could rapidly shift momentum.`;

  }

  // Kickboxer vs Wrestler

else if (
  fighterA.primary_style === "Kickboxer" &&
  fighterB.primary_style.includes("Wrestler")
) {

  narrative =
    `${fighterA.name} will likely try to maintain kicking range and punish entries, while ${fighterB.name} pressures forward searching for clinch control, takedowns, and top-position sequences. The key battle is whether ${fighterA.name} can keep the fight at striking distance before wrestling pressure changes the rhythm.`;

}

else if (
  fighterB.primary_style === "Kickboxer" &&
  fighterA.primary_style.includes("Wrestler")
) {

  narrative =
    `${fighterB.name} will likely try to maintain kicking range and punish entries, while ${fighterA.name} pressures forward searching for clinch control, takedowns, and top-position sequences. The key battle is whether ${fighterB.name} can keep the fight at striking distance before wrestling pressure changes the rhythm.`;

}
  // Generic fallback

  else {

    narrative =
      `${fighterA.name} and ${fighterB.name} bring contrasting combat approaches shaped by pressure, pace, timing, and defensive reactions. Small momentum swings could heavily influence how the matchup develops over time.`;

  }

  return narrative;

}
function generateFightVerdict(fighterA, fighterB, overallEdge) {
  let verdict = "";

  verdict += `${overallEdge} appears to hold the statistical edge in this matchup. `;

  if (
    fighterA.fighting_style?.includes("Wrestler") ||
    fighterA.fighting_style?.includes("Grappler")
  ) {
    verdict += `${fighterA.name}'s grappling-heavy style could force ${fighterB.name} into defensive scrambles. `;
  }

  if (
    fighterB.fighting_style?.includes("Wrestler") ||
    fighterB.fighting_style?.includes("Grappler")
  ) {
    verdict += `${fighterB.name}'s grappling threat could heavily influence the pace of the fight. `;
  }

  if (Number(fighterA.ko_percent) > Number(fighterB.ko_percent)) {
    verdict += `${fighterA.name} carries the stronger knockout threat. `;
  } else if (Number(fighterB.ko_percent) > Number(fighterA.ko_percent)) {
    verdict += `${fighterB.name} carries the stronger knockout threat. `;
  }

  if (Number(fighterA.sub_percent) > Number(fighterB.sub_percent)) {
    verdict += `${fighterA.name} is the more dangerous submission threat. `;
  } else if (Number(fighterB.sub_percent) > Number(fighterA.sub_percent)) {
    verdict += `${fighterB.name} is the more dangerous submission threat. `;
  }

  if (Number(fighterA.takedown_defense) > Number(fighterB.takedown_defense)) {
    verdict += `${fighterA.name}'s takedown defense may help them keep the fight in preferred positions.`;
  } else if (Number(fighterB.takedown_defense) > Number(fighterA.takedown_defense)) {
    verdict += `${fighterB.name}'s takedown defense may help them control where the fight happens.`;
  }

  return verdict;
}
function calculateTraitAdvantage(
  fighterA,
  fighterB
) {

  let fighterATraitEdge = 0;
  let fighterBTraitEdge = 0;

  const fighterATraits = [
    fighterA.trait_1,
    fighterA.trait_2,
    fighterA.trait_3
  ];

  const fighterBTraits = [
    fighterB.trait_1,
    fighterB.trait_2,
    fighterB.trait_3
  ];

  // Explosive fighters increase danger

  if (
    fighterATraits.includes("Explosive")
  ) {
    fighterATraitEdge += 3;
  }

  if (
    fighterBTraits.includes("Explosive")
  ) {
    fighterBTraitEdge += 3;
  }

  // Durable fighters survive pressure better

  if (
    fighterATraits.includes("Durable")
  ) {
    fighterATraitEdge += 2;
  }

  if (
    fighterBTraits.includes("Durable")
  ) {
    fighterBTraitEdge += 2;
  }

  // Pressure Heavy helps overwhelm distance styles

  if (
    fighterATraits.includes("Pressure Heavy") &&
    fighterB.primary_style === "Distance Striker"
  ) {
    fighterATraitEdge += 3;
  }

  if (
    fighterBTraits.includes("Pressure Heavy") &&
    fighterA.primary_style === "Distance Striker"
  ) {
    fighterBTraitEdge += 3;
  }

  // Counter Heavy helps against aggressive pressure

  if (
    fighterATraits.includes("Counter Heavy") &&
    fighterBTraits.includes("Aggressive")
  ) {
    fighterATraitEdge += 3;
  }

  if (
    fighterBTraits.includes("Counter Heavy") &&
    fighterATraits.includes("Aggressive")
  ) {
    fighterBTraitEdge += 3;
  }

  // High Pace pressures low-output fighters

  if (
    fighterATraits.includes("High Pace") &&
    fighterBTraits.includes("Low Output")
  ) {
    fighterATraitEdge += 4;
  }

  if (
    fighterBTraits.includes("High Pace") &&
    fighterATraits.includes("Low Output")
  ) {
    fighterBTraitEdge += 4;
  }

  return {
    fighterATraitEdge,
    fighterBTraitEdge
  };

}
function calculateStyleAdvantage(
  fighterA,
  fighterB
) {

  let fighterAStyleEdge = 0;
  let fighterBStyleEdge = 0;

  const styleA =
    fighterA.primary_style;

  const styleB =
    fighterB.primary_style;

  if (
    styleA === "Pressure Wrestler" &&
    styleB === "Distance Striker"
  ) {
    fighterAStyleEdge += 8;
  }

  else if (
    styleB === "Pressure Wrestler" &&
    styleA === "Distance Striker"
  ) {
    fighterBStyleEdge += 8;
  }

  if (
    styleA === "Counter Striker" &&
    styleB === "Pressure Boxer"
  ) {
    fighterAStyleEdge += 6;
  }

  else if (
    styleB === "Counter Striker" &&
    styleA === "Pressure Boxer"
  ) {
    fighterBStyleEdge += 6;
  }

  if (
    styleA === "Submission Hunter" &&
    styleB.includes("Wrestler")
  ) {
    fighterAStyleEdge += 5;
  }

  else if (
    styleB === "Submission Hunter" &&
    styleA.includes("Wrestler")
  ) {
    fighterBStyleEdge += 5;
  }

  if (
    styleA === "Kickboxer" &&
    styleB.includes("Wrestler")
  ) {
    fighterBStyleEdge += 7;
  }

  else if (
    styleB === "Kickboxer" &&
    styleA.includes("Wrestler")
  ) {
    fighterAStyleEdge += 7;
  }

  return {
    fighterAStyleEdge,
    fighterBStyleEdge
  };

}
function generateStyleInteraction(fighterA, fighterB) {
  const styleA = fighterA.primary_style;
  const styleB = fighterB.primary_style;

  let summary = "";

  if (styleA === "Pressure Wrestler" && styleB === "Distance Striker") {
    summary = `${fighterA.name}'s pressure wrestling is naturally built to collapse distance, deny space, and force ${fighterB.name} into defensive grappling exchanges.`;
  }

  else if (styleA === "Distance Striker" && styleB === "Pressure Wrestler") {
    summary = `${fighterB.name}'s pressure wrestling naturally threatens ${fighterA.name}'s distance striking by forcing entries, cage pressure, and takedown defense reactions.`;
  }

  else if (styleA === "Counter Striker" && styleB === "Pressure Boxer") {
    summary = `${fighterA.name}'s counter striking can punish ${fighterB.name}'s forward pressure if timing and range control are maintained.`;
  }

  else if (styleA === "Pressure Boxer" && styleB === "Counter Striker") {
    summary = `${fighterB.name}'s counter striking creates danger when ${fighterA.name} enters the pocket, but ${fighterA.name}'s pressure can reduce reaction time and force exchanges.`;
  }

  else if (styleA === "Submission Hunter" && styleB.includes("Wrestler")) {
    summary = `${fighterA.name}'s submission threat creates danger in grappling exchanges, especially if ${fighterB.name} overcommits during takedown or top-control sequences.`;
  }

  else if (styleB === "Submission Hunter" && styleA.includes("Wrestler")) {
    summary = `${fighterB.name}'s submission threat makes grappling exchanges dangerous, even if ${fighterA.name} controls wrestling pressure and top position.`;
  }

  else if (styleA === "Kickboxer" && styleB.includes("Wrestler")) {
    summary = `${fighterB.name}'s wrestling threat can disrupt ${fighterA.name}'s kickboxing rhythm by forcing stance changes, defensive reactions, and clinch awareness.`;
  }

  else if (styleB === "Kickboxer" && styleA.includes("Wrestler")) {
    summary = `${fighterA.name}'s wrestling threat can disrupt ${fighterB.name}'s kickboxing rhythm by forcing defensive grappling reactions.`;
  }

  else {
    summary = `${fighterA.name}'s ${fighterA.primary_style} and ${fighterA.secondary_style} profile clashes with ${fighterB.name}'s ${fighterB.primary_style} and ${fighterB.secondary_style} profile in a matchup shaped by pace, range, pressure, and defensive reactions.`;
  }

  return summary;
}

function compareFighters() {
  const fighterAId = document.getElementById("fighter-a").value;
  const fighterBId = document.getElementById("fighter-b").value;

  if (!fighterAId || !fighterBId) {
    alert("Select two fighters.");
    return;
  }

  if (fighterAId === fighterBId) {
    alert("Select two different fighters.");
    return;
  }

  const fighterA = allFighters.find((f) => f.id == fighterAId);
  const fighterB = allFighters.find((f) => f.id == fighterBId);

  const results = document.getElementById("comparison-results");

  let fighterAWins = 0;
  let fighterBWins = 0;
  let advantages = [];

  const categories = [
    ["Striking Accuracy", fighterA.striking_accuracy, fighterB.striking_accuracy],
    ["Striking Defense", fighterA.striking_defense, fighterB.striking_defense],
    ["Takedown Defense", fighterA.takedown_defense, fighterB.takedown_defense],
    ["KO Threat", fighterA.ko_percent, fighterB.ko_percent],
    ["Submission Threat", fighterA.sub_percent, fighterB.sub_percent],
  ];

  categories.forEach(([label, a, b]) => {
    a = Number(a);
    b = Number(b);

    if (a > b) {
      fighterAWins++;
      advantages.push(`${fighterA.name} leads in ${label}`);
    } else if (b > a) {
      fighterBWins++;
      advantages.push(`${fighterB.name} leads in ${label}`);
    }
  });

  let overallEdge = "Even Matchup";

  if (fighterAWins > fighterBWins) overallEdge = fighterA.name;
  if (fighterBWins > fighterAWins) overallEdge = fighterB.name;

const baseFighterAScore =
  calculateFighterScore(fighterA);

const baseFighterBScore =
  calculateFighterScore(fighterB);

const styleAdvantages =
  calculateStyleAdvantage(
    fighterA,
    fighterB
  );

const traitAdvantages =
  calculateTraitAdvantage(
    fighterA,
    fighterB
  );

const fighterAScore =
  baseFighterAScore +
  styleAdvantages.fighterAStyleEdge +
  traitAdvantages.fighterATraitEdge;

const fighterBScore =
  baseFighterBScore +
  styleAdvantages.fighterBStyleEdge +
  traitAdvantages.fighterBTraitEdge;
  const totalScore = fighterAScore + fighterBScore;

  const fighterAProbability = ((fighterAScore / totalScore) * 100).toFixed(1);
  const fighterBProbability = ((fighterBScore / totalScore) * 100).toFixed(1);

  const fightVerdict = generateFightVerdict(
    fighterA,
    fighterB,
    overallEdge
  );
  const fightNarrative =
  generateFightNarrative(
    fighterA,
    fighterB
  );
  const volatilityData =
  calculateFightVolatility(
    fighterA,
    fighterB
  );
  const historicalInsight =
  generateHistoricalInsight(
    fighterA,
    fighterB
  );
  const metaInsight =
  generateMetaInsight(
    fighterA,
    fighterB
  );
  const roundDynamics =
  generateRoundDynamics(
    fighterA,
    fighterB
  );
  const cardioDynamics =
  generateCardioDynamics(
    fighterA,
    fighterB
  );
  const finishProbability =
  generateFinishProbability(
    fighterA,
    fighterB
  );
  const upsetPotential =
  generateUpsetPotential(
    fighterA,
    fighterB
  );
  const momentumDynamics =
  generateMomentumDynamics(
    fighterA,
    fighterB
  );
const styleInteraction =
  generateStyleInteraction(fighterA, fighterB);
  results.innerHTML = `
    <div class="comparison-card">

      <div class="arena-header">
        <p class="arena-kicker">Fight Matchup Analysis</p>

        <h2 class="arena-title">
          ${fighterA.name}
          <span>VS</span>
          ${fighterB.name}
        </h2>
      </div>

      <div class="comparison-fighters">

        <div class="comparison-fighter">
          <img
            src="images/${getImageName(fighterA.name)}.jpg"
            alt="${fighterA.name}"
            class="comparison-image"
          >

          <h3>${fighterA.name}</h3>
        </div>

        <div class="vs-text">VS</div>

        <div class="comparison-fighter">
          <img
            src="images/${getImageName(fighterB.name)}.jpg"
            alt="${fighterB.name}"
            class="comparison-image"
          >

          <h3>${fighterB.name}</h3>
        </div>

      </div>

      <p class="style-matchup">
        ${fighterA.fighting_style}
        vs
        ${fighterB.fighting_style}
      </p>

      <div class="probability-box">

        <h3>Kombat Analyst Score</h3>

        <div class="probability-fighters">
          <span>${fighterA.name}</span>
          <span>${fighterB.name}</span>
        </div>

        <div class="probability-bar">
          <div
            class="probability-fill"
            style="width: ${fighterAProbability}%"
          ></div>
        </div>

        <div class="probability-values">
          <strong>${fighterAProbability}%</strong>
          <strong>${fighterBProbability}%</strong>
        </div>

      </div>

      <div class="advantages-box">

        <h3>Advantages</h3>

        ${advantages.map((item) => `<p>✓ ${item}</p>`).join("")}
        <p>
  ⚔️ Style Edge:
  ${styleAdvantages.fighterAStyleEdge >
  styleAdvantages.fighterBStyleEdge

    ? fighterA.name

    : styleAdvantages.fighterBStyleEdge >
      styleAdvantages.fighterAStyleEdge

    ? fighterB.name

    : "Even"}
</p>
<p>
    🧬 Trait Edge:
    ${traitAdvantages.fighterATraitEdge >
    traitAdvantages.fighterBTraitEdge

      ? fighterA.name

      : traitAdvantages.fighterBTraitEdge >
        traitAdvantages.fighterATraitEdge

      ? fighterB.name

      : "Even"}
  </p>


      </div>

      <div class="combat-dna">

        <h3>Combat DNA</h3>

        <div class="comparison-dna-grid">

          <div>
            <h4>${fighterA.name}</h4>

            <div class="dna-styles">

              <span class="dna-style primary-style">
                ${fighterA.primary_style}
              </span>

              <span class="dna-style secondary-style">
                ${fighterA.secondary_style}
              </span>

            </div>

            <div class="dna-traits">

              <span class="dna-trait">${fighterA.trait_1}</span>
              <span class="dna-trait">${fighterA.trait_2}</span>
              <span class="dna-trait">${fighterA.trait_3}</span>

            </div>
          </div>

          <div>
            <h4>${fighterB.name}</h4>

            <div class="dna-styles">

              <span class="dna-style primary-style">
                ${fighterB.primary_style}
              </span>

              <span class="dna-style secondary-style">
                ${fighterB.secondary_style}
              </span>

            </div>

            <div class="dna-traits">

              <span class="dna-trait">${fighterB.trait_1}</span>
              <span class="dna-trait">${fighterB.trait_2}</span>
              <span class="dna-trait">${fighterB.trait_3}</span>

            </div>
          </div>

        </div>

      </div>
      <div class="style-interaction-box">

  <h3>Style Interaction</h3>

  <p>
    ${styleInteraction}
  </p>

</div>

<div class="fight-narrative-box">

  <h3>Matchup Narrative</h3>

  <p>
    ${fightNarrative}
  </p>

</div>

<div class="volatility-box">

  <h3>Fight Volatility</h3>

  <p>
    ${volatilityData.volatilityDescription}
  </p>

</div>
<div class="historical-insight-box">

  <h3>Historical Matchup Insight</h3>

  <p>
    ${historicalInsight}
  </p>

</div>
<div class="meta-insight-box">

  <h3>Modern MMA Meta Insight</h3>

  <p>
    ${metaInsight}
  </p>

</div>
<div class="round-dynamics-box">

  <h3>Round Dynamics</h3>

  <p>
    ${roundDynamics}
  </p>

</div>
<div class="cardio-box">

  <h3>Cardio & Pressure Dynamics</h3>

  <p>
    ${cardioDynamics}
  </p>

</div>
<div class="finish-box">

  <h3>Finish Probability</h3>

  <p>
    ${finishProbability}
  </p>

</div>
<div class="upset-box">

  <h3>Upset Potential</h3>

  <p>
    ${upsetPotential}
  </p>

</div>
<div class="momentum-box">

  <h3>Momentum Swing Analysis</h3>

  <p>
    ${momentumDynamics}
  </p>

</div>

<div class="analysis-box">

  <h3>Smart Fight Verdict</h3>

  <p>
    ${fightVerdict}
  </p>

</div>
      <table class="comparison-table">

        <tr>
          <th>Stat</th>
          <th>${fighterA.name}</th>
          <th>${fighterB.name}</th>
        </tr>

        <tr>
          <td>Record</td>
          <td>${fighterA.record}</td>
          <td>${fighterB.record}</td>
        </tr>

        ${createComparisonRow(
          "Striking Accuracy",
          fighterA.striking_accuracy,
          fighterB.striking_accuracy,
          "%"
        )}

        ${createComparisonRow(
          "Striking Defense",
          fighterA.striking_defense,
          fighterB.striking_defense,
          "%"
        )}

        ${createComparisonRow(
          "Takedown Defense",
          fighterA.takedown_defense,
          fighterB.takedown_defense,
          "%"
        )}

        ${createComparisonRow(
          "KO %",
          fighterA.ko_percent,
          fighterB.ko_percent,
          "%"
        )}

        ${createComparisonRow(
          "Submission %",
          fighterA.sub_percent,
          fighterB.sub_percent,
          "%"
        )}

      </table>

      <div class="summary-box">

        <h3>Overall Edge</h3>

        <p>${overallEdge}</p>

        <p>
          ${fighterA.name}: ${fighterAWins} category wins
        </p>

        <p>
          ${fighterB.name}: ${fighterBWins} category wins
        </p>

      </div>

    </div>
  `;
}

function searchFighters() {
  const searchInput =
    document.getElementById("search-input");

  const searchTerm =
    searchInput.value.toLowerCase();

  const filteredFighters =
    allFighters.filter((fighter) =>
      fighter.name
        .toLowerCase()
        .includes(searchTerm)
    );

  displayFighters(filteredFighters);
}

window.searchFighters =
  searchFighters;

loadFighters();

document.addEventListener(
  "click",
  (event) => {
    if (
      event.target.id ===
      "compare-btn"
    ) {
      compareFighters();
    }
  }
);
window.addEventListener("scroll", () => {
  const backToTop =
    document.getElementById("back-to-top");

  if (!backToTop) return;

  if (window.scrollY > 500) {
    backToTop.classList.add("show");
  } else {
    backToTop.classList.remove("show");
  }
});