const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config/config');
const app  = express();
const marketRoutes = require('./routes/market')
const adminRoutes = require('./routes/Admin')
require('./lib/dbconn')
const { port } = config;
app.use(express.json())


app.get('/', (req, res) => {
    res.send('welcome');
    console.log('started');
 });
marketRoutes.setup(app);
adminRoutes.setup(app);
app.listen(port,()=>{
    console.log(`${config. appName} started on port --> ${port}`)
}) 