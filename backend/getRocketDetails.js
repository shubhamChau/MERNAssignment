const { query } = require("express");

const generateDbQuery = (queryObj) => {
  const resultObj = {};
  const keys = Object.keys(queryObj);

  const permissibleFields = [
    "launch_year",
    "successful_launch",
    "successful_landing",
    "skip",
    "limit",
  ];
  for (key of keys) {
    if (permissibleFields.indexOf(key) < 0)
      throw new Error("check the querystring again");
    else if (key == "launch_year") {
      if (+queryObj[key] == NaN)
        throw new Error("plese check the launch year filter in query");
      else resultObj["launch_year"] = queryObj["launch_year"];
    } else if (key == "successful_launch") {
      if (queryObj[key] != "true" && queryObj[key] != "false")
        throw new Error("please check successful_launch filter in query");
      else
        resultObj["launch_success"] =
          queryObj["successful_launch"] == "true" ? true : false;
    } else if (key == "successful_landing") {
      if (queryObj[key] != true && queryObj[key] != false)
        throw new Error("please check successful_landing filter in query");
    } else if (key == "skip") {
      if (+queryObj[key] == NaN)
        throw new Error("please check skip field in query");
    } else if (key == "limit") {
      if (+queryObj[key] == NaN)
        throw new Error("please check limit field in query");
    }
  }

  return resultObj;
};

const getRocketDetails = async (req, res, client) => {
  try {
    console.log(req.query);
    const dbQuery = generateDbQuery({ ...req.query } || {});
    const db = client.db("spaceXListing");
    const rocketsCollection = db.collection("rockets");
    const rockets = [];
    const cursor = rocketsCollection
      .find(dbQuery)
      .skip(+req.query.skip || 0)
      .limit(+req.query.limit || 10);
    await cursor.forEach((r) => rockets.push(r));

    return res.json(rockets);
  } catch (e) {
    return res.status(400).json({ msg: e.message });
  }
};

module.exports = getRocketDetails;
