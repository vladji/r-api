import express from "express";
import { authenticateToken } from "../../shared/middlewares/authenticate";
import { getSellersList } from "./seller.controller";

const router = express.Router();

router.get("/sellers-list", authenticateToken, getSellersList);

export default router;
