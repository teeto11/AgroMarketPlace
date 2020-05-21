const mongoose = require('mongoose')
const config = require('../config/config');
mongoose.connect(config.MONGODB_URL,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
})


mongoose.connection.on('connected', () => {
    console.log('Mongo Connection Established');
  });
  mongoose.connection.on('error', (err) => {
    console.log(`Mongo Connection Error : ${err}`);
    process.exit(1);
  });
  mongoose.connection.on('disconnected', () => {
    console.log('Mongo Connection disconnected');
    process.exit(1);
  });
  