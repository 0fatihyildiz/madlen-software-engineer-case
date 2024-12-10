# Base image for building
FROM node:18-alpine AS build
RUN npm install -g pnpm
WORKDIR /app
COPY package.json ./
RUN pnpm install
COPY . .
RUN pnpm run build

# Production image
FROM node:18-alpine
RUN npm install -g pnpm
WORKDIR /app
COPY --from=build /app/.output .output
EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]