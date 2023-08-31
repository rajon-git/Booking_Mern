const User=require("../../models/User")
const bcrypt=require("bcryptjs");

const register = async (req, res) => {
    try {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);
  
      const newUser = new User({
        ...req.body,
        password: hash,
      });
  
      await newUser.save();
      res.status(200).send("User has been created.");
    } catch (err) {
      res.status(500).json(err.message);
    }
  };

  module.exports={register};