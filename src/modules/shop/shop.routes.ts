import express from "express";
import { verifyToken } from "../../shared/middlewares/verifyToken";
import { getShopList } from "./shop.controller";

const router = express.Router();

router.get("/shops-list", verifyToken, getShopList);

export default router;
