ARG NODE_VERSION=19.6.0
ARG ALPINE_VERSION=3.17

FROM node:${NODE_VERSION}-alpine${ALPINE_VERSION} as bebuilder

RUN mkdir /app
WORKDIR /app

COPY package.json yarn.lock /app/
RUN yarn --silent install

COPY . /app
RUN yarn --silent prisma generate
RUN yarn --silent build
##############################################################
FROM node:${NODE_VERSION}-alpine${ALPINE_VERSION} as berunner

ENV PORT 8080
ENV NODE_ENV "production"

WORKDIR /app

COPY --from=bebuilder /app/node_modules /app/node_modules/
COPY --from=bebuilder /app/dist /app/

ARG PUBLIC_FOLDER=build/public-fe
COPY  ./${PUBLIC_FOLDER} /public

EXPOSE 8080
CMD ["node", "/app/main.js"]