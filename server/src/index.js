const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser')

const app = express();

app.use(helmet());
app.use(morgan('common'));
app.use(cors({
    origin : process.env.CORS_ORIGIN
}));
app.use(express.json());


require('dotenv').config(); // read .env file

const middlewares = require('./middlewares');
const logs = require('./api/logs')

mongoose.connect(process.env.DATABASE_URI, {
    useNewUrlParser : true,
    useUnifiedTopology : true
    })
    .catch(err => {
        throw new Error(err.message)
    })

app.get('/', (req, res) => {
    res.json({
        message : 'OK',
        status : 200
    })
});

app.use('/api/logs', logs);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

const port = process.env.PORT || 1337;
app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`);
});