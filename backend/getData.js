const axios = require("axios");
const mongoose = require("mongoose");

const connectToMongo = async (data) => {
  await mongoose.connect(
    "mongodb+srv://shekhar201:shekhar201@cluster0.jvai5.mongodb.net/spaceXListing?retryWrites=true&w=majority",
    { useUnifiedTopology: true, useNewUrlParser: true }
  );
  console.log("connected to mongodb");
  // storeInDb(data);
};

const storeInDb = async (data) => {
  var rocketSchema = new mongoose.Schema({}, { strict: false });
  var Rocket = mongoose.model("rockets", rocketSchema);
  for (var obj of data) {
    var entry = new Rocket({ ...obj });
    await entry.save();
  }
};

const getRocket = async () => {
  const response = await axios.get("https://api.spacexdata.com/v3/launches");
  const { data } = response;
  console.log(data[0]);
  connectToMongo(data);
};

getRocket();

console.log("async function has been called");
