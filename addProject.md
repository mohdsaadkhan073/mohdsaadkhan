# How to Add a New Project

Adding a new project to your portfolio is simple, highly scalable, and requires zero changes to the React code. The entire Projects system is JSON-driven.

## 1. Prepare Your Media

You need a preview image or video for your project.

- **Images:** Place your images inside the `public/projects/images/` directory.
- **Videos:** Place your videos inside the `public/projects/videos/` directory.

*(Note: If you don't have these folders yet, simply create them inside the `public/` folder).*

- **Recommended Image Format:** WebP or optimized JPG.
- **Recommended Video Format:** MP4 (Keep it under 5MB for fast loading, no audio needed since it autoplays muted).

## 2. Prepare Your README (Optional but recommended)

If you have a detailed Markdown (`.md`) file describing your project:

1. Create a `readmes/` folder inside the `public/` directory (so the path is `public/readmes/`).
2. Save your markdown file there (e.g., `public/readmes/my-project.md`).

When users click "View README" in the overlay, it will open this file!

## 3. Update the Database (`src/data/projects.json`)

Open `src/data/projects.json` and add a new JSON object to the array. 

Here is the exact structure you need to follow:

```json
{
  "title": "Your Awesome Project",
  "slug": "your-awesome-project",
  "shortDescription": "A quick 1-sentence summary of the project.",
  "longDescription": "A detailed paragraph explaining the architecture, the problem it solves, and the overall overview of the system.",
  "features": [
    "Feature 1: Real-time data processing",
    "Feature 2: Secure authentication",
    "Feature 3: Automated workflows"
  ],
  "category": ["AI", "Web", "Automation"],
  "priority": "high",
  "featured": true,
  "previewType": "image", 
  "preview": "/projects/images/my-project-preview.jpg",
  "github": "https://github.com/mohdsaadkhan073/your-repo",
  "live": "https://your-live-website.com",
  "readme": "/readmes/your-awesome-project.md",
  "technologies": ["React", "Python", "Docker"]
}
```

### Explanation of Fields:
- `featured`: If set to `true`, the project will appear on the Homepage (limited to 6). If `false`, it will only appear on the full `/projects` archive page.
- `previewType`: Must be either `"image"` or `"video"`.
- `preview`: The path to the media. Because it's in the `public` folder, you just start with `/` (e.g., `/projects/videos/demo.mp4`). You can also use direct external URLs (like an unsplash link or a hosted video link).
- `live`: If the project isn't deployed, simply leave it empty: `""`. The overlay will automatically disable the Live Demo button.
- `readme`: The path to your Markdown file. If you don't have one, leave it empty: `""`. The "View README" button will automatically hide itself.

That's it! Save the JSON file, and the portfolio will automatically update everywhere.
