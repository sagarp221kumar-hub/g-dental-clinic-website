# Project Guidance

## User Preferences

- Clean, modern single-page layout
- Soft, calm color palette
- Simple sections: About, Services, Contact
- Book Now button links to WhatsApp

## Verified Commands

- **typecheck**: `pnpm typecheck`
- **fix**: `pnpm fix`
- **build**: `pnpm build`

## Learnings

- Tailwind theme colors must map CSS variables with the oklch(var(--x) / <alpha-value>) pattern for opacity modifiers like bg-success/10 to work; index.css CSS vars alone are not enough.
- Motoko has no triple-quoted string literals; build multi-line docs by concatenating single-quoted strings with explicit \n escapes.
- Time.now() returns Int, not Nat; a Nat timestamp field needs Time.now().toNat().
- With Enhanced Migration and check-limit=1, fold all state initialization into a single migration file rather than adding a second timestamped file.
- generate_image writes to public/assets/generated/<name>.dim_WxH.ext; reference that exact path.
- Biome's useSemanticElements rejects role='status' on a div; use the native <output> element for form success messages.
