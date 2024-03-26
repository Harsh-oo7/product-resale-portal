start_db:
	docker compose up -d 

stop_db:
	docker compose down

server: 
	npm run dev

migrate:
	db-migrate up

migrate-down:
	db-migrate down

.PHONEY: start_db stop_db server migrate migrate-down