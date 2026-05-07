const categories = ["All", ...new Set(PROJECTS.map((project) => project.category))];
const filtersEl = document.getElementById("filters");
const gridEl = document.getElementById("projectGrid");

let activeCategory = "All";

function renderFilters() {
  filtersEl.innerHTML = "";
  categories.forEach((category) => {
    const button = document.createElement("button");
    button.className = `chip${category === activeCategory ? " active" : ""}`;
    button.textContent = category;
    button.addEventListener("click", () => {
      activeCategory = category;
      renderFilters();
      renderProjects();
    });
    filtersEl.appendChild(button);
  });
}

function renderProjects() {
  gridEl.innerHTML = "";
  const filtered = activeCategory === "All"
    ? PROJECTS
    : PROJECTS.filter((project) => project.category === activeCategory);

  filtered.forEach((project, index) => {
    const card = document.createElement("a");
    card.className = `project-card${index === 0 && activeCategory === "All" ? " featured-card" : ""}`;
    card.href = `project.html?id=${project.id}`;
    const tags = project.stack.map((tag) => `<span class="tag">${tag}</span>`).join("");

    card.innerHTML = `
      <div class="project-image">
        <img src="${project.image}" alt="${project.name} project visual">
        <span>${project.category}</span>
      </div>
      <div class="project-body">
        <p class="project-metric">${project.metric}</p>
        <h3>${project.name}</h3>
        <p>${project.blurb}</p>
        <div class="tagline">${tags}</div>
        <strong class="case-link">View full case study</strong>
      </div>
    `;
    gridEl.appendChild(card);
  });
}

renderFilters();
renderProjects();
