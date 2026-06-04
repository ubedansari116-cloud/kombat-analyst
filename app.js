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

function displayFighters(fighters) {
  const container = document.getElementById("fighters-container");
  const countElement = document.getElementById("fighter-count");

  countElement.textContent = `${fighters.length} fighters found`;
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
          src="images/${imageName}.jpg"
          alt="${fighter.name}"
          class="fighter-image"
          onerror="this.src='https://placehold.co/300x300/FF6600/111111?text=${encodeURIComponent(fighter.name)}';"
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

  const fighterAScore = calculateFighterScore(fighterA);
  const fighterBScore = calculateFighterScore(fighterB);
  const totalScore = fighterAScore + fighterBScore;

  const fighterAProbability = ((fighterAScore / totalScore) * 100).toFixed(1);
  const fighterBProbability = ((fighterBScore / totalScore) * 100).toFixed(1);

  const fightVerdict = generateFightVerdict(
    fighterA,
    fighterB,
    overallEdge
  );

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