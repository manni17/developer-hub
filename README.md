# Steller developer hub

Public developer documentation for Steller (developers.steler.org). Vite, React, TypeScript, Tailwind and shadcn/ui.

## Commands

```
npm ci            # install from the lockfile
npm run dev       # local dev server
npm run build     # production build into dist/
npm run preview   # serve the production build locally
npm test          # unit tests
```

## Notes

- Site settings (contact address, base URL, navigation) live in `src/config/site.ts`.
- Brand tokens and logo files: `src/styles/brand-tokens.css` and `public/`.
- Keep real card codes, PINs, keys and secrets out of examples; use placeholders.