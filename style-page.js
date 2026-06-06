const SUPABASE_URL = "https://xrjxoyfpkthkziodmfta.supabase.co";

const SUPABASE_ANON_KEY = "sb_publishable_jOtYU_rtJRq_2kuG3OyUVA_H5ugva2t";

const supabaseClient = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);
const styleDoctrine = {
  "Pressure Wrestler":
    "Pressure wrestlers overwhelm opponents through relentless pace, takedowns, cage control and cardio pressure.",

  "Counter Striker":
    "Counter strikers rely on timing, reads and punishment windows rather than pure aggression.",

  "Kickboxer":
    "Kickboxers specialize in range control, striking precision and layered offensive setups.",

  "Submission Hunter":
    "Submission hunters aggressively chase scrambles, transitions and finishing sequences on the ground.",

  "Pressure Boxer":
    "Pressure boxers weaponize forward movement, attrition and sustained damage accumulation.",

  "Well Rounded MMA Fighter":
    "Well rounded fighters adapt across striking, wrestling and grappling depending on matchup demands.",

  "Chaos Fighter":
    "Chaos fighters create unpredictable exchanges, forcing opponents into uncomfortable reactions.",

  "Volume Striker":
    "Volume strikers drown opponents through relentless output, pace and accumulation."
};
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

const styleMatchups = {
  "Pressure Wrestler":
    "Strong against Kickboxers and Volume Strikers. Vulnerable to elite anti-wrestlers.",

  "Counter Striker":
    "Strong against aggressive pressure fighters. Vulnerable to layered feints and wrestling pressure.",

  "Kickboxer":
    "Strong at range management and technical striking battles. Vulnerable to cage pressure and chain wrestling.",

  "Submission Hunter":
    "Dangerous during scrambles and transitions. Vulnerable against disciplined top control.",

  "Pressure Boxer":
    "Overwhelms technical fighters through pace and attrition. Vulnerable to precise counters.",

  "Well Rounded MMA Fighter":
    "Adaptable across multiple styles. Vulnerable when forced into specialist domains.",

  "Chaos Fighter":
    "Creates unpredictable exchanges and momentum swings. Vulnerable to disciplined technicians.",

  "Volume Striker":
    "Breaks opponents through pace and accumulation. Vulnerable to explosive power counters."
};
const styleAttributes = {
  "Pressure Wrestler": {
    Pressure: 95,
    Control: 96,
    Cardio: 92
  },

  "Counter Striker": {
    Timing: 95,
    Precision: 91,
    Defense: 88
  },

  "Kickboxer": {
    Range: 94,
    Precision: 93,
    Damage: 92
  },

  "Submission Hunter": {
    Grappling: 96,
    Scrambles: 91,
    Finishing: 94
  },

  "Pressure Boxer": {
    Pressure: 94,
    Damage: 91,
    Pace: 88
  },

  "Well Rounded MMA Fighter": {
    Adaptability: 95,
    IQ: 94,
    Balance: 92
  },

  "Chaos Fighter": {
    Aggression: 97,
    Volatility: 95,
    Momentum: 92
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
    .eq("primary_style", styleType)
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