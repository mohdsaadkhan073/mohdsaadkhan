# Career Buddy Frontend

Career Buddy is a static multi-page frontend that helps students explore careers, colleges, scholarships, jobs, skills, and entrance exams in one place.

## What It Includes

- Career discovery quiz
- Career, college, job, skill, scholarship, and exam pages
- Shared header, footer, auth modal, and chatbot UI components
- JSON-based local data source for all major sections
- Static asset structure that is ready to deploy on Vercel

## Project Structure

- `index.html` and other page files at the project root
- `components/` for shared HTML partials
- `css/` for styling
- `js/` for page logic
- `data/` for local JSON datasets
- `assets/` for images and videos

## Local Development

Because this is a static site, you can run it with any simple local server.

Example with Python:

```bash
python -m http.server 3000
```

Then open `http://localhost:3000`.

## Vercel Deployment

This project is prepared for Vercel as a static site:

- All main HTML pages are served from the repo root
- Shared components live in `components/`
- Shared CSS, JS, assets, and data use root-based paths such as `/css/style.css`
- No build step is required

Deploy steps:

1. Import the repository into Vercel.
2. Keep the framework preset as `Other`.
3. Leave the build command empty.
4. Leave the output directory empty.
5. Deploy.

## Notes

- The project currently uses local JSON files from `data/`.
- The chatbot widget is embedded through an external Omnidimension script.
- `node_modules/` exists in the repo right now, but it is not needed for Vercel static hosting.
