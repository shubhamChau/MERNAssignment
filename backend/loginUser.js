const jwt = require("jsonwebtoken");
const accessTokenSecret = require("config").get("ACCESS_TOKEN_SECRET");

const loginUser = async (req, res, client) => {
  try {
    const { email, password } = req.body;

    const db = client.db("spaceXListing");
    const usersCollection = db.collection("users");

    const user = await usersCollection.findOne({
      email: email,
    });

    console.log(user);
    if (!user) throw new Error("This email is not registered");

    if (user.password != password)
      throw new Error("The password does not match");

    const accessToken = jwt.sign(
      { email: email },
      accessTokenSecret,
      (err, user) => {
        if (err) throw new Error("could not login");

        res.cookie("Authentication", accessToken);
        return res
          .status(200)
          .json({ msg: "logged in successfully", user: user });
      }
    );
  } catch (e) {
    return res.status(400).json({ msg: e.message });
  }
};

module.exports = loginUser;
