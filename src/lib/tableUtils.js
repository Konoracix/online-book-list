function stringTable(table, name, length = 255){
	return table.string(name, length).collate('utf8_polish_ci');
}

function references(table, tableName, columnName, notNullable = true){
	const definition = table
		.integer(columnName)
		.unsigned()
		.references('id')
		.inTable(tableName)
		.onDelete('cascade');

		if(notNullable){
			definition.notNullable();
		}
		return definition;
}

function getDate(){
	const MyDate = new Date();
	var currentDate;
	MyDate.setDate(MyDate.getDate());
	currentDate = MyDate.getFullYear() + '-'
		+ ('0' + (MyDate.getMonth()+1)).slice(-2) + '-'
		+ ('0' + MyDate.getDate()).slice(-2)
		+ " " + ('0' + MyDate.getHours()).slice(-2) + ':'
		+ ('0' + MyDate.getMinutes()).slice(-2) + ':'
		+ ('0' + MyDate.getSeconds()).slice(-2)
	return currentDate;
}

module.exports = {
	stringTable,
	references,
	getDate
}