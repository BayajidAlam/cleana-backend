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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const user_constant_1 = require("./user.constant");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const getSingleUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.user.findUnique({
        where: {
            id: id,
        },
    });
    return result;
});
const updateUserRole = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.user.update({
        where: { id },
        data: payload,
    });
    return result;
});
const getAllUser = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const { searchTerm } = filters, filterData = __rest(filters, ["searchTerm"]);
    console.log(searchTerm);
    const andConditons = [];
    if (searchTerm && user_constant_1.userFilterAbleField.includes(searchTerm.toLowerCase())) {
        andConditons.push({
            [searchTerm.toLowerCase()]: {
                equals: true,
            },
        });
    }
    if (Object.keys(filterData).length > 0) {
        andConditons.push({
            AND: Object.keys(filterData).map((key) => ({
                [key]: {
                    equals: filterData[key],
                },
            })),
        });
    }
    const whereConditons = andConditons.length > 0 ? { AND: andConditons } : {};
    const result = yield prisma_1.default.user.findMany({
        where: whereConditons,
        skip,
        take: limit,
    });
    const total = yield prisma_1.default.user.count();
    return {
        meta: {
            total,
            page,
            limit,
        },
        data: result,
    };
});
const deleteSingleUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield prisma_1.default.user.findUnique({
            where: {
                id: id,
            },
        });
        if (!user) {
            return { success: false, message: "User not found" };
        }
        yield prisma_1.default.$transaction([
            prisma_1.default.feedback.deleteMany({
                where: {
                    userId: id,
                },
            }),
            prisma_1.default.booking.deleteMany({
                where: {
                    userId: id,
                },
            }),
            prisma_1.default.user.delete({
                where: {
                    id: id,
                },
            }),
        ]);
        return {
            success: true,
            message: "User and related feedback and booking records deleted successfully",
        };
    }
    catch (error) {
        console.error("Error deleting user:", error);
        return {
            success: false,
            message: "An error occurred while deleting the user and related records",
        };
    }
});
exports.UserService = {
    getAllUser,
    getSingleUser,
    updateUserRole,
    deleteSingleUser,
};
