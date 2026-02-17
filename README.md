# Professional Web Developer Portfolio

Dark-themed developer portfolio built with plain HTML, CSS, and JavaScript.

## Included Professional Sections

- Hero and positioning statement
- About and education
- Skills recruiters expect
- Live developer insights (profile metrics + language stats)
- Public GitHub projects (auto-loaded)
- Experience timeline
- Contact and resume CTA

## Files

- `index.html`: Semantic structure + portfolio content
- `styles.css`: Layout, responsive design, animations, components
- `script.js`: Scroll effects, active nav, GitHub project loader

## Mandatory Setup

1. Set your GitHub username in `index.html`:
   - Current value: `data-github-username="AGzDeepak"`
   - Change this only if you want to switch accounts.
2. Update personal details:
   - Name, headline, about text, education
3. Update contact links:
   - `mailto:deepakyuoyt@gmail.com`
   - GitHub: `https://github.com/AGzDeepak`
   - LinkedIn: `https://www.linkedin.com/in/deepak-kumar-443509364/`
4. Add your resume file:
   - `assets/deepak-kumar-resume.pdf` (or update the link path)
5. Replace fallback sample projects if needed.

## How GitHub Auto-Load Works

- `script.js` fetches your public profile + repositories from GitHub API.
- It gathers and shows:
  - Name, bio, location, company, website
  - Repo count, followers, following
  - Total stars and latest push date
  - Top languages from public repositories
- It filters and sorts repos, then displays top projects automatically.
- If username is missing or API fails, fallback project cards remain visible.

## Run Locally

Open `index.html` directly, or run:

```powershell
python -m http.server 5500
```

Then open `http://localhost:5500`.
