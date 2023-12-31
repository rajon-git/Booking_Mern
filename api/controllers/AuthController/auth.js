const User=require("../../models/User")
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken")

//register
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

  //login
const login = async (req, res) => {
    try {
      const user = await User.findOne({ username: req.body.username });
      if (!user) return res.status(404).send("User not found!");
  
      const isPasswordCorrect = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!isPasswordCorrect)
        return res.status(400).json("Wrong password or username!");
  
      const token = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.JWT
      );
  
      const { password, isAdmin, ...otherDetails } = user._doc;
      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json({ details: { ...otherDetails }, isAdmin });
    } catch (err) {
        res.status(500).json(err.message);
    }
  };

  module.exports={register,login};