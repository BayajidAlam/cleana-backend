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
exports.deleteSingleUserFromDb = exports.getAllUsersFromDB = exports.updateUserRole = exports.getSingleUserById = exports.loginUserToDB = exports.signUpUserTODB = void 0;
const prisma_1 = __importDefault(require("../../shared/prisma"));
const http_status_1 = __importDefault(require("http-status"));
const jwtHelpers_1 = require("../../helpers/jwtHelpers");
const config_1 = __importDefault(require("../../config"));
const paginationHelper_1 = require("../../helpers/paginationHelper");
const user_constant_1 = require("./user.constant");
const signUpUserTODB = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.user.create({
        data: data,
    });
    return result;
});
exports.signUpUserTODB = signUpUserTODB;
const loginUserToDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    const isUserExist = yield prisma_1.default.user.findFirstOrThrow({
        where: {
            email: email,
            password: password,
        },
    });
    if (!isUserExist) {
        http_status_1.default.NOT_FOUND, "User does not exist";
    }
    else {
        const { id: userId, role } = isUserExist;
        const accessToken = (0, jwtHelpers_1.createToken)({ userId, role }, config_1.default.jwt.access_secret, config_1.default.jwt.access_expires_in);
        const refreshToken = (0, jwtHelpers_1.createToken)({ userId, role }, config_1.default.jwt.refresh_secret, config_1.default.jwt.refresh_expires_in);
        return {
            accessToken,
            refreshToken,
        };
    }
});
exports.loginUserToDB = loginUserToDB;
const getSingleUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.user.findUnique({
        where: {
            id: id,
        },
    });
    return result;
});
exports.getSingleUserById = getSingleUserById;
const updateUserRole = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.user.update({
        where: { id },
        data: payload,
    });
    return result;
});
exports.updateUserRole = updateUserRole;
const getAllUsersFromDB = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const { searchTerm } = filters, filterData = __rest(filters, ["searchTerm"]);
    console.log(searchTerm);
    const andConditons = [];
    // Check if searchTerm is for role filtering
    if (searchTerm && user_constant_1.userFilterAbleField.includes(searchTerm.toLowerCase())) {
        andConditons.push({
            [searchTerm.toLowerCase()]: {
                equals: true, // You can modify this based on your Prisma schema
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
    /**
     * person = { name: 'fahim' }
     * name = person[name]
     *
     */
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
exports.getAllUsersFromDB = getAllUsersFromDB;
const deleteSingleUserFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.user.findUnique({
        where: {
            id: id,
        },
    });
    if (result) {
        const deleteResult = yield prisma_1.default.user.delete({
            where: {
                id,
            },
        });
        return deleteResult;
    }
    else {
        return null;
    }
});
exports.deleteSingleUserFromDb = deleteSingleUserFromDb;
