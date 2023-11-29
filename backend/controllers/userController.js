import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const createUser = async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password.toString(), salt);
    const user = new userModel({ ...req.body, password: hashedPassword });
    const data = await user.save();

    res.status(201).json("User created");
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find({});
    res.status(201).send(users);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await userModel.find(
      { email: req.params.email },
      { password: 0 }
    );
    res.status(201).send(user);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

export const deleteUser = async (req, res) => {
  try {
    await userModel.deleteOne({ _id: req.params._id });
    res.status(201).send("User delete successfully");
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

export const updateUser = async (req, res) => {
  try {
    const user = await userModel.findOneAndUpdate(
      { email: req.params.email },
      { $set: req.body },
      { new: true }
    );

    if (!user) {
      return res.status(404).send("User not found");
    }
    res.status(201).send(user);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

export const updateUserById = async (req, res) => {
  try {
    const user = await userModel.findOneAndUpdate(
      { _id: req.params._id },
      { $set: req.body },
      { new: true }
    );

    if (!user) {
      return res.status(404).send("User not found");
    }
    res.status(201).send(user);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

export const loginUser = async (req, res) => {
  try {
    const foundUser = await userModel.findOne({ email: req.body.email });
    if (!foundUser) {
      return res.status(404).send("Username or Password is incorrect!");
    }
    const isUserPasswordCorrect = bcrypt.compareSync(
      req.body.password.toString(),
      foundUser.password
    );

    if (!isUserPasswordCorrect) {
      return res.status(404).send("Username or Password is incorrect!");
    }

    const token = jwt.sign({ id: foundUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    if (isUserPasswordCorrect) {
      console.log("Logged in");
      res
        .cookie("session_token", token, { httpOnly: true })
        .status(200)
        .send("Authorized");
    }
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

export const logoutUser = async (req, res) => {
  try {
    res.clearCookie("session_token");
    res.status(200).send("Logged out successfully");
  } catch (error) {
    console.log(error);
  }
};
