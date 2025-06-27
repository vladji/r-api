import { Request, Response } from "express";
import { SellerSchema } from "./seller.model";
import { errorHandler } from "../../shared/middlewares/errorHandler";

export const getSellersList = async (req: Request, res: Response) => {
  SellerSchema
    .find()
    .then((sellers) => {
      res.status(200).json({ sellers });
    })
    .catch((error) => errorHandler(error, req, res));
};
