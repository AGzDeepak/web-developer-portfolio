const navLinks = [...document.querySelectorAll(".panel-nav a")];
const ambientA = document.querySelector(".ambient-a");
const ambientB = document.querySelector(".ambient-b");
const githubGrid = document.getElementById("githubProjectGrid");
const projectStatus = document.getElementById("projectStatus");
const githubProfileLink = document.getElementById("githubProfileLink");
const githubAvatar = document.getElementById("githubAvatar");
const githubName = document.getElementById("githubName");
const githubBio = document.getElementById("githubBio");
const githubLocation = document.getElementById("githubLocation");
const githubCompany = document.getElementById("githubCompany");
const githubWebsite = document.getElementById("githubWebsite");
const metricRepos = document.getElementById("metricRepos");
const metricFollowers = document.getElementById("metricFollowers");
const metricFollowing = document.getElementById("metricFollowing");
const metricStars = document.getElementById("metricStars");
const metricLastPush = document.getElementById("metricLastPush");
const languageStats = document.getElementById("languageStats");

const githubUsername = (document.body.dataset.githubUsername || "").trim();
const githubLimit = Number.parseInt(document.body.dataset.githubLimit || "6", 10);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle("visible", entry.isIntersecting);
    });
  },
  { threshold: 0.18, rootMargin: "0px 0px -8% 0px" }
);

let revealIndex = 0;
const registerRevealItems = (items) => {
  items.forEach((item) => {
    if (!(item instanceof HTMLElement) || item.dataset.revealReady === "true") return;

    item.style.setProperty("--delay", `${Math.min(revealIndex * 90, 540)}ms`);

    const pattern = revealIndex % 3;
    if (pattern === 1) item.classList.add("reveal-left");
    if (pattern === 2) item.classList.add("reveal-right");

    item.dataset.revealReady = "true";
    revealObserver.observe(item);
    revealIndex += 1;
  });
};

registerRevealItems([...document.querySelectorAll("[data-reveal]")]);

const sections = navLinks
  .map((link) => {
    const target = link.getAttribute("href");
    if (!target || !target.startsWith("#")) return null;
    return document.querySelector(target);
  })
  .filter(Boolean);

const markActiveNav = () => {
  if (!sections.length || !navLinks.length) return;

  const anchor = window.scrollY + window.innerHeight * 0.35;
  let activeId = sections[0].id;

  sections.forEach((section) => {
    if (anchor >= section.offsetTop) {
      activeId = section.id;
    }
  });

  navLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${activeId}`;
    link.classList.toggle("active", isActive);
  });
};

window.addEventListener("scroll", markActiveNav, { passive: true });
window.addEventListener("resize", markActiveNav);
markActiveNav();

let scrollTicking = false;
const applyScrollFx = () => {
  const y = window.scrollY;
  if (ambientA) ambientA.style.transform = `translate3d(0, ${y * 0.04}px, 0)`;
  if (ambientB) ambientB.style.transform = `translate3d(0, ${y * -0.035}px, 0)`;
  scrollTicking = false;
};

const handleAnimatedScroll = () => {
  if (!scrollTicking) {
    scrollTicking = true;
    window.requestAnimationFrame(applyScrollFx);
  }
};

window.addEventListener("scroll", handleAnimatedScroll, { passive: true });
applyScrollFx();

const yearNode = document.getElementById("year");
if (yearNode) {
  yearNode.textContent = new Date().getFullYear();
}

const formatDate = (value) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Unknown update";
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const updateInsightText = (node, text) => {
  if (node) node.textContent = text;
};

const renderLanguageStats = (repos) => {
  if (!languageStats) return;

  const totals = repos.reduce((acc, repo) => {
    const lang = repo.language;
    if (!lang) return acc;
    acc[lang] = (acc[lang] || 0) + 1;
    return acc;
  }, {});

  const ranked = Object.entries(totals)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6);

  if (!ranked.length) {
    languageStats.innerHTML = '<p class="muted">No language data available.</p>';
    return;
  }

  const totalReposWithLanguage = ranked.reduce((sum, [, count]) => sum + count, 0);
  languageStats.replaceChildren(
    ...ranked.map(([language, count]) => {
      const row = document.createElement("div");
      row.className = "language-row";

      const name = document.createElement("span");
      name.textContent = language;

      const ratio = document.createElement("strong");
      const percent = Math.round((count / totalReposWithLanguage) * 100);
      ratio.textContent = `${count} repo${count > 1 ? "s" : ""} (${percent}%)`;

      row.append(name, ratio);
      return row;
    })
  );
};

const updateInsights = (profile, repos) => {
  if (githubAvatar && profile.avatar_url) {
    githubAvatar.src = profile.avatar_url;
    githubAvatar.alt = `${profile.login || "GitHub"} avatar`;
  }

  updateInsightText(githubName, profile.name || profile.login || "GitHub Profile");
  updateInsightText(
    githubBio,
    profile.bio || "Public profile bio is not available."
  );
  updateInsightText(
    githubLocation,
    `Location: ${profile.location || "N/A"}`
  );
  updateInsightText(
    githubCompany,
    `Company: ${profile.company || "N/A"}`
  );
  updateInsightText(
    githubWebsite,
    `Website: ${profile.blog ? profile.blog : "N/A"}`
  );

  const repoCount = repos.length;
  const totalStars = repos.reduce(
    (sum, repo) => sum + (repo.stargazers_count || 0),
    0
  );
  const latestPush = repos
    .map((repo) => repo.pushed_at)
    .filter(Boolean)
    .sort((a, b) => new Date(b) - new Date(a))[0];

  updateInsightText(metricRepos, String(profile.public_repos ?? repoCount));
  updateInsightText(metricFollowers, String(profile.followers ?? 0));
  updateInsightText(metricFollowing, String(profile.following ?? 0));
  updateInsightText(metricStars, String(totalStars));
  updateInsightText(metricLastPush, latestPush ? formatDate(latestPush) : "N/A");

  renderLanguageStats(repos);
};

const createRepoCard = (repo) => {
  const card = document.createElement("article");
  card.className = "github-card";
  card.setAttribute("data-reveal", "");

  const title = document.createElement("h3");
  title.textContent = repo.name;

  const description = document.createElement("p");
  description.textContent =
    repo.description || "No repository description provided yet.";

  const metrics = document.createElement("div");
  metrics.className = "repo-metrics";

  const languageTag = document.createElement("span");
  languageTag.textContent = repo.language || "Language: N/A";

  const starTag = document.createElement("span");
  starTag.textContent = `Stars: ${repo.stargazers_count ?? 0}`;

  const updateTag = document.createElement("span");
  updateTag.textContent = `Updated: ${formatDate(repo.updated_at)}`;

  metrics.append(languageTag, starTag, updateTag);

  const actions = document.createElement("div");
  actions.className = "repo-actions";

  const codeLink = document.createElement("a");
  codeLink.href = repo.html_url;
  codeLink.target = "_blank";
  codeLink.rel = "noopener";
  codeLink.textContent = "Code";
  actions.append(codeLink);

  const homepage = typeof repo.homepage === "string" ? repo.homepage.trim() : "";
  if (/^https?:\/\//i.test(homepage)) {
    const liveLink = document.createElement("a");
    liveLink.href = homepage;
    liveLink.target = "_blank";
    liveLink.rel = "noopener";
    liveLink.textContent = "Live";
    actions.append(liveLink);
  }

  card.append(title, description, metrics, actions);
  return card;
};

const loadPublicProjects = async () => {
  if (!githubGrid || !projectStatus) return;

  if (!githubUsername || githubUsername.toLowerCase() === "your_github_username") {
    projectStatus.textContent =
      "Set your GitHub username in index.html (data-github-username) to auto-load public projects.";
    return;
  }

  if (githubProfileLink) {
    githubProfileLink.href = `https://github.com/${githubUsername}`;
  }

  projectStatus.textContent = `Loading public repositories from @${githubUsername}...`;

  try {
    const [profileResponse, reposResponse] = await Promise.all([
      fetch(`https://api.github.com/users/${encodeURIComponent(githubUsername)}`, {
        headers: { Accept: "application/vnd.github+json" },
      }),
      fetch(
        `https://api.github.com/users/${encodeURIComponent(githubUsername)}/repos?sort=updated&per_page=100`,
        {
          headers: { Accept: "application/vnd.github+json" },
        }
      ),
    ]);

    if (!profileResponse.ok || !reposResponse.ok) {
      const status = !profileResponse.ok
        ? profileResponse.status
        : reposResponse.status;
      throw new Error(`GitHub API request failed (${status})`);
    }

    const [profile, repos] = await Promise.all([
      profileResponse.json(),
      reposResponse.json(),
    ]);

    updateInsights(profile, repos);

    if (githubProfileLink && profile.html_url) {
      githubProfileLink.href = profile.html_url;
    }

    const curated = repos
      .filter((repo) => !repo.fork && !repo.archived)
      .sort((a, b) => {
        const starDiff = (b.stargazers_count || 0) - (a.stargazers_count || 0);
        if (starDiff !== 0) return starDiff;
        return new Date(b.updated_at) - new Date(a.updated_at);
      })
      .slice(0, Number.isFinite(githubLimit) && githubLimit > 0 ? githubLimit : 6);

    if (!curated.length) {
      projectStatus.textContent =
        "No qualifying public repositories found. Add repositories to GitHub or keep fallback projects.";
      return;
    }

    const cards = curated.map(createRepoCard);
    githubGrid.replaceChildren(...cards);
    registerRevealItems(cards);

    projectStatus.textContent = `Showing ${curated.length} public repositories from @${githubUsername}.`;
  } catch (error) {
    projectStatus.textContent =
      "Could not load GitHub projects right now. Fallback projects are shown below.";
    if (languageStats) {
      languageStats.innerHTML =
        '<p class="muted">Could not load language stats right now.</p>';
    }
  }
};

loadPublicProjects();
