import express from "express";
import { userRoutes } from "../module/user/user.route";
import { categoryRoutes } from "../module/category/category.route";
import { ratingRoutes } from "../module/rating/rating.route";
import { bookingRoutes } from "../module/booking/booking.route";
import { cartServices } from "../module/myCart/myCart.route";
import { feedbackRoutes } from "../module/feedback/feedback.route";
import { serviceRoutes } from "../module/services/services.route";
import { BlogAndFAQService } from "../module/blog/blog.route";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/",
    route: userRoutes,
  },
  {
    path: "/",
    route: serviceRoutes,
  },
  {
    path: "/",
    route: categoryRoutes,
  },
  {
    path: "/",
    route: ratingRoutes,
  },
  {
    path: "/",
    route: bookingRoutes,
  },
  {
    path: "/",
    route: cartServices,
  },
  {
    path: "/",
    route: feedbackRoutes,
  },
  {
    path: "/",
    route: BlogAndFAQService,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
