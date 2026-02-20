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

## Production Checklist

1. Update `index.html` SEO metadata with your final public URL:
   - `link rel="canonical"`
   - `link rel="sitemap"`
   - `og:url`
   - `og:image` and `twitter:image`
   - `Person.url` and `Person.image` inside JSON-LD
2. Update SEO support files with your final public URL:
   - `robots.txt` (`Sitemap` line)
   - `sitemap.xml` (`loc`)
3. Ensure required files exist:
   - `assets/deepak-kumar-resume.pdf`
   - `assets/deepak-kumar.jpg`
4. Confirm contact links are correct:
   - Email
   - GitHub
   - LinkedIn
5. Validate GitHub auto-load:
   - `data-github-username` matches your account
   - Project cards and metrics render without API errors
6. Mobile QA:
   - Sticky header and active nav indicator work on small screens
   - Buttons and links remain tap-friendly

## Deployment Options

### Netlify

1. New Site from Git.
2. Select this repository.
3. Build command: *(leave empty)*.
4. Publish directory: `/`.
5. Deploy.

### Vercel

1. Import project from GitHub.
2. Framework preset: `Other`.
3. Build command: *(leave empty)*.
4. Output directory: *(leave empty)*.
5. Deploy.

### GitHub Pages

1. Push repository to GitHub.
2. Go to `Settings` -> `Pages`.
3. Source: `Deploy from a branch`.
4. Branch: `main` and folder `/ (root)`.
5. Save and wait for the Pages URL.

## Post-Deploy Verification

Run these checks after publish:

1. Open the deployed URL in desktop + mobile.
2. Verify social preview:
   - Paste URL into LinkedIn Post Inspector or similar tool.
3. Confirm no missing assets in browser DevTools Network tab.
4. Confirm GitHub metrics/projects load without hitting rate limit.
