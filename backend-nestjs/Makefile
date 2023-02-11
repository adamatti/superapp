DOCKER_TAG=app-backend:local
RELEASE_TAG:=$(shell date -u +%Y%m%dT%H%M%SZ)
FLYIO_APP_NAME=adamatti
PLANET_SCALE_DB=adamatti
PLANET_SCALE_BRANCH=main

.DEFAULT_GOAL := help

.PHONY: help
help: ## show this help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

clean: ## Remove temp folders
	@rm -rf dist
	@rm -f package-lock.json

clean-hard: clean ## clean + cached libs
	@rm -rf node_modules

install: ## install dependencies
	@rm -f package-lock.json
	@yarn --silent install

format: prisma-format ## format code
	@yarn --silent format

lint: format ## lint rules
	@yarn --silent lint --fix

check: lint prisma-validate build ## code validations

prisma-format:
	@yarn --silent prisma format

prisma-validate:
	@yarn --silent prisma validate

prisma-generate: ## transform prisma schema to code
	@yarn --silent prisma generate

prisma-db-push: ## apply db changes
	@yarn --silent prisma db push

build: install prisma-generate ## build bundle
	@yarn --silent build

run-prod: build ## run as prod
	@yarn --silent start:prod

run-watch: ## run as dev (with watch)
	@tsc-watch --onSuccess "node ./dist/main.js"

run-dev: run-watch ## run as dev

pscale-connect: ## Create a local map (to do prisma migrations)
	 pscale connect $(PLANET_SCALE_DB) $(PLANET_SCALE_BRANCH) --port 3309

docker-build: ## Build docker image
	docker build . \
		-t $(DOCKER_TAG) \
		-t registry.fly.io/$(FLYIO_APP_NAME):$(RELEASE_TAG) \
		--platform linux/amd64

docker-build-builder: ## Build docker image, builder stage only
	docker build . \
		--target bebuilder \
		-t app-backend-builder:local \
		--platform linux/amd64

docker-sh-builder: docker-build-builder ## Troubleshoot builder stage
	docker run -it --rm \
		--entrypoint /bin/sh \
		-w /app app-backend-builder:local

docker-sh-only:
	docker run -it --rm --entrypoint /bin/sh -w /app $(DOCKER_TAG)

docker-sh: docker-build docker-sh-only ## Run sh on docker image

docker-run-only:
	docker run -it --rm \
		-e APP_TOKEN=$(APP_TOKEN) \
		-e DATABASE_URL=$(DATABASE_URL) \
		-p 8080:8080 \
		$(DOCKER_TAG)

docker-run: docker-build docker-run-only ## run docker image

fly-deploy-image: docker-build ## Deploy to fly.io using docker image process
	flyctl auth docker
	docker push registry.fly.io/$(FLYIO_APP_NAME):$(RELEASE_TAG)
	flyctl deploy --app adamatti --image registry.fly.io/$(FLYIO_APP_NAME):$(RELEASE_TAG)

fly-deploy: build ## Standard way to deploy to fly.io
	@fly deploy
