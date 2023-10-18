import express from "express";
import {
  addTOCartController,
  deleteItemFromCart,
  getMyCartByUserIdController,
} from "./myCart.controller";

const router = express.Router();
router.post("/add-to-cart", addTOCartController);
router.get("/mycart/:userId", getMyCartByUserIdController);
router.get("/mycart/:userId", getMyCartByUserIdController);
router.delete("/myCart/:id", deleteItemFromCart);

export const cartServices = router;
