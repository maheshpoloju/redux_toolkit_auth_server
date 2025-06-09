const router = require("express").Router();

const Joi = require("joi");
const bcrypt = require("bcrypt");
const { User } = require("../models/userModel");
const generateAuthToken = require("../utils/generateToken");

const validate = (data) => {
  const schema = Joi.object({
    email: Joi.string().required().label("email"),
    password: Joi.string().required().label("password"),
  });

  return schema.validate(data);
};

router.post("/login", async (req, res) => {
  try {
    const { error } = validate(req.body);
    // console.log('error', req.body)
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(401).send({ message: "Invalid Email or Password" });
    }
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validPassword) {
      return res.status(401).send({ message: "Invalid Email or Password" });
    }

    const token = generateAuthToken(user);
    res.status(200).send({ data: token, message: "Logged in successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;
