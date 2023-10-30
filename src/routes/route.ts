import express from "express";
import { userRoutes } from "../module/user/user.route";
import { categoryRoutes } from "../module/category/category.route";
import { ratingRoutes } from "../module/reviewAndRating/reviewAndRating.route";
import { bookingRoutes } from "../module/booking/booking.route";
import { cartServices } from "../module/myCart/myCart.route";
import { feedbackRoutes } from "../module/feedback/feedback.route";
import { serviceRoutes } from "../module/services/services.route";
import { authRoutes } from "../module/auth/auth.route";
import { BlogRoutes } from "../module/blog/blog.route";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/users",
    route: userRoutes,
  },
  {
    path: "/auth",
    route: authRoutes,
  },
  {
    path: "/services",
    route: serviceRoutes,
  },
  {
    path: "/categories",
    route: categoryRoutes,
  },
  {
    path: "/reviews",
    route: ratingRoutes,
  },
  {
    path: "/bookings",
    route: bookingRoutes,
  },
  {
    path: "/myCart",
    route: cartServices,
  },
  {
    path: "/feedbacks",
    route: feedbackRoutes,
  },
  {
    path: "/blogs",
    route: BlogRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
