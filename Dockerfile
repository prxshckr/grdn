FROM oven/bun:1.3.14-alpine

WORKDIR /app

COPY . .

RUN bun install --frozen-lockfile --production

ENV NODE_ENV=production

EXPOSE 8080

CMD ["bun", "apps/garden/src/server/main.ts"]