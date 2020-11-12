const mongoose = require('mongoose');
const config = require('config');

const MONGO_URI = config.get("MONGO_URI");



const connect = () => {
    mongoose.connect(MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('mongoose is connected!!'))
    .catch(err => console.log(err))
}

module.exports = connect ;
