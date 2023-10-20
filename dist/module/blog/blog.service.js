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
exports.deleteFaqFromDB = exports.deleteBlogFromDB = exports.updateBFaqInDB = exports.updateBlogInDB = exports.getSingleFaqService = exports.getSingleBlogService = exports.getAllFaqFromDB = exports.getAllBlogFromDB = exports.postFAQToDb = exports.postBlogToDb = void 0;
const prisma_1 = __importDefault(require("../../shared/prisma"));
const paginationHelper_1 = require("../../helpers/paginationHelper");
// post blog 
const postBlogToDb = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = prisma_1.default.blogPost.create({
        data,
    });
    return result;
});
exports.postBlogToDb = postBlogToDb;
// post faq 
const postFAQToDb = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = prisma_1.default.faq.create({
        data,
    });
    return result;
});
exports.postFAQToDb = postFAQToDb;
// get all post
const getAllBlogFromDB = (options) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.getAllBlogFromDB = getAllBlogFromDB;
// get all post
const getAllFaqFromDB = (options) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.getAllFaqFromDB = getAllFaqFromDB;
// get single blog
const getSingleBlogService = (id) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.getSingleBlogService = getSingleBlogService;
// get single service
const getSingleFaqService = (id) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.getSingleFaqService = getSingleFaqService;
// update blog in db
const updateBlogInDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.blogPost.update({
        where: {
            id,
        },
        data: payload,
    });
    return result;
});
exports.updateBlogInDB = updateBlogInDB;
// update faq in db
const updateBFaqInDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.faq.update({
        where: {
            id,
        },
        data: payload,
    });
    return result;
});
exports.updateBFaqInDB = updateBFaqInDB;
// delete blog 
const deleteBlogFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.blogPost.delete({
        where: {
            id,
        },
    });
    return result;
});
exports.deleteBlogFromDB = deleteBlogFromDB;
// delete blog 
const deleteFaqFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.faq.delete({
        where: {
            id,
        },
    });
    return result;
});
exports.deleteFaqFromDB = deleteFaqFromDB;
