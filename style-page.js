const SUPABASE_URL = "https://xrjxoyfpkthkziodmfta.supabase.co";

const SUPABASE_ANON_KEY = "sb_publishable_jOtYU_rtJRq_2kuG3OyUVA_H5ugva2t";

const supabaseClient = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);
const styleDoctrine = { "Pressure Boxer": "Pressure boxers weaponize forward movement, pocket exchanges and sustained damage accumulation.", "Kickboxer": "Kickboxers specialize in range control, striking precision and layered offensive setups.", "Pressure Wrestler": "Pressure wrestlers overwhelm opponents through relentless pace, takedowns, cage control and cardio pressure.", "Well Rounded MMA Fighter": "Well rounded fighters adapt across striking, wrestling and grappling depending on matchup demands.", "Counter Striker": "Counter strikers rely on timing, reads and punishment windows rather than pure aggression.", "Submission Hunter": "Submission hunters aggressively chase scrambles, transitions and finishing sequences on the ground.", "Chain Wrestler": "Chain wrestlers relentlessly pursue takedowns through repeated entries, transitions and positional persistence.", "Distance Striker": "Distance strikers prioritize footwork, spacing and long-range engagement control to avoid pressure and punish entries.", "Volume Striker": "Volume strikers drown opponents through relentless output, pace and accumulation." };
const styleThemes = {
  "Pressure Wrestler": "#991B1B",
  "Counter Striker": "#0891B2",
  "Kickboxer": "#2563EB",
  "Submission Hunter": "#7C3AED",
  "Pressure Boxer": "#DC2626",
  "Well Rounded MMA Fighter": "#475569",
  "Chaos Fighter": "#EA580C",
  "Volume Striker": "#0F766E"
};

const styleMatchups = { "Pressure Boxer": "Overwhelms technical fighters through pace and attrition. Vulnerable to precise counters and lateral movement.", "Kickboxer": "Strong at range management and technical striking battles. Vulnerable to cage pressure and chain wrestling.", "Pressure Wrestler": "Strong against Kickboxers and Volume Strikers. Vulnerable to elite anti-wrestlers and dangerous submission threats.", "Well Rounded MMA Fighter": "Adaptable across multiple styles. Vulnerable when forced into specialist domains.", "Counter Striker": "Strong against aggressive pressure fighters. Vulnerable to layered feints and sustained wrestling pressure.", "Submission Hunter": "Dangerous during scrambles and transitions. Vulnerable against disciplined top control and positional grapplers.", "Chain Wrestler": "Excels against distance-based strikers through relentless takedown chaining. Vulnerable to explosive scramblers and submission traps.", "Distance Striker": "Excels in open space and long-range engagements. Vulnerable to cage pressure and attritional wrestling.", "Volume Striker": "Breaks opponents through pace and accumulation. Vulnerable to explosive power counters." };
const styleAttributes = {

  "Pressure Boxer": {
    Pressure: 94,
    Damage: 91,
    Pace: 88
  },

  "Kickboxer": {
    Range: 94,
    Precision: 93,
    Damage: 92
  },

  "Pressure Wrestler": {
    Pressure: 95,
    Control: 96,
    Cardio: 92
  },

  "Well Rounded MMA Fighter": {
    Adaptability: 95,
    IQ: 94,
    Balance: 92
  },

  "Counter Striker": {
    Timing: 95,
    Precision: 91,
    Defense: 88
  },

  "Submission Hunter": {
    Grappling: 96,
    Scrambles: 91,
    Finishing: 94
  },

  "Chain Wrestler": {
    Pace: 95,
    Control: 93,
    Exhaustion: 92
  },

  "Distance Striker": {
    Footwork: 94,
    Range: 95,
    Timing: 90
  },

  "Volume Striker": {
    Output: 97,
    Pace: 92,
    Attrition: 90
  }

};

function getImageName(fighterName) {
  if (fighterName === "Sean Strickland") return "Strickland";
  if (fighterName === "Sean O'Malley") return "sean";

  return fighterName.toLowerCase().split(" ")[0];
}
function getFighterImage(fighter) {
  return fighter.image_url ||
    `images/${getImageName(fighter.name)}.jpg`;
}
async function loadStyleFighters() {
  const params = new URLSearchParams(window.location.search);
  const styleType = params.get("type");

  document.getElementById("style-title").textContent =
    styleType || "Style";
    document.getElementById("style-doctrine").textContent = styleDoctrine[styleType] || "Combat style doctrine.";
    document.getElementById("style-matchups").textContent = styleMatchups[styleType] || "Style matchup analysis.";
    const accentColor =
  styleThemes[styleType] || "#FBBF24";
  

document.querySelector(".style-info-box").style.borderColor =
  accentColor;

document
  .querySelectorAll(".style-info-box")
  .forEach((box) => {
    box.style.borderColor = accentColor;

    box.style.boxShadow =
      `0 0 30px ${accentColor}22`;

    box.style.background =
      `linear-gradient(
        145deg,
        ${accentColor}22,
        rgba(11,16,32,0.98)
      )`;
  });

  const { data, error } = await supabaseClient
  .from("fighters")
  .select("*")
  .or(
    `primary_style.eq.${styleType},secondary_style.eq.${styleType}`
  )
  .order("weight_class", { ascending: true });

  if (error) {
    console.error(error);
    return;
  }

  document.getElementById("style-count").textContent =
    `${data.length} fighters found`;

  const container = document.getElementById("style-fighters");
  container.innerHTML = "";
  const attributeGrid =
  document.querySelector(".style-attribute-grid");

attributeGrid.innerHTML = "";

const attributes =
  styleAttributes[styleType];

if (attributes) {
  Object.entries(attributes).forEach(([key, value]) => {

    const card =
      document.createElement("div");

    card.classList.add("style-attribute-card");

    card.innerHTML = `
      <h3>${key}</h3>
      <span>${value}</span>
    `;

    attributeGrid.appendChild(card);
  });
}

  data.forEach((fighter) => {
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
          ${fighter.weight_class}
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

loadStyleFighters();

async function generateStyleDebrief() {
  const button = document.getElementById("analyze-style-btn");
  const output = document.getElementById("ai-style-output");

  if (!button || !output) {
    console.error("AI elements not found.");
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const styleType = params.get("type");

  button.disabled = true;
  button.textContent = "Generating Style Debrief...";

  output.innerHTML = `
    <div class="ai-report-card">
      <h3>Generating...</h3>
      <p>Kombat Analyst is analyzing this combat style.</p>
    </div>
  `;

  try {

    const response = await fetch(
      `${SUPABASE_URL}/functions/v1/analyze-style`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "apikey": SUPABASE_ANON_KEY,
          "Authorization": `Bearer ${SUPABASE_ANON_KEY}`
        },
        body: JSON.stringify({
          style: {
            name: styleType,
            doctrine: styleDoctrine[styleType],
            attributes: styleAttributes[styleType],
            matchup: styleMatchups[styleType]
          }
        })
      }
    );

    const result = await response.json();

    if (!response.ok || result.status !== "success") {
      throw new Error(result.message || "Style analysis failed.");
    }

    const renderedReport = renderAIReport(result.analysis);

output.innerHTML = renderedReport.trim()
  ? renderedReport
  : `
    <div class="ai-report-card">
      <h3>Style Debrief</h3>
      <p>${result.analysis.replace(/\n/g, "<br>")}</p>
    </div>
  `;

button.textContent = "Style Debrief Generated";

  } catch (error) {

    console.error(error);

    output.innerHTML = `
      <div class="ai-report-card ai-verdict-card">
        <h3>Analysis Failed</h3>
        <p>${error.message}</p>
      </div>
    `;

    button.disabled = false;
    button.textContent = "🧠 Generate Style Debrief";
  }
}

document
  .getElementById("analyze-style-btn")
  ?.addEventListener("click", generateStyleDebrief);