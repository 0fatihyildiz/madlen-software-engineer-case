FROM node:18-alpine
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN corepack enable pnpm && pnpm install
COPY . .
EXPOSE 3000
CMD ["pnpm", "run", "dev", "--host"]