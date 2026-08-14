# Bun monorepo

This Bun workspace separates deployable application code in `apps/` from shared monorepo packages in `packages/`.

## Commands

```sh
bun install
bun dev
bun run dev:all
bun run build
bun run check
```

- `bun dev` starts `@repo/garden` by default.
- `bun run dev:all` runs every workspace `dev` script.

- `apps/web` and `apps/garden` are small Bun applications.
- `packages/config` is a shared workspace package consumed by the apps through `workspace:*`.
- `packages/fp` provides typed `pipe` and `pipeAsync` utilities.
