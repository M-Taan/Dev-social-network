/* Description */

const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const mongoose = require("mongoose");

const auth = require("../../middleware/auth");
const User = require("../../modules/User");
const Profile = require("../../modules/Profile");

// @route GET APIs/profile/me
// @desc Get a specific users profile according to the token
// @access Private (hence, we will need to include the auth middleware)
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      "user",
      ["name", "avatar"]
    );

    if (!profile) {
      return res.status(400).json({ msg: "Profile doesn't exist" });
    }

    res.json(profile);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// @route Post APIs/profile/
// @desc Create/Update Profile
// @access Private
router.post(
  "/",
  [
    auth,
    [
      check("status", "Status is required").not().isEmpty(),
      check("skills", "Skills is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      company,
      website,
      location,
      bio,
      status,
      githubusername,
      skills,
      youtube,
      facebook,
      twitter,
      instagram,
      linkedin,
    } = req.body;

    // Profile Object

    const profile = {};

    profile.user = req.user.id;
    if (company) profile.company = company;
    if (website) profile.website = website;
    if (location) profile.location = location;
    if (bio) profile.bio = bio;
    if (status) profile.status = status;
    if (githubusername) profile.githubusername = githubusername;
    if (skills) {
      profile.skills = skills.split(",").map((skill) => skill.trim());
    }

    // Socials

    profile.social = {};

    if (youtube) profile.social.youtube = youtube;
    if (twitter) profile.social.twitter = twitter;
    if (facebook) profile.social.facebook = facebook;
    if (linkedin) profile.social.linkedin = linkedin;
    if (instagram) profile.social.instagram = instagram;

    try {
      let dbProfile = await Profile.findOne({ user: req.user.id });

      if (dbProfile) {
        // Update existing profile
        dbProfile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profile },
          { new: true }
        );

        return res.json(dbProfile);
      }

      // Creating a new profile
      dbProfile = new Profile(profile);
      await dbProfile.save();

      res.json(dbProfile);
    } catch (err) {
      console.error(err);
      res.status(500).send("Server Error");
    }
  }
);

// @route GET APIs/profile/
// @desc Get all profiles
// @access Public
router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find({}).populate("user", [
      "name",
      "avatar",
    ]);
    res.json(profiles);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// @route GET APIs/profile/user/:user_id
// @desc Get profile by user id
// @access Public
router.get("/user/:user_id", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate("user", ["name", "avatar"]);

    if (!profile) {
      return res.status(400).json({ msg: "Profile doesn't exist" });
    }

    res.json(profile);
  } catch (err) {
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "Profile doesn't exist" }); // When the entered ID exceeds the ObjectId length
    }

    res.status(500).send("Server Error");
  }
});

// @route DELETE APIs/profile
// @desc Delete request for user, user data
// @access Private
router.delete("/", auth, async (req, res) => {
  try {
    // Delete Posts
    // await Posts.findOneAndDelete({ user: req.user.id });

    // Delete Profile
    await Profile.findOneAndDelete({ user: req.user.id });
    console.log(req.user.id);
    // Delete User
    await User.findOneAndDelete({ _id: req.user.id });

    res.json({ msg: "Deletion Successful" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// @route POST APIs/profile/experience
// @desc Add experience section
// @access Private
router.post(
  "/experience",
  [
    auth,
    [
      check("title", "Job title is required").not().isEmpty(),
      check("company", "Company name is required").not().isEmpty(),
      check("location", "Company's location is required").not().isEmpty(),
      check("from", "Starting date is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    let exp = {};
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { company, title, location, from, to, current, description } =
      req.body;

    exp = { company, title, location, from, to, current, description };

    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.experience.unshift(exp);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err);
      res.status(500).send("Server Error");
    }
  }
);
// @route DELETE APIs/profile/experience/:exp_id
// @desc Delete experience by id
// @access Private
router.delete("/experience/:exp_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    profile.experience = profile.experience.filter((obj) => {
      return obj._id != req.params.exp_id && true;
    });

    await profile.save();

    res.json(profile.experience);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// Add update section for experience

// @route POST APIs/profile/education
// @desc Add education section
// @access Private
router.post(
  "/education",
  [
    auth,
    [
      check("school", "School name is required").not().isEmpty(),
      check("degree", "Degree is required").not().isEmpty(),
      check("fieldofstudy", "Field of study is required").not().isEmpty(),
      check("from", "Starting date is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    let edu = {};
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { school, degree, fieldofstudy, from, to, current, description } =
      req.body;

    edu = { school, degree, fieldofstudy, from, to, current, description };

    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.education.unshift(edu);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err);
      res.status(500).send("Server Error");
    }
  }
);

// @route DELETE APIs/profile/education/:edu_id
// @desc Delete education by id
// @access Private
router.delete("/experience/:edu_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    profile.education = profile.education.filter((obj) => {
      return obj._id != req.params.edu_id && true;
    });

    await profile.save();

    res.json(profile.education);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
