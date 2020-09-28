const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const config = require("config");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// @route   GET api/auth
// @desc    Test route
// @access  Public
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server failed in auth...");
  }
});

// @route   POST api/auth
// @desc    Authenticate user & get token -> for log in
// @access  Public
router.post(
  "/",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "password is required").exists(),
  ],
  async (req, res) => {
    //check fields filled correctly
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      // see if the user not exists (by mail only)
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ errors: [{ msg: "User isn't exist" }] });
      }
      // check if password are match to the user found by mail
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ errors: [{ msg: "password invalid" }] });
      }
      // Return jsonwebtoken
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error in users route\n");
    }
  }
);

module.exports = router;
