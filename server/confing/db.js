const mongoose = require("mongoose");
const keys = require("./keys");
const DBConnection = async () => {
  await mongoose
    .connect(keys.DBString)
    .then(() => {
      console.log("Database Connected Successfully !");
    })
    .catch((err) => {
      console.log("Database connection Error : ", err);
    });
};
module.exports = DBConnection;
