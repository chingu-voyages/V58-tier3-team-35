ARG NODE_VERSION=20

FROM node:${NODE_VERSION}-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci && npm cache clean --force

ENV NODE_ENV=production

COPY . .

RUN chown -R node:node /usr/src/app

USER node

EXPOSE 4040

# Run the application.
CMD ["npm", "run", "start"]
