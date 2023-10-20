"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCartFromDB = exports.getMyCartByUserIdFromDB = exports.addCartToDB = void 0;
const prisma_1 = __importDefault(require("../../shared/prisma"));
const addCartToDB = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = prisma_1.default.myCart.create({
        data,
        include: {
            User: true,
            service: true,
        },
    });
    return result;
});
exports.addCartToDB = addCartToDB;
const getMyCartByUserIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.myCart.findMany({
        where: {
            userId: id,
        },
        include: {
            service: true,
            User: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
    return result;
});
exports.getMyCartByUserIdFromDB = getMyCartByUserIdFromDB;
const deleteCartFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(id);
    const cartItem = yield prisma_1.default.myCart.findUnique({
        where: {
            id,
        },
    });
    console.log(cartItem);
    if (!cartItem) {
        throw new Error("CartItem not found with the specified ID");
    }
    const result = yield prisma_1.default.myCart.delete({
        where: {
            id,
        },
    });
    return result;
});
exports.deleteCartFromDB = deleteCartFromDB;
