const SUPABASE_URL = "https://xrjxoyfpkthkziodmfta.supabase.co";

const SUPABASE_ANON_KEY = "sb_publishable_jOtYU_rtJRq_2kuG3OyUVA_H5ugva2t";

const supabaseClient = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);

const divisions = [
  "Bantamweight",
  "Featherweight",
  "Lightweight",
  "Welterweight",
  "Middleweight",
  "Light Heavyweight",
  "Heavyweight"
];

async function loadRankings() {
  const container = document.getElementById("rankings-container");

  const { data, error } = await supabaseClient
    .from("fighters")
    .select("*")
    .order("division", { ascending: true })
    .order("ranking_number", { ascending: true });

  if (error) {
    console.error(error);
    container.innerHTML = "<p>Failed to load rankings.</p>";
    return;
  }

  container.innerHTML = "";

  divisions.forEach((division) => {
    const fighters = data.filter(
      fighter => fighter.division === division
    );
    const champion = fighters.find(
  fighter => fighter.is_champion
);

const contenders = fighters.filter(
  fighter => !fighter.is_champion
);

    if (fighters.length === 0) return;

    const section = document.createElement("section");
    section.classList.add("rankings-section");

    section.innerHTML = `
      <div class="rankings-header">
        <h2>${division}</h2>
        <a href="weightclass.html?division=${division}">
          View Division
        </a>
      </div>

      ${
  champion
    ? `
      <div class="champion-showcase"
        onclick="window.location.href='fighter.html?id=${champion.id}'">

        <span>Champion</span>
        <h3>🏆 ${champion.name}</h3>
        <p>${champion.primary_style || "Unknown Style"}</p>

      </div>
    `
    : ""
}

<div class="rankings-list">
  ${contenders
  .slice(0, 5)
  .map(
            fighter => `
              <div class="ranking-row"
                onclick="window.location.href='fighter.html?id=${fighter.id}'">

                <span class="ranking-position">
                  ${
                    fighter.is_champion
                      ? "🏆"
                      : fighter.rank || "Unranked"
                  }
                </span>

                <span class="ranking-name">
                  ${fighter.name}
                </span>

                <span class="ranking-style">
                  ${fighter.primary_style || "Unknown Style"}
                </span>

              </div>
              
            `
          )
          .join("")}
      </div>
      <a class="view-division-link"
      href="weightclass.html?division=${division}">
      View Full Division →
      </a>
    `;

    container.appendChild(section);
  });
}

loadRankings();