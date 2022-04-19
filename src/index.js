require('dotenv').config();

const app = require('./app');

console.log(process.env.PORT);

const port = process.env.PORT || 5050;


app.listen(port, () => {
	console.log(`Listening at http://localhost:${port}`)
})