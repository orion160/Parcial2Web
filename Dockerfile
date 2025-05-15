# syntax=docker/dockerfile:1

FROM docker.io/library/node:24-alpine AS dev-dependencies
WORKDIR /app
COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm npm ci

FROM docker.io/library/node:24-alpine AS prod-dependencies
WORKDIR /app
COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm npm ci --omit=dev

FROM docker.io/library/node:24-alpine as build
WORKDIR /app
COPY . .
COPY --from=dev-dependencies /app/node_modules ./node_modules
RUN npm run build

FROM docker.io/library/node:24-alpine
WORKDIR /app
COPY package.json package-lock.json ./
COPY --from=prod-dependencies /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

USER node

EXPOSE 3000

CMD ["node", "dist/main"]
