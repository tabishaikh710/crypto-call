const express = require("express");
const dbConnected = require("./DataBase/index");
const router = require('./routes/index');
const { PORT } = require("./config/index");
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(express.json());
app.use(router);

dbConnected();

app.get('/', (req, res) => {
    res.json({ msg: 'Hello world!' });
});

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Backend is listening on port: ${PORT}`);
});
