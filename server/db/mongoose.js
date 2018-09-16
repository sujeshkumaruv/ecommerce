const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose
  .connect(
    process.env.MONGODB_URI,
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("Mongo db connected");
  });

module.exports = {
  mongoose
};
