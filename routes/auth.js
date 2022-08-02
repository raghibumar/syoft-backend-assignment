const User = require("../models/User");
var CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

const router = require("express").Router();
//register route
router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    phone: req.body.phone,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      "hellohowareyou"
    ).toString(),
    role: req.body.role,
  });

  try {
    const user = await newUser.save();
    res.status(201).json({
      status: "succes",
      user,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

//login route
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });
    !user && res.status(401).json("Enter a valid email");
    var bytes = CryptoJS.AES.decrypt(user.password, "hellohowareyou");
    var originalText = bytes.toString(CryptoJS.enc.Utf8);

    originalText !== req.body.password &&
      res.status(401).json("Wrong Password");

    const accessToken = jwt.sign(
      {
        id: user.id,
        phone: user.phone,
        role: user.role,
      },
      "hellohowareyou",
      { expiresIn: "5d" }
    );

    const { password, ...info } = user._doc;
    res.status(200).json({ ...info, accessToken });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
