const validate = (body) => {
  const { username, email, password } = body;

  if (typeof username != "string" || username.length < 6)
    throw new Error(
      "Check username again. It should be more than 6 characters"
    );
  if (
    typeof email != "string" ||
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) != true
  )
    throw new Error("Check the email Id and enter a valid one");
  if (typeof password != "string" || password.length < 8)
    throw new Error(
      "Check the password. It should be a string of at least 8 characters"
    );

  return;
};

const registerUser = async (req, res, client) => {
  try {
    validate(req.body);

    const { username, email, password } = req.body;
    const db = client.db("spaceXListing");
    const usersCollection = db.collection("users");

    if ((await usersCollection.find({ email: email }).count()) != 0) {
      throw new Error("This email is already registered");
    }

    const user = await usersCollection.insertOne({ username, email, password });
    console.log(user);
    return res
      .status(200)
      .json({ user: user, msg: "user registered successfully" });
  } catch (e) {
    return res.status(400).json({ msg: e.message });
  }
};

module.exports = registerUser;
