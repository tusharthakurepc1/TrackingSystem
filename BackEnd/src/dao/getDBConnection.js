const mongoose = require("mongoose");
const DB_URL = require("../constants");

module.exports = async () => {
    mongoose.connect(DB_URL)
    .then(()=>{
        console.log("DB connection Created");
    })
    .catch((err)=>{
        console.log("Organization DB Connection Failed", err);
    })

}

