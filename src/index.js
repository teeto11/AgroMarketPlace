const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config/config');
const app  = express();

const { port } = config;
app.use(express.json())



app.listen(port,()=>{
    console.log(`${config. appName} started on port --> ${port}`)
}) 