const nodemailer = require('nodemailer');
const dotenv = require('dotenv').config();

const mailTemplate = require('../../public/mailTemplates.js')

module.exports = {
	async sendMail(createdBook, createdBookAuthorData){
	let transporter = nodemailer.createTransport({
		host: "127.0.0.1",
		port: 1025,
		secure: false, // true for 465, false for other ports
		tls: {
			rejectUnauthorized: false
		}
	});
	console.log(createdBookAuthorData);
	const info = await transporter.sendMail({
		from: '"Fred Foo 👻" <xhaxykjlrojycbdvoh@nthrl.com>', // sender address
		to: "radek.barylak@gmail.com", // list of receivers
		subject: "Hello ✔", // Subject line
		text: "Hello world?", // plain text body
		html: mailTemplate.formatCreatedBookData(createdBook, createdBookAuthorData), // html body
		attachments: [{
			filename: 'fire_1f525.png',
			path: __dirname + '/fire_1f525.png',
		}]
	}).catch((error) => {console.error(error);});
	return info.messageId;
}};
