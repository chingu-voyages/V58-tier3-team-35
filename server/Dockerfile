# syntax=docker/dockerfile:1

ARG NODE_VERSION=20

FROM node:${NODE_VERSION}-alpine AS base
WORKDIR /home/node/app/

COPY package*.json ./
RUN npm ci

COPY . .

FROM base AS build
RUN npm run build

FROM node:${NODE_VERSION}-alpine AS prod
WORKDIR /home/node/app/

RUN chown -R node:node /home/node/app

ENV NODE_ENV=production

RUN apk add --no-cache curl

USER node

COPY --chown=node:node package*.json ./

USER node

RUN npm ci --omit=dev

COPY --chown=node:node --from=build /home/node/app/dist ./dist

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:3000/health || exit 1

CMD ["node", "dist/server.js"]

