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
exports.BookingService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const addBooking = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, servicesId, status } = data;
        const service = yield prisma_1.default.services.findUnique({
            where: { id: servicesId },
        });
        if (!service) {
            throw new Error("Service Not Found");
            return null;
        }
        const result = yield prisma_1.default.booking.create({
            data,
            include: {
                service: true,
                user: true,
            },
        });
        return result;
    }
    catch (error) {
        console.error("Error creating booking:", error);
        return null;
    }
});
const getBookingByUserId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.booking.findMany({
        where: {
            userId: id,
        },
        include: {
            service: true,
            user: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
    return result;
});
const getAllBooking = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.booking.findMany({
        include: {
            service: true,
            user: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
    return result;
});
const updateBooking = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.booking.update({
        where: {
            id,
        },
        // @ts-ignore
        data: payload,
        include: {
            service: true,
            user: true,
        },
    });
    return result;
});
const deleteBooking = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.booking.delete({
        where: {
            id,
        },
    });
    return result;
});
exports.BookingService = {
    addBooking,
    getBookingByUserId,
    getAllBooking,
    updateBooking,
    deleteBooking,
};
