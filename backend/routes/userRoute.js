import express from "express"
import { createUser, deleteUser, getAllUsers, getUser, loginUser, logoutUser, updateUser, updateUserById } from "../controllers/userController.js"

const router = express.Router()

router.post('/create-user', createUser)
router.get("/", getAllUsers)
router.get("/get-user/:email", getUser)
router.delete("/delete-user/:_id", deleteUser)
router.put("/update-user/:email", updateUser)
router.put("/update-user-by-id/:_id", updateUserById)
router.post('/login-user', loginUser)
router.post('/logout-user', logoutUser)

export default router