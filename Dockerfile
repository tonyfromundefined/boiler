FROM node:14-alpine

WORKDIR /usr/src/boiler

COPY .yarn/cache/ /usr/src/boiler/.yarn/cache/
COPY .yarn/plugins/ /usr/src/boiler/.yarn/plugins/
COPY .yarn/releases/ /usr/src/boiler/.yarn/releases/
COPY package.json yarn.lock .yarnrc.yml  /usr/src/boiler/

RUN yarn install --immutable --immutable-cache

COPY build/ /usr/src/boiler/build/

ENV NODE_ENV production

WORKDIR /usr/src/boiler

EXPOSE 3000

# `/.env` file should be downloaded in runtime just before 'yarn start'
CMD ["yarn", "start"]
