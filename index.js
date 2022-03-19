const express = require('express');
const app = express();
const PORT = 8080;

app.use(express.json());

app.listen(
	PORT,
	() => console.log(`it's alive on http://localhost:${PORT}`)
);

app.get('/tshirt', (req, res) => {
	res.status(200).send({
		tshirt: '👕',
		size: 'large'
	});
});

app.post('/new/:size', (req, res) => {
	const {size} = req.params;
	const {body} = req.body;
	res.status(200).send({
		tshirt: body,
		size: size
	});
});