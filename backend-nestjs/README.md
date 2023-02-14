WIP

# How to run it locally

- optional: edit `/etc/hosts` (or similar), add `127.0.0.1 superapp.com`
- install dependencies: `yarn install`
- create a `.env` file (or set env vars) based on `.env.template`
- go to firebase, export `firebase.config.json` to `src/auth/firebase` (+ add `api_key` entry)
- run it - `yarn start:dev`

# Pending things

- graphql
- release / changelog
- better error handling
- better logs

# TL/DR: Planet scale (free mysql like)

- Install: `brew install planetscale/tap/pscale`
- Port forward: `make pscale-connect` (check parameters on top of `Makefile`)

# References

- https://fly.io/
  - https://fly.io/docs/reference/configuration/
  - https://til.simonwillison.net/fly/fly-docker-registry
  - https://medium.com/eleven-sh/deploying-a-simple-node-js-app-with-https-on-cloud-providers-in-2022-heroku-render-fly-io-aws-9358294803c5