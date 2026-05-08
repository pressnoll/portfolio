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

  filtered.forEach((project) => {
    const card = document.createElement("a");
    card.className = "project-card";
    card.href = `project.html?id=${project.id}`;
    const tags = project.stack.map((tag) => `<span class="tag">${tag}</span>`).join("");

    card.innerHTML = `
      <div class="project-image">
        <img src="${project.image}" alt="${project.name} project visual">
        <span>${project.category}</span>
      </div>
      <div class="project-body">
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

const contactForm = document.querySelector(".contact-form");
const formStatus = document.querySelector(".form-status");

if (contactForm && formStatus) {
  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const submitButton = contactForm.querySelector("button[type='submit']");
    const formData = new FormData(contactForm);

    formStatus.className = "form-status is-pending";
    formStatus.textContent = "Sending message...";
    submitButton.disabled = true;

    try {
      const response = await fetch(contactForm.action, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Message could not be sent.");
      }

      contactForm.reset();
      formStatus.className = "form-status is-success";
      formStatus.textContent = "Message delivered. I will get back to you soon.";
    } catch (error) {
      formStatus.className = "form-status is-error";
      formStatus.textContent = "Something went wrong. Please email me directly instead.";
    } finally {
      submitButton.disabled = false;
    }
  });
}
