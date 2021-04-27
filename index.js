require('dotenv').config();

const Express = require('express');
const database = require('./db') ;
const userController = require('./controllers/userController');
const logController = require('./controllers/logController');

const app = Express();
app.use(Express.json());


app.use('/user', userController);
app.use('/log', logController); 

database.sync();

app.listen(process.env.PORT, () => console.log(`[port ${process.env.PORT}] app is listening`));