const portfolio = {
  focusAreas: [
    {
      icon: "API",
      title: "API development",
      description: "Designing clean REST endpoints and backend workflows with ASP.NET Core.",
    },
    {
      icon: "DB",
      title: "Data access",
      description: "Working with SQL databases, practical schemas, and Entity Framework Core.",
    },
    {
      icon: "OPS",
      title: "Reliable delivery",
      description: "Keeping services testable, observable, and straightforward to maintain.",
    },
  ],
  skills: [
    { title: "Backend", items: ["C#", ".NET", "ASP.NET Core", "REST APIs"] },
    { title: "Data", items: ["SQL Server", "PostgreSQL", "Entity Framework Core", "LINQ"] },
    { title: "Tools", items: ["Git", "Docker", "Postman", "CI/CD"] },
  ],
  projects: [
    {
      number: "01",
      title: "Order Management API",
      description:
        "A sample REST API for managing customers, inventory, and order workflows with clear service boundaries.",
      tags: ["ASP.NET Core", "C#", "EF Core", "SQL Server"],
      link: "https://github.com/",
    },
    {
      number: "02",
      title: "Support Ticket Service",
      description:
        "A sample backend service for ticket assignment, status tracking, and audit-friendly updates.",
      tags: ["Web API", ".NET", "PostgreSQL", "Docker"],
      link: "https://github.com/",
    },
    {
      number: "03",
      title: "Developer Activity Dashboard",
      description:
        "A sample dashboard API that aggregates activity data and exposes summary metrics for a small frontend.",
      tags: ["C#", "REST API", "LINQ", "Azure"],
      link: "https://github.com/",
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
      <a class="featured-project" href="#projects">
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
      <a class="project-card fade-up" href="${link}" target="_blank" rel="noreferrer">
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

  pages.forEach((page) => page.classList.toggle("active", page.dataset.page === route));
  routeLinks.forEach((link) => link.classList.toggle("active", link.dataset.route === route));

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
  themeToggle.setAttribute("aria-label", `Switch to ${isDark ? "light" : "dark"} mode`);
  document.querySelector('meta[name="theme-color"]').setAttribute("content", isDark ? "#121716" : "#f7f5f0");
}

themeToggle.addEventListener("click", () => {
  applyTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark");
});

mobileMenuButton.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  mobileMenuButton.classList.toggle("open", isOpen);
  mobileMenuButton.setAttribute("aria-expanded", String(isOpen));
  mobileMenuButton.setAttribute("aria-label", `${isOpen ? "Close" : "Open"} navigation menu`);
});

window.addEventListener("hashchange", renderRoute);
window.addEventListener("scroll", () => {
  siteHeader.classList.toggle("scrolled", window.scrollY > 4);
});

document.querySelector("#current-year").textContent = new Date().getFullYear();

const savedTheme = localStorage.getItem("portfolio-theme");
const preferredTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
applyTheme(savedTheme || preferredTheme);
renderRoute();
