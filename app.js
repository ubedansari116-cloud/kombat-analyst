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

    card.innerHTML = `
      <h2>${fighter.name}</h2>
      <p><strong>Nickname:</strong> ${fighter.nickname || "N/A"}</p>
      <p><strong>Division:</strong> ${fighter.division}</p>
      <p><strong>Record:</strong> ${fighter.record}</p>
      <p><strong>Country:</strong> ${fighter.country}</p>
      <p><strong>Rank:</strong> ${fighter.rank || "Unranked"}</p>
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