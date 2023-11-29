import express from "express";
import { addEmail } from "../controllers/emailController.js";

const router = express.Router();

router.post("/add-email", addEmail);

export default router;
