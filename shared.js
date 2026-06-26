// ================================
// IMAGE HELPERS
// ================================

function getImageName(fighterName) {
  if (fighterName === "Sean Strickland") return "Strickland";
  if (fighterName === "Sean O'Malley") return "sean";

  return fighterName.toLowerCase().split(" ")[0];
}

function getFighterImage(fighter) {
  return fighter.image_url ||
    `images/${getImageName(fighter.name)}.jpg`;
}

// ================================
// STYLE ENGINE
// ================================

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

// ================================
// TRAIT ENGINE
// ================================

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
// ================================
// MATCHUP NARRATIVE
// ================================

function generateFightNarrative(fighterA, fighterB) {

  if (
    fighterA.primary_style === "Pressure Wrestler" &&
    fighterB.primary_style === "Distance Striker"
  ) {
    return `${fighterA.name} will likely attempt to collapse distance early, forcing ${fighterB.name} into defensive reactions and grappling exchanges. If ${fighterB.name} cannot maintain range, sustained wrestling pressure may dictate the fight.`;
  }

  if (
    fighterB.primary_style === "Pressure Wrestler" &&
    fighterA.primary_style === "Distance Striker"
  ) {
    return `${fighterB.name} will likely attempt to collapse distance early, forcing ${fighterA.name} into defensive reactions and grappling exchanges. If ${fighterA.name} cannot maintain range, sustained wrestling pressure may dictate the fight.`;
  }

  if (
    fighterA.primary_style === "Counter Striker" &&
    fighterB.primary_style === "Pressure Boxer"
  ) {
    return `${fighterB.name}'s pressure creates opportunities for ${fighterA.name}'s counters. Timing will decide the fight.`;
  }

  if (
    fighterB.primary_style === "Counter Striker" &&
    fighterA.primary_style === "Pressure Boxer"
  ) {
    return `${fighterA.name}'s pressure creates opportunities for ${fighterB.name}'s counters. Timing will decide the fight.`;
  }

  return `${fighterA.name} and ${fighterB.name} possess contrasting styles that make this matchup dependent on range control, pace, pressure, and tactical adjustments.`;

}

// ================================
// STYLE INTERACTION
// ================================

function generateStyleInteraction(fighterA, fighterB) {

  if (
    fighterA.primary_style === "Pressure Wrestler" &&
    fighterB.primary_style === "Distance Striker"
  ) {
    return `${fighterA.name}'s pressure wrestling naturally disrupts ${fighterB.name}'s distance striking.`;
  }

  if (
    fighterB.primary_style === "Pressure Wrestler" &&
    fighterA.primary_style === "Distance Striker"
  ) {
    return `${fighterB.name}'s pressure wrestling naturally disrupts ${fighterA.name}'s distance striking.`;
  }

  return `${fighterA.primary_style} clashes with ${fighterB.primary_style} through pace, positioning and range management.`;

}

// ================================
// HISTORICAL INSIGHT
// ================================

function generateHistoricalInsight(fighterA, fighterB) {

  return `Historically, matchups between these archetypes are usually decided by which fighter successfully imposes their preferred range and tempo.`;

}

// ================================
// META INSIGHT
// ================================

function generateMetaInsight(fighterA, fighterB) {

  return `Modern MMA rewards adaptable fighters capable of blending striking, wrestling and transitional grappling.`;

}

// ================================
// ROUND DYNAMICS
// ================================

function generateRoundDynamics(fighterA, fighterB) {

  return `Early rounds are likely to establish control while later rounds will reward the fighter with superior pace and tactical adjustments.`;

}

// ================================
// CARDIO
// ================================

function generateCardioDynamics(fighterA, fighterB) {

  return `Cardio management and sustained pressure could become decisive as the fight progresses.`;

}

// ================================
// FINISH PROBABILITY
// ================================

function generateFinishProbability(fighterA, fighterB) {

  return `Both fighters possess finishing ability, but the probability increases dramatically if one establishes their preferred rhythm early.`;

}

// ================================
// UPSET POTENTIAL
// ================================

function generateUpsetPotential(fighterA, fighterB) {

  return `Momentum swings, counters and grappling transitions create realistic upset opportunities despite statistical projections.`;

}

// ================================
// MOMENTUM
// ================================

function generateMomentumDynamics(fighterA, fighterB) {

  return `Momentum may swing through pressure sequences, successful counters and positional dominance.`;

}

// ================================
// VOLATILITY
// ================================

function calculateFightVolatility(fighterA, fighterB) {

  return {
    volatilityScore: 5,
    volatilityDescription:
      "This matchup contains calculated danger with opportunities for momentum shifts through tactical exchanges."
  };

}

// ================================
// FINAL VERDICT
// ================================

function generateFightVerdict(
  fighterA,
  fighterB,
  overallEdge
) {

  return `${overallEdge} appears to possess the stronger overall statistical profile, but stylistic dynamics and execution remain the deciding factors.`;

}