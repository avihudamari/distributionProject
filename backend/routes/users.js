const User = require("../models/User");
const router = require("express").Router();
const bcrypt = require("bcrypt");

//REGISTER
router.post("/register", async (req, res) => {
  try {
    //generate new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //create new user
    const newUser = new User({
        email: req.body.email,
        password: hashedPassword,
        name: req.body.name,
        phoneNumber: req.body.phoneNumber,
        isAdmin: req.body.isAdmin,
        isConnected: false 
    });

    //save user and respond
    const user = await newUser.save();
    res.status(200).json(user._id);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    //find user
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(400).json("Wrong email or password");
    
    user.isConnected = true;
    await user.save();

    //validate password
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    !validPassword && res.status(400).json("Wrong email or password");

    //send response
    res.status(200).json({ _id: user._id, email: user.email, isAdmin: user.isAdmin, name: user.name });
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGOUT
router.post("/logout", async (req, res) => {
  try {
    //find user
    const user = await User.findOne({ isConnected: true });    
    user.isConnected = false;
    await user.save();

    //send response
    res.status(200).json("success to logout");
  } catch (err) {
    res.status(500).json(err);
  }
});

//isConnected
router.post("/isConnected", async (req, res) => {
  try {
    //find user
    const user = await User.findOne({ isConnected: true });
    if (!user) {
      res.status(200).json(null);
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

//getDistributors
router.post("/getDistributors", async (req, res) => {
  try {
    //find user
    const distributors = await User.find({ isAdmin: false });
    res.status(200).json(distributors);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/getAdmins", async (req, res) => {
  try {
    //find user
    const admins = await User.find({ isAdmin: true });
    res.status(200).json(admins);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get a user
router.get("/", async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.username;
  try {
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ username: username });
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;