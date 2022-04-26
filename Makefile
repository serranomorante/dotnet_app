# Project Variables
PROJECT_NAME ?= ShopAPI
ORG_NAME ?= ShopAPI
REPO_NAME ?= heh_shop

.PHONY: migrations db dcup dcbuild gitstatus gitpush gitpull

migrations:
	cd ./backend/ShopAPI.Data && dotnet ef --startup-project ../ShopAPI migrations add $(mname) && cd .. && cd ..

db:
	cd ./backend/ShopAPI.Data && dotnet ef --startup-project ../ShopAPI database update && cd .. && cd ..

dcup:
	docker-compose up -d

dcbuild:
	docker-compose build

gitstatus:
	git status https://$(token)@github.com/serranomorante/heh_shop.git

gitpush:
	git push https://$(token)@github.com/serranomorante/heh_shop.git

gitpull:
	git pull https://$(token)@github.com/serranomorante/heh_shop.git




