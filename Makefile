set-up-database:
	@npm run rollback
	@npm run migrate
	@npm run seed