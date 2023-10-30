import express from "express";
import { MyCartController } from "./myCart.controller";

const router = express.Router();

router.post("/add-to-cart", MyCartController.addToCart);
router.get("/:userId", MyCartController.getMyCartByUserId);
router.delete("/:id", MyCartController.deleteItemFromCart);

export const cartServices = router;
