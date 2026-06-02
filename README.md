# Backend Developer Portfolio

A dependency-free, mobile-friendly personal portfolio inspired by the compact structure of
`phillipche.com`, adapted for a backend-focused C# and .NET developer.

## Run locally

From this folder:

```powershell
python -m http.server 4173
```

Then open `http://localhost:4173`.

## Personalize it

The portfolio is populated with Mohit's current resume details. Before publishing future updates:

- Keep the latest resume PDF in the repository root and update its link in `index.html` if the filename changes.
- Point each project in `app.js` to its dedicated repository when available.
- Update experience, skills, and social metadata in `index.html` as your profile evolves.

## Deploy

The site contains only static files, so it can be deployed directly to GitHub Pages, Netlify,
Vercel, or any static hosting provider.
