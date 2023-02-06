ARG NODE_VERSION=19.6.0
ARG ALPINE_VERSION=3.17

FROM node:${NODE_VERSION}-alpine${ALPINE_VERSION} as febuilder

RUN mkdir /app
WORKDIR /app

COPY package.json yarn.lock /app/
RUN yarn --silent install

COPY . /app/
RUN yarn --silent build

##############################################################
FROM node:${NODE_VERSION}-alpine${ALPINE_VERSION} as ferunner
RUN npm install -g serve
WORKDIR /app
COPY --from=febuilder /app/dist /app
EXPOSE 8080
ENTRYPOINT ["serve", "/app/", "-l", "8080"]
