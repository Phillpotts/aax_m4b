# file: Makefile

version_node:
	docker compose run --rm node npm run version:node

install:
	docker compose run --rm node npm install

clean:
	docker compose run --rm node npm run clean

lint:
	docker compose run --rm node npm run lint

run_tests:
	docker compose run --rm node npm run test

run_tests_watch:
	docker compose run --rm node npm run test:watch

build:
	docker compose run --rm node npm run build

start:
	docker compose run --rm node npm run start

dev_start:
	docker compose run --rm node npm run dev:start

dev_watch_start:
	docker compose run --rm node npm run dev:watch:start