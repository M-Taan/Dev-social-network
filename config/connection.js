const config = require("config");
const mongoose = require("mongoose");
const db = config.get("mongoURI");

/* Connecting to MongoDB */

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
  } catch (err) {
    console.error(err.message);
    // Exit the process
    process.exit(1);
  }
};

/*************************/

// Exporting the connectDB function

module.exports = connectDB;
