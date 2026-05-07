const detailRoot = document.getElementById("projectDetail");
const params = new URLSearchParams(window.location.search);
const project = PROJECTS.find((item) => item.id === params.get("id")) || PROJECTS[0];

document.title = `${project.name} | Temple Gideon`;

function listItems(items) {
  return items.map((item) => `<li>${item}</li>`).join("");
}

detailRoot.innerHTML = `
  <section class="detail-hero page-section">
    <img class="detail-bg" src="${project.image}" alt="${project.name} project visual">
    <div class="detail-overlay"></div>
    <div class="detail-content">
      <a class="back-link" href="index.html#projects">Back to projects</a>
      <p class="eyebrow">${project.category}</p>
      <h1>${project.name}</h1>
      <p class="summary">${project.blurb}</p>
      <div class="actions">
        <a class="btn primary" href="${project.link}" target="_blank" rel="noreferrer">View Repository</a>
        <a class="btn" href="index.html#contact">Contact Me</a>
      </div>
      <div class="detail-metric">
        <span>${project.metric}</span>
        <strong>${project.stack.slice(0, 3).join(" + ")}</strong>
      </div>
    </div>
  </section>

  <section class="case-grid page-section">
    <article class="case-panel wide">
      <p class="section-kicker">Problem</p>
      <h2>What this project solves</h2>
      <p>${project.problem}</p>
    </article>
    <article class="case-panel">
      <p class="section-kicker">My Role</p>
      <h2>What I built</h2>
      <p>${project.role}</p>
    </article>
    <article class="case-panel">
      <p class="section-kicker">Approach</p>
      <h2>How it works</h2>
      <p>${project.approach}</p>
    </article>
  </section>

  <section class="case-grid page-section">
    <article class="case-panel">
      <p class="section-kicker">Features</p>
      <h2>Core system pieces</h2>
      <ul>${listItems(project.features)}</ul>
    </article>
    <article class="case-panel">
      <p class="section-kicker">Techniques</p>
      <h2>ML and engineering signals</h2>
      <div class="detail-tags">
        ${project.techniques.map((item) => `<span class="tag">${item}</span>`).join("")}
      </div>
    </article>
    <article class="case-panel accent-panel">
      <p class="section-kicker">Outcome</p>
      <h2>Why it matters</h2>
      <p>${project.outcome}</p>
    </article>
  </section>

  <section class="case-panel honest-panel page-section">
    <p class="section-kicker">Portfolio Note</p>
    <h2>What I would improve next</h2>
    <p>${project.honestNote}</p>
  </section>
`;
