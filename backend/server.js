const config = require("config");
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const { MongoClient } = require("mongodb");

const getRocketDetails = require("./getRocketDetails.js");
const registerUser = require("./registerUser.js");
const loginUser = require("./loginUser.js");
const logoutUser = require("./logoutUser.js");
const userAuth = require("./userAuth.js");

const port = config.get("app.port");
let myClient = null;

connectToMongo = async () => {
  try {
    const client = new MongoClient(config.get("MONGO_KEY"));
    await client.connect();
    console.log("connected to mongoDb");
    myClient = client;
  } catch (e) {
    console.log(e.message);
  }
};

app.use(cors());
app.use(cookieParser());
app.use(express.json());

//API endpoints
app.get("/getRocketDetails", userAuth, (req, res) => {
  console.log("got request");
  getRocketDetails(req, res, myClient);
});

app.post("/registerUser", (req, res) => {
  registerUser(req, res, myClient);
});

app.post("/loginUser", (req, res) => {
  loginUser(req, res, myClient);
});

app.post("/logoutuser", (req, res) => {
  logoutUser(req, res);
});

connectToMongo();

app.listen(3001, () => {
  console.log("server running on port 3001");
});
