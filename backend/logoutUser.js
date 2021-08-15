const logoutUser = (req, res) => {
  try {
    res.clearCookie("Athentication");
    return res.status(200).json({ msg: "logged out succesfully" });
  } catch (e) {
    return res.status(400).json({ msg: e.message });
  }
};

module.exports = logoutUser;
