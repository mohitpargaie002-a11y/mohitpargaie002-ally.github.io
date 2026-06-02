const portfolio = {
  focusAreas: [
    {
      icon: "API",
      title: "API development",
      description:
        "Designing production-grade REST APIs and backend workflows with ASP.NET Core and .NET 8.",
    },
    {
      icon: "DB",
      title: "Microservices",
      description:
        "Building asynchronous services for notifications, reports, and enterprise workflows.",
    },
    {
      icon: "OPS",
      title: "Reliable delivery",
      description:
        "Applying Clean Architecture, audit logging, caching, CI/CD, and observability.",
    },
  ],
  skills: [
    {
      title: "Backend",
      items: ["C#", ".NET 8", "ASP.NET Core", "REST APIs", "Microservices"],
    },
    {
      title: "Data",
      items: [
        "MySQL",
        "MariaDB",
        "SQL Server",
        "Entity Framework Core",
        "Dapper",
        "LINQ",
      ],
    },
    {
      title: "Tools & Cloud",
      items: ["Git", "GitHub", "Docker", "Linux", "Microsoft Azure", "CI/CD"],
    },
    {
      title: "Additional",
      items: ["C++", "Python", "JavaScript", "React.js", "Node.js", "Blazor"],
    },
  ],
  projects: [
    {
      number: "01",
      title: "Parking Lot Slots Detection Model",
      description:
        "A computer vision model that analyzes parking lot footage to detect available slots and their exact spatial positions.",
      tags: ["Python", "OpenCV", "NumPy", "Matplotlib"],
      link: "https://github.com/morehit/Projects-/tree/main/Parking_lot_Slot_detection",
    },
    {
      number: "02",
      title: "Personal Portfolio Website",
      description:
        "A responsive personal portfolio for showcasing professional experience, projects, and technical skills.",
      tags: ["HTML", "CSS", "JavaScript", "GitHub Pages"],
      link: "#home",
    },
    {
      number: "03",
      title: "Full-Stack Blog Website",
      description:
        "A responsive MERN blogging platform with public views and an admin dashboard for complete post management.",
      tags: ["MongoDB", "Express.js", "React.js", "Node.js"],
      link: "https://github.com/mohitpargaie",
    },
  ],
};

const architectureSvg = `
  <svg viewBox="0 0 150 96" aria-hidden="true">
    <rect x="6" y="34" width="38" height="28" rx="7"></rect>
    <rect x="57" y="12" width="38" height="28" rx="7"></rect>
    <rect x="57" y="57" width="38" height="28" rx="7"></rect>
    <rect x="108" y="34" width="36" height="28" rx="7"></rect>
    <path d="M44 48h13M95 26h9c5 0 7 4 7 8M95 71h9c5 0 7-4 7-8M111 34v28"></path>
    <circle cx="25" cy="48" r="3"></circle>
    <circle cx="76" cy="26" r="3"></circle>
    <circle cx="76" cy="71" r="3"></circle>
    <circle cx="126" cy="48" r="3"></circle>
  </svg>
`;

const focusGrid = document.querySelector("#focus-grid");
const skillsGrid = document.querySelector("#skills-grid");
const featuredProjects = document.querySelector("#featured-projects");
const projectList = document.querySelector("#project-list");
const themeToggle = document.querySelector("#theme-toggle");
const mobileMenuButton = document.querySelector("#mobile-menu-button");
const navLinks = document.querySelector("#nav-links");
const pages = [...document.querySelectorAll("[data-page]")];
const routeLinks = [...document.querySelectorAll("[data-route]")];
const siteHeader = document.querySelector(".site-header");

focusGrid.innerHTML = portfolio.focusAreas
  .map(
    ({ icon, title, description }) => `
      <article class="focus-card">
        <span class="card-icon">${icon}</span>
        <h3>${title}</h3>
        <p>${description}</p>
      </article>
    `,
  )
  .join("");

skillsGrid.innerHTML = portfolio.skills
  .map(
    ({ title, items }) => `
      <article class="skill-group">
        <h3>${title}</h3>
        <ul>${items.map((item) => `<li>${item}</li>`).join("")}</ul>
      </article>
    `,
  )
  .join("");

featuredProjects.innerHTML = portfolio.projects
  .slice(0, 2)
  .map(
    ({ number, title, description }) => `
      <a class="featured-project" href="#projects" target="_blank" rel="noreferrer">
        <div class="featured-content">
          <span class="project-number">Project ${number}</span>
          <h3>${title}</h3>
          <p>${description}</p>
        </div>
        <div class="project-visual">${architectureSvg}</div>
      </a>
    `,
  )
  .join("");

projectList.innerHTML = portfolio.projects
  .map(
    ({ number, title, description, tags, link }) => `
      <a class="project-card fade-up" href="${link}"${link.startsWith("http") ? ' target="_blank" rel="noreferrer"' : ""}>
        <div class="project-topline">
          <div>
            <span class="project-number">Case study ${number}</span>
            <h2>${title}</h2>
          </div>
          <span class="project-arrow" aria-hidden="true">↗</span>
        </div>
        <p>${description}</p>
        <div class="project-tags">
          ${tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
        </div>
      </a>
    `,
  )
  .join("");

function currentRoute() {
  const route = window.location.hash.replace("#", "");
  return pages.some((page) => page.dataset.page === route) ? route : "home";
}

function renderRoute() {
  const route = currentRoute();

  pages.forEach((page) =>
    page.classList.toggle("active", page.dataset.page === route),
  );
  routeLinks.forEach((link) =>
    link.classList.toggle("active", link.dataset.route === route),
  );

  navLinks.classList.remove("open");
  mobileMenuButton.classList.remove("open");
  mobileMenuButton.setAttribute("aria-expanded", "false");
  mobileMenuButton.setAttribute("aria-label", "Open navigation menu");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem("portfolio-theme", theme);
  const isDark = theme === "dark";
  themeToggle.setAttribute(
    "aria-label",
    `Switch to ${isDark ? "light" : "dark"} mode`,
  );
  document
    .querySelector('meta[name="theme-color"]')
    .setAttribute("content", isDark ? "#121716" : "#f7f5f0");
}

themeToggle.addEventListener("click", () => {
  applyTheme(
    document.documentElement.dataset.theme === "dark" ? "light" : "dark",
  );
});

mobileMenuButton.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  mobileMenuButton.classList.toggle("open", isOpen);
  mobileMenuButton.setAttribute("aria-expanded", String(isOpen));
  mobileMenuButton.setAttribute(
    "aria-label",
    `${isOpen ? "Close" : "Open"} navigation menu`,
  );
});

window.addEventListener("hashchange", renderRoute);
window.addEventListener("scroll", () => {
  siteHeader.classList.toggle("scrolled", window.scrollY > 4);
});

document.querySelector("#current-year").textContent = new Date().getFullYear();

const savedTheme = localStorage.getItem("portfolio-theme");
const preferredTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
  ? "dark"
  : "light";
applyTheme(savedTheme || preferredTheme);
renderRoute();
