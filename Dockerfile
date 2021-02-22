FROM node:14-alpine

WORKDIR /usr/src/app

COPY .yarn/cache/ /usr/src/app/.yarn/cache/
COPY .yarn/plugins/ /usr/src/app/.yarn/plugins/
COPY .yarn/releases/ /usr/src/app/.yarn/releases/
COPY package.json yarn.lock .yarnrc.yml  /usr/src/app/

RUN yarn install --immutable --immutable-cache

COPY build/ /usr/src/app/build/

ENV NODE_ENV production

WORKDIR /usr/src/app

EXPOSE 3000

# `/.env` file should be downloaded in runtime just before 'yarn start'
CMD ["yarn", "start"]
