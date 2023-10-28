import express from "express";
import { UserController } from "../user/user.controller";

const router = express.Router();


router.post("/signup", UserController.signUpUser);
router.post("/signin", UserController.loginUser);

export const authRoutes = router;
