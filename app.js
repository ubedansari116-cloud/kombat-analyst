const SUPABASE_URL = "https://xrjxoyfpkthkziodmfta.supabase.co";

const SUPABASE_ANON_KEY = "sb_publishable_jOtYU_rtJRq_2kuG3OyUVA_H5ugva2t";

const supabaseClient = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);

let allFighters = [];

function displayFighters(fighters) {
  const container = document.getElementById("fighters-container");

  const countElement = document.getElementById("fighter-count");
  countElement.textContent = `${fighters.length} fighters found`;

  container.innerHTML = "";

  fighters.forEach((fighter) => {
    const card = document.createElement("div");
    card.classList.add("fighter-card");

    card.style.cursor = "pointer";

    card.addEventListener("click", () => {
      window.location.href = `fighter.html?id=${fighter.id}`;
    });
    
    let imageName = fighter.name.toLowerCase().split(" ")[0];
    if (fighter.name === "Sean Strickland") {
        imageName = "strickland";
    }

    card.innerHTML = `
      <div class="fighter-image-container">
        <img
          src="images/${imageName}.jpg"
          alt="${fighter.name}"
          class="fighter-image"
          onerror="this.src='https://placehold.co/300x300/FF6600/111111?text=${encodeURIComponent(
            fighter.name
          )}';">
      </div>

<div class="fighter-rank-badge">
  ${
    fighter.rank === "Champion"
      ? "🏆 Champion"
      : fighter.rank || "Unranked"
  }
</div>

<div class="fighter-name">${fighter.name}</div>

<div class="fighter-record">${fighter.record}</div>
    `;

    container.appendChild(card);
  });
}

async function loadFighters() {
  const { data, error } = await supabaseClient
    .from("fighters")
    .select("*");

  if (error) {
    console.error(error);
    return;
  }

  allFighters = data;

  displayFighters(allFighters);

  populateComparisonDropdowns();
}

document.addEventListener("input", (event) => {
  if (event.target.id === "search-input") {
    const searchTerm = event.target.value.toLowerCase();

    const filteredFighters = allFighters.filter((fighter) =>
      fighter.name.toLowerCase().includes(searchTerm)
    );

    displayFighters(filteredFighters);
  }
});
function populateComparisonDropdowns() {
  const fighterA = document.getElementById("fighter-a");
  const fighterB = document.getElementById("fighter-b");

  fighterA.innerHTML =
    '<option value="">Select Fighter A</option>';

  fighterB.innerHTML =
    '<option value="">Select Fighter B</option>';

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
function getWinnerClass(a, b) {
  if (a > b) return ["winner", ""];
  if (b > a) return ["", "winner"];
  return ["", ""];
}

function getWinnerIcon(a, b, side) {
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

function getImageName(fighterName) {

  if (fighterName === "Sean Strickland")
    return "strickland";

  if (fighterName === "Sean O'Malley")
    return "sean";

  return fighterName
    .toLowerCase()
    .split(" ")[0];
}

function calculateFighterScore(fighter) {

  return (

    fighter.striking_accuracy * 0.15 +

    fighter.striking_defense * 0.15 +

    fighter.takedown_defense * 0.20 +

    fighter.ko_percent * 0.15 +

    fighter.sub_percent * 0.15 +

    fighter.head_attack * 0.05 +

    fighter.body_attack * 0.05 +

    fighter.leg_attack * 0.05 +

    fighter.head_defense * 0.05

  );

}

function compareFighters() {
  const fighterAId =
    document.getElementById("fighter-a").value;

  const fighterBId =
    document.getElementById("fighter-b").value;

  if (!fighterAId || !fighterBId) {
    alert("Select two fighters.");
    return;
  }

  const fighterA = allFighters.find(
    (f) => f.id == fighterAId
  );

  const fighterB = allFighters.find(
    (f) => f.id == fighterBId
  );

  const results =
    document.getElementById("comparison-results");
let fighterAWins = 0;
let fighterBWins = 0;
let advantages = [];

if (fighterA.striking_accuracy > fighterB.striking_accuracy) {
  fighterAWins++;
  advantages.push(
    `${fighterA.name} leads in Striking Accuracy`
  );
}
else if (fighterB.striking_accuracy > fighterA.striking_accuracy) {
  fighterBWins++;
  advantages.push(
    `${fighterB.name} leads in Striking Accuracy`
  );
}
if (fighterA.striking_defense > fighterB.striking_defense) {
  fighterAWins++;
  advantages.push(
    `${fighterA.name} leads in Striking Defense`
  );
}
else if (fighterB.striking_defense > fighterA.striking_defense) {
  fighterBWins++;
  advantages.push(
    `${fighterB.name} leads in Striking Defense`
  );
}

if (fighterA.takedown_defense > fighterB.takedown_defense){
  fighterAWins++;
  advantages.push(
    `${fighterA.name} leads in takedown Defense`
  );
}
else if (fighterB.takedown_defense > fighterA.takedown_defense) {
  fighterBWins++;
  advantages.push(
    `${fighterB.name} leads in takedown Defense`
  );
}

if (fighterA.ko_percent > fighterB.ko_percent) {
  fighterAWins++;
  advantages.push(
    `${fighterA.name} is a KO threat`
  );
}
else if (fighterB.ko_percent > fighterA.ko_percent) {
  fighterBWins++;
  advantages.push(
    `${fighterB.name} is a KO threat`
  );
}

if (fighterA.sub_percent > fighterB.sub_percent) {
  fighterAWins++;
  advantages.push(
    `${fighterA.name} is a Submission threat`
  );
}
else if (fighterB.sub_percent > fighterA.sub_percent) {
  fighterBWins++;
  advantages.push(
    `${fighterB.name} is a Submission threat`
  );
}
let overallEdge = "Even Matchup";
const fighterAScore =
  calculateFighterScore(fighterA);

const fighterBScore =
  calculateFighterScore(fighterB);

const totalScore =
  fighterAScore + fighterBScore;

const fighterAProbability =
  (
    (fighterAScore / totalScore) * 100
  ).toFixed(1);

const fighterBProbability =
  (
    (fighterBScore / totalScore) * 100
  ).toFixed(1);

if (fighterAWins > fighterBWins)
  overallEdge = fighterA.name;

if (fighterBWins > fighterAWins)
  overallEdge = fighterB.name;
  results.innerHTML = `
    <div class="comparison-card">

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
      <div class="advantages-box">

  <h3>Advantages</h3>

  ${advantages
    .map(item => `<p>✓ ${item}</p>`)
    .join("")}

</div>
<div class="probability-box">

  <h3>Kombat Analyst Score</h3>

  <div class="probability-row">

    <span>${fighterA.name}</span>

    <strong>${fighterAProbability}%</strong>

  </div>

  <div class="probability-bar">
    <div
      class="probability-fill"
      style="width: ${fighterAProbability}%"
    ></div>
  </div>

  <div class="probability-row">

    <span>${fighterB.name}</span>

    <strong>${fighterBProbability}%</strong>

  </div>

</div>
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
loadFighters();

document
  .getElementById("compare-btn")
  .addEventListener(
    "click",
    compareFighters
  );