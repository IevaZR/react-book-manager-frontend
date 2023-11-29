import emailModel from "../models/emailModel.js";

export const addEmail = async (req, res) => {
  try {
    const email = new emailModel(req.body);
    const data = await email.save();

    res.status(201).json("Email added to email list");
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};
