FROM iinfinity/node:16

ENV NODE_ENV=production

WORKDIR /app

COPY ["./dist/apps/aphorism/", "/app"]

RUN pnpm i --prod \
  && pnpm prisma:init

RUN chown -R runner:runner /app

CMD ["pnpm", "start"]
