const mongoose = require("mongoose");

module.exports = () => {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  try {
    mongoose.connect(process.env.DATABASE_ACCESS, connectionParams);
    console.log("Database connected");
  } catch (error) {
    console.log("Database error", error);
  }
};
