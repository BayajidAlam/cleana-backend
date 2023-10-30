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
exports.MyCartService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const addToCart = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = prisma_1.default.myCart.create({
        data,
        include: {
            User: true,
            service: true,
        },
    });
    return result;
});
const getMyCartByUserId = (id) => __awaiter(void 0, void 0, void 0, function* () {
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
const deleteCart = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const cartItem = yield prisma_1.default.myCart.findUnique({
        where: {
            id,
        },
    });
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
exports.MyCartService = {
    addToCart,
    deleteCart,
    getMyCartByUserId
};
