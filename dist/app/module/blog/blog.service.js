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
exports.BlogService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
// post blog
const createBlog = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = prisma_1.default.blogPost.create({
        data,
    });
    return result;
});
// get all post
const getAllBlog = (options) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const result = yield prisma_1.default.blogPost.findMany({
        take: limit,
        skip,
        orderBy: {
            createdAt: "desc",
        },
    });
    const total = yield prisma_1.default.blogPost.count();
    return {
        meta: {
            total,
            page,
            limit,
        },
        data: result,
    };
});
// get single blog
const getSingleBlog = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const service = yield prisma_1.default.blogPost.findUnique({
        where: {
            id,
        },
    });
    if (!service) {
        return null;
    }
    return service;
});
// update blog in db
const updateBlog = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.blogPost.update({
        where: {
            id,
        },
        data: payload,
    });
    return result;
});
// delete blog
const deleteBlog = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.blogPost.delete({
        where: {
            id,
        },
    });
    return result;
});
exports.BlogService = {
    createBlog,
    getAllBlog,
    getSingleBlog,
    updateBlog,
    deleteBlog,
};
