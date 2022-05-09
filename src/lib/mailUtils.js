const { send } = require('express/lib/response');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv').config();



async function sendMail(){
	let testAccount = await nodemailer.createTestAccount();

	let transporter = nodemailer.createTransport({
		host: "smtp.sendgrid.net",
		port: 587,
		secure: false, // true for 465, false for other ports
		auth: {
		user: testAccount.user, // generated ethereal user
		pass: testAccount.pass, // generated ethereal password
		},
	});
	const info = await transporter.sendMail({
		from: '"Fred Foo 👻" <foo@example.com>', // sender address
		to: "bpf51265@zcrcd.com", // list of receivers
		subject: "Hello ✔", // Subject line
		text: "Hello world?", // plain text body
		html: "<b>Hello world?</b>", // html body
	});
	return info.messageId;
}

module.exports = sendMail;


