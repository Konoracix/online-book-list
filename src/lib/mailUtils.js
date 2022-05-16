const nodemailer = require('nodemailer');
const dotenv = require('dotenv').config();





module.exports = {
	async sendMail(){
	console.log('Siema1');
	let transporter = nodemailer.createTransport({
		host: "smtp.sendgrid.net",
		port: 587,
		secure: false, // true for 465, false for other ports
		auth: {
		user: "apikey", // generated ethereal user
		pass: "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", // generated ethereal password
		},
	});
	console.log('Siema2');
	const info = await transporter.sendMail({
		from: '"Fred Foo 👻" <xhaxykjlrojycbdvoh@nthrl.com>', // sender address
		to: "radek.barylak@gmail.com", // list of receivers
		subject: "Hello ✔", // Subject line
		text: "Hello world?", // plain text body
		html: "<b>Hello world?</b>", // html body
	});
	console.log('Siema3');
	return info.messageId;
}};
