const userModel = require("../Model/user");

const addUser = async (req, res) => {
  try {
    let exist = await userModel.findOne({
      sub: req.body.sub,
    });

    if (exist) {
      return res.status(200).json({ msg: "User already exists." });
    }

    const newUser = new userModel(req.body);
    await newUser.save();

    return res.status(200).json({ newUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Server error, could not add user." });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await userModel.find({});
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ msg: "Server error, could not get users." });
  }
};

module.exports = {
  addUser,
  getUsers,
};
