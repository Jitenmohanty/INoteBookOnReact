const mongoose = require('mongoose')

const mongoURl = "mongodb://0.0.0.0:27017/INoteBook"

const connectToMongo = async () => {
   await mongoose.connect(mongoURl)
        .then(() => {
            console.log("DB Connetion Successfull");
        })
        .catch((err) => {
            console.log(err.message);
        });
}

module.exports = connectToMongo;