"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = require("../module/user/user.route");
const auth_route_1 = require("../module/auth/auth.route");
const services_route_1 = require("../module/services/services.route");
const category_route_1 = require("../module/category/category.route");
const reviewAndRating_route_1 = require("../module/reviewAndRating/reviewAndRating.route");
const booking_route_1 = require("../module/booking/booking.route");
const myCart_route_1 = require("../module/myCart/myCart.route");
const feedback_route_1 = require("../module/feedback/feedback.route");
const blog_route_1 = require("../module/blog/blog.route");
const faq_route_1 = require("../module/faq/faq.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: "/users",
        route: user_route_1.userRoutes,
    },
    {
        path: "/auth",
        route: auth_route_1.authRoutes,
    },
    {
        path: "/services",
        route: services_route_1.serviceRoutes,
    },
    {
        path: "/categories",
        route: category_route_1.categoryRoutes,
    },
    {
        path: "/reviews",
        route: reviewAndRating_route_1.ratingRoutes,
    },
    {
        path: "/bookings",
        route: booking_route_1.bookingRoutes,
    },
    {
        path: "/myCart",
        route: myCart_route_1.cartServices,
    },
    {
        path: "/feedbacks",
        route: feedback_route_1.feedbackRoutes,
    },
    {
        path: "/blogs",
        route: blog_route_1.BlogRoutes,
    },
    {
        path: "/faqs",
        route: faq_route_1.FaqRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
