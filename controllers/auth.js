import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//Registration of user
export const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    const isUsed = await User.findOne({ username });

    if (isUsed) {
      return res.json({
        message: "Sorry, this name is already in use.",
      });
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      password: hash,
    });

    const token = jwt.sign(
      {
        id: newUser._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "30d" },
    )

    await newUser.save();

    res.json({
      newUser,
      message: "Success! You are now registered.",
    });
  } catch (error) {
    res.json({ message: "Error! Unable to create new user." });
  }
};

//Login of user
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.json({
        message: "Sorry, this user does not exist.",
      });
    }

    //compairing password from hash
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.json({
        message: "This password is wrong!",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "30d" },
    )

    res.json({
      token,
      user,
      message: "Successfully logged in",
    });

  } catch (error) {
    res.json({ message: "Failed to authorize you!" });
  }
};

//Get me of user

export const getMe = async (req, res) => {
  try {
      const user = await User.findById(req.userId)

      if (!user) {
          return res.json({
              message: 'Such user does not exist.',
          })
      }

      const token = jwt.sign(
          {
              id: user._id,
          },
          process.env.JWT_SECRET,
          { expiresIn: '30d' },
      )

      res.json({
          user,
          token,
      })
  } catch (error) {
      res.json({ message: 'No Access.' })
  }
}
