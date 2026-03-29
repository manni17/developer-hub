# Design tokens (developers.steler.org)

Visual consistency comes from the **live site CSS**, not ad-hoc colors in page components.

## Source of truth

1. Open `https://developers.steler.org/developers`.
2. In DevTools → Network, open the main CSS asset under `/assets/index-*.css`.
3. Copy the `:root { ... }` block — semantic variables use HSL triplets (`--background`, `--foreground`, `--accent`, `--code-bg`, `--content-max-width`, etc.).

When adding UI, reuse existing Tailwind mappings (`bg-code-bg`, `text-accent`, `border-border`, …) so new sections match production.

## Monorepo mirror

Steller’s canonical handoff doc also lives at `docs/DEVELOPER_HUB_DESIGN_TOKENS.md` in the `manni17/steller-v3` repo.
