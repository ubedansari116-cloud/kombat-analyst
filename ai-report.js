function renderAIReport(report, verdictKeyword = "verdict") {
  const lines = report
    .split("\n")
    .map(line => line.trim())
    .filter(Boolean);

  const headings = [
    "Combat Identity",
    "Fighting Blueprint",
    "Signature Weapons",
    "Keys to Victory",
    "Danger Zones",
    "Kombat Analyst Verdict",
    "Fight Summary",
    "Striking Battle",
    "Grappling Battle",
    "Pace & Cardio",
    "Biggest X-Factor"
  ];

  const sections = [];
  let currentTitle = "";
  let currentContent = [];

  lines.forEach(line => {
    const cleanLine = line.replace(":", "").trim();

    const isHeading =
      headings.includes(cleanLine) ||
      cleanLine.startsWith("Keys to Victory");

    if (isHeading) {
      if (currentTitle) {
        sections.push({
          title: currentTitle,
          content: currentContent.join(" ")
        });
      }

      currentTitle = cleanLine;
      currentContent = [];
    } else {
      currentContent.push(line);
    }
  });

  if (currentTitle) {
    sections.push({
      title: currentTitle,
      content: currentContent.join(" ")
    });
  }

  return sections.map(section => {
    const isVerdict =
      section.title.toLowerCase().includes(verdictKeyword.toLowerCase());

    return `
      <div class="ai-report-card ${isVerdict ? "ai-verdict-card" : ""}">
        <h3>${section.title}</h3>
        <p>${section.content}</p>
      </div>
    `;
  }).join("");
}