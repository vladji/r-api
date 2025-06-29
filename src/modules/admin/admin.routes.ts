import express from "express";
import { verifyToken } from "../../shared/middlewares/verifyToken";
import { getShopList } from "./admin.controller";
import { adminAccessMiddleware } from "../../shared/middlewares/adminAccess";

const router = express.Router();

router.get("/shops-list", verifyToken, adminAccessMiddleware, getShopList);

export default router;
