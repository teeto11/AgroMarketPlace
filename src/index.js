const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config/config');
const app  = express();
const marketRoutes = require('./routes/market')
const adminRoutes = require('./routes/Admin')
const dotenv = require('dotenv');
require('./lib/dbconn')
dotenv.config();

const { PORT } = config;
app.use(express.json())


app.get('/', (req, res) => {
    res.send('welcome');
    console.log('started');
 });
marketRoutes.setup(app);
adminRoutes.setup(app);
app.listen(PORT,()=>{
    console.log(`${config. appName} started on port --> ${PORT}`)
}) 