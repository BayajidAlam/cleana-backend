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
exports.FaqService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
// post faq
const createFaq = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = prisma_1.default.faq.create({
        data,
    });
    return result;
});
// get all faq
const getAllFaq = (options) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const result = yield prisma_1.default.faq.findMany({
        take: limit,
        skip,
        orderBy: {
            createdAt: "desc",
        },
    });
    const total = yield prisma_1.default.faq.count();
    return {
        meta: {
            total,
            page,
            limit,
        },
        data: result,
    };
});
// get single service
const getSingleFaq = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const service = yield prisma_1.default.faq.findUnique({
        where: {
            id,
        },
    });
    if (!service) {
        return null;
    }
    return service;
});
// update faq in db
const updateFaq = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.faq.update({
        where: {
            id,
        },
        data: payload,
    });
    return result;
});
// delete blog
const deleteFaq = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.faq.delete({
        where: {
            id,
        },
    });
    return result;
});
exports.FaqService = {
    createFaq,
    getAllFaq,
    getSingleFaq,
    updateFaq,
    deleteFaq,
};
