PLANET_SCALE_DB=adamatti
PLANET_SCALE_BRANCH=main

.DEFAULT_GOAL := help

.PHONY: help
help: ## show this help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

clean:
	@rm -rf dist

clean-hard: clean
	@rm -rf node_modules

install:
	@yarn --silent install

format: prisma-format
	@yarn --silent format

lint: format
	@yarn --silent lint --fix

check: lint prisma-validate

prisma-format:
	@yarn --silent prisma format

prisma-validate:
	@yarn --silent prisma validate

prisma-generate: ## transform prisma schema to code
	@yarn --silent prisma generate

build: prisma-generate
	@yarn --silent build

run-prod: build
	@yarn --silent start:prod

run-watch:
	@tsc-watch --onSuccess "node ./dist/main.js"

pscale-connect:
	 pscale connect $(PLANET_SCALE_DB) $(PLANET_SCALE_BRANCH) --port 3309