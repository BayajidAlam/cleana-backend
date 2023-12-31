"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtHelpers = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwt_decode_1 = __importDefault(require("jwt-decode"));
const createToken = (payload, secret, expireTime) => {
    return jsonwebtoken_1.default.sign(payload, secret, {
        expiresIn: expireTime,
    });
};
const verifyToken = (token, secret) => {
    return jsonwebtoken_1.default.verify(token, secret);
};
const decodedToken = (token) => {
    return (0, jwt_decode_1.default)(token);
};
exports.jwtHelpers = {
    createToken,
    verifyToken,
    decodedToken
};
