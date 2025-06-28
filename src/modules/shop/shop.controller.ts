import { Request, Response } from "express";
import { ShopSchema } from "./shop.model";
import { errorHandler } from "../../shared/middlewares/errorHandler";

export const getShopList = async (req: Request, res: Response) => {
  ShopSchema
    .find()
    .then((sellers) => {
      res.status(200).json({ sellers });
    })
    .catch((error) => errorHandler(error, req, res));
};
