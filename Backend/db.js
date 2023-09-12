const mongoose = require("mongoose");
require("dotenv").config();


const mongoURl =process.env.MONGO_URL
  
const connectToMongo = async () => {
  await mongoose
    .connect(mongoURl)
    .then(() => {
      console.log("DB Connetion Successfull");
    })
    .catch((err) => {
      console.log(err.message);
    });
};

module.exports = connectToMongo;

// GSVCwSh8iSZa2JAH
