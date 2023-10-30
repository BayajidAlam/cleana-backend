import express from "express";
import { AuthController } from "./auth.controller";
import validateRequest from "../../middlewares/validateRequest";
import { AuthValidation } from "./auth.validation";

const router = express.Router();

router.post(
  "/signup",
  validateRequest(AuthValidation.createUserZodSchema),
  AuthController.signUpUser
);

router.post(
  "/signin",
  validateRequest(AuthValidation.loginZodSchema),
  AuthController.loginUser
);

export const authRoutes = router;
