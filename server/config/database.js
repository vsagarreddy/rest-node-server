require("../../paint-console");
const mongoose = require("mongoose");

const { MONGO_URI, MONGO_URI_LOCALHOST } = process.env;

exports.connect = () => {
  // Connecting to the database
  console.log('########### MONGO_URI_LOCALHOST ########### : ', MONGO_URI_LOCALHOST, MONGO_URI);
  mongoose
    .connect(MONGO_URI_LOCALHOST, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => {
      console.log("Successfully connected to database", { color: 'IGREEN' });
    })
    .catch((error) => {
      console.log("database connection failed. exiting now...");
      console.error(error);
      process.exit(1);
    });
};