start_db:
	docker compose up -d 

stop_db:
	docker compose down

server: 
	npm run dev

migrate:
	db-migrate up

create_migration:
	db-migrate create $(n) --sql-file

migrate-down:
	db-migrate down

.PHONEY: start_db stop_db server migrate migrate-down