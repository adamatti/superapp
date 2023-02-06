DOCKER_TAG=app-frontend:local

.DEFAULT_GOAL := help

.PHONY: help
help: ## show this help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

clean: ## Remove build files
	@rm -rf dist

install: ## install dependencies
	@yarn --silent

run: ## run app as dev
	@yarn --silent dev

build: clean ## build app (prod)
	@yarn --silent build
# copy to backend project
	@rm -rf ../backend-nestjs/build/public-fe
	@cp -r ./dist/ ../backend-nestjs/build/public-fe

lint: ## lint rules
	@yarn --silent lint --fix

check: lint build ## app checks

docker-build: ## build docker image
	docker build . -t $(DOCKER_TAG)

docker-build-builder:
	docker build . -t app-frontend-builder:local --target febuilder

docker-sh-builder: docker-build-builder ## troubleshoot builder stage
	docker run -it --rm \
		--entrypoint /bin/sh \
		-w /app \
		app-frontend-builder:local

docker-sh: docker-build ## run sh on docker image
	docker run -it --rm \
		--entrypoint /bin/sh \
		-w /app \
		$(DOCKER_TAG)

docker-run: docker-build ## run docker image
	docker run -it --rm \
		-p 8080:8080 \
		$(DOCKER_TAG)

run-html: build ## run as prod
	serve dist/ -l 8080

