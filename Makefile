# Project Variables
PROJECT_NAME ?= ShopAPI
ORG_NAME ?= ShopAPI
REPO_NAME ?= heh_shop

.PHONY: migrations db dcup dcbuild

migrations:
	cd ./backend/ShopAPI.Data && dotnet ef --startup-project ../ShopAPI migrations add $(mname) && cd .. && cd ..

db:
	cd ./backend/ShopAPI.Data && dotnet ef --startup-project ../ShopAPI database update && cd .. && cd ..

dcup:
	docker-compose up -d

dcbuild:
	docker-compose build
