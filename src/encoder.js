const bcrypt = require('bcrypt');


function encryptPassword(plainTextPassword){
	var salt = bcrypt.genSaltSync(12);
	const hashedPassword = bcrypt.hashSync(plainTextPassword, salt);
	return hashedPassword;
}

module.exports = encryptPassword;