import express from "express";
import { verifyToken } from "../../shared/middlewares/verifyToken";
import { getSellersList } from "./seller.controller";

const router = express.Router();

router.get("/sellers-list", verifyToken, getSellersList);

export default router;
