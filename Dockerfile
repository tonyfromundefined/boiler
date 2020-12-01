FROM node:14-alpine

WORKDIR /usr/src/boiler

COPY .yarn/releases/ /usr/src/boiler/.yarn/releases/
COPY .yarn/cache/ /usr/src/boiler/.yarn/cache/
COPY package.json yarn.lock .yarnrc.yml  /usr/src/boiler/

RUN yarn install --immutable --immutable-cache

COPY build/ /usr/src/boiler/build/

ENV NODE_ENV production

WORKDIR /usr/src/boiler

EXPOSE 3000

CMD ["yarn", "start"]
