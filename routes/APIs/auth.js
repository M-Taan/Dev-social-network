/* Description */

const express = require("express");
const router = express.Router();
const User = require("../../modules/User");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

// We import the middleware function to make our route protected
const auth = require("../../middleware/auth");

/*After we add the middleware to the route, we need to add to the header x-auth-token the relative token */
// @route GET APIs/auth
// @desc Test route
// @access Public
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
});

// @route POST APIs/auth
// @desc Login user
// @access Public
router.post(
  "/",
  [
    check("email", "Enter a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Destructuring the req.body object to get credentials
    const { email, password } = req.body;

    try {
      // Check if a user exits in DB
      let user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Email or Password" }] });
      }

      const isPass = await bcrypt.compare(req.body.password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Email or Password" }] });
      }

      // JWT with each user so that they can access private routes
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
      console.log(err.message);
      res.status(500).send();
    }
  }
);

module.exports = router;
