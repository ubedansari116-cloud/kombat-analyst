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
async function loadWeightClass() {
  const params = new URLSearchParams(window.location.search);
  const division = params.get("division");

  document.getElementById("weightclass-title").textContent =
    division || "Division";

  const { data, error } = await supabaseClient
    .from("fighters")
    .select("*")
    .eq("weight_class", division)
    .order("ranking_number", { ascending: true });

  if (error) {
    console.error(error);
    return;
  }

  document.getElementById("weightclass-count").textContent =
    `${data.length} fighters found`;

  const container = document.getElementById("weightclass-fighters");
  container.innerHTML = "";

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

loadWeightClass();