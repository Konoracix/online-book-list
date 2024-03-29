const express = require('express');
const morgan = require('morgan');
const compression = require('compression');
const helmet = require('helmet');
const paginate = require('express-paginate');
const cors = require('cors')

const middlewares = require('./middlewares');
const api = require('./api/api');

const app = express();

app.use(morgan('tiny'));
app.use(compression());
app.use(helmet()); 
app.use(express.json());
app.use(cors());
// app.use(express.static('public'))

app.get('/', (req, res) => {
	res.json({
		message: '📚 Book list API 📚'
	});
});

app.use(middlewares.authenticateJWT);

app.use('/api', api);

app.use(paginate.middleware(10, 50));
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);
module.exports = app;