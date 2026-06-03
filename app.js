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
      imageName = "Strickland";
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

loadFighters();