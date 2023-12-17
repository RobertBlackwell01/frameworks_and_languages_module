.PHONY: help
.DEFAULT_GOAL:=help
help:	## display this help
	@awk 'BEGIN {FS = ":.*##"; printf "\nUsage:\n  make \033[36m<target>\033[0m\n\nTargets:\n"} /^[a-zA-Z_-]+:.*?##/ { printf "  \033[36m%-8s\033[0m %s\n", $$1, $$2 } END{print ""}' $(MAKEFILE_LIST)


DOCKER_IMAGE:=restapi

run: build  ## Run server in container
	docker run --rm -it --publish 8000:8000 ${DOCKER_IMAGE}
run_shell: build  ## Shell into 
	docker run --rm -it --publish 8000:8000 --volume ${PWD}:/app/:ro --entrypoint /bin/sh ${DOCKER_IMAGE}
build:
	docker build --tag ${DOCKER_IMAGE} .


run_local: node_modules #vue.esm-browser.js  ## Run server locally (requires nodejs)
	node server.js
node_modules:  # requires `choco install node` or `sudo apt-get install npm`
	npm install
vue.esm-browser.js:  ## https://vuejs.org/guide/quick-start.html#using-vue-from-cdn
	curl https://unpkg.com/vue@3/dist/vue.esm-browser.js -L -o vue.esm-browser.js

clean:
	rm -rf \
		node_modules \
		package-lock.json \
		vue.esm-browser.js