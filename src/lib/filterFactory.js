module.exports = {
	build(queries, knex){
		if(queries.is_deleted == "false"){
			knex.andWhere("deleted_at", null);
		}if(queries.date_to){
			knex.andWhere("created_at", "<", date_to)
		}if(queries.date_from){
			knex.andWhere("created_at", ">", date_from)
		}
		return knex;
	}
}