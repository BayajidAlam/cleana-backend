import express from "express";
import { AuthController } from "./auth.controller";

const router = express.Router();

router.post("/signup", AuthController.signUpUser);
router.post("/signin", AuthController.loginUser);

export const authRoutes = router;
