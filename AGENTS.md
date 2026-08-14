# Garden conventions

- Use TypeScript with strict types; avoid `any`.
- Prefer immutable state updates.
- Use `pipe` from `@repo/fp` for multi-step transformations.
- Keep ECS systems synchronous; model async work as effects/events.
- Put unit tests beside or under `test/`, using Bun’s test runner.
- Run `bun run check` and `bun run build` after changes.
