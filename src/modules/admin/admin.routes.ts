import express from "express";
import { verifyToken } from "../../shared/middlewares/verifyToken";
import { createShop, getShopList } from "./admin.controller";
import { adminAccessMiddleware } from "../../shared/middlewares/adminAccess";

const router = express.Router();

router.get(
  "/admin/shops-list",
  verifyToken,
  adminAccessMiddleware,
  getShopList
);

router.post(
  "/admin/create-shop",
  verifyToken,
  adminAccessMiddleware,
  createShop
);

export default router;
