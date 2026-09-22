# Karishma portfolio

## Editing case studies

Case-study content is managed through [Pages CMS](https://app.pagescms.org), not by editing React code.

### First-time access

1. Open `app.pagescms.org` and sign in with the GitHub account that has access to this repository.
2. Install the Pages CMS GitHub App when prompted, granting it access only to this repository.
3. Open this repository and select **Case studies**.

### What editors can do

- Create a project with **New case study**. Choose a unique URL slug and display order.
- Edit every case-study value shown on the site, including its focus, industry, role, timeframe, platform, summary, tags, tools, display order, and colour theme.
- Manage the story as a list of named **Case-study sections**. Each section has its own heading and rich-text content, and can be added, edited, removed, or reordered without touching code.
- Add, replace, reorder, caption, or remove the cover and supporting images. Uploaded images are kept in `public/media/projects`.
- Insert images within any section through its rich-text editor.
- Delete a case study with the collection's delete action.

Saving creates a Git commit and the existing GitHub Pages workflow publishes the update automatically. Allow a few minutes for the deployment to finish.

### Important notes

- The **URL slug** becomes `/work/your-slug`. Avoid changing a slug after sharing the link; use lowercase letters, numbers, and hyphens.
- **Display order** controls the work archive order and the next-case-study link.
- A new case study appears in the Work archive automatically. Turn on **Show on home page** and set its order to add it to the selected-work section. Projects listed under Experience are controlled separately in `src/data/site.json` and should be updated by a site maintainer when needed.
- Use the image-description fields to provide useful alt text, not file names.

## Vite template notes

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.
You can also try [the experimental native React Compiler support in plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md#rust-react-compiler) by using `compiler: true` in the plugin options instead of using the Babel plugin.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```

You can also install [eslint-plugin-react-x](https://npmx.dev/package/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://npmx.dev/package/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```
