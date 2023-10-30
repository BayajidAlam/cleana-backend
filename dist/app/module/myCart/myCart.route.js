"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartServices = void 0;
const express_1 = __importDefault(require("express"));
const myCart_controller_1 = require("./myCart.controller");
const router = express_1.default.Router();
router.post("/add-to-cart", myCart_controller_1.MyCartController.addToCart);
router.get("/:userId", myCart_controller_1.MyCartController.getMyCartByUserId);
router.delete("/:id", myCart_controller_1.MyCartController.deleteItemFromCart);
exports.cartServices = router;
