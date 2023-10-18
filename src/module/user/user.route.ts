import express from "express";
import {
  signUpUserController,
  getAllUsersController,
  loginUser,
  getSingleUser,
  updatgeRoleUser,
  deleteSingleUser,
} from "./user.controller";

const router = express.Router();

router.patch("/users/:id",updatgeRoleUser);
router.post("/auth/signup", signUpUserController);
router.post("/auth/signin", loginUser);
router.get("/users", getAllUsersController);
router.get("/users/:id",getSingleUser);
router.delete("/user/:id",deleteSingleUser);
export const userRoutes = router;
