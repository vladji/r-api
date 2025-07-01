import { Request, Response } from "express";
import { ShopProps, ShopSchema } from "../shop/shop.model";
import { errorHandler } from "../../shared/middlewares/errorHandler";
import { createHash } from "../../shared/utils/crypto";

export const getShopList = async (req: Request, res: Response) => {
  ShopSchema
    .find()
    .then((sellers) => {
      res.status(200).json(sellers);
    })
    .catch((error) => errorHandler(error, req, res));
};

export const createShop = async (req: Request, res: Response) => {
  try {
    const uniqId = req.body.uniqId;
    const rootPass = req.body.rootPass;
    const shopAdminPass = req.body.shopAdminPass;

    const rootPassHash = await createHash(rootPass);
    const shopAdminPassHash = await createHash(shopAdminPass);

    const shop: ShopProps = {
      uniqId,
      shopProfile: {
        name: null,
        shopImage: null,
        rating: null,
        openHours: {
          from: null,
          to: null,
        },
        readyTime: {
          min: null,
          max: null,
        },
      },
      profileCompleted: false,
      hasMenu: false,
      enabled: false,
      published: false,
      credentials: {
        rootPass,
        rootPassHash,
        shopAdminPass,
        shopAdminPassHash,
      },
    };

    await ShopSchema.create(shop)
      .then((shop) => {
        res.status(201).json({ success: true, shop });
      })
      .catch((error) => {
        if (error.name === "ValidationError") {
          res.status(400).json({
            success: false,
            message: "Shop validation failed",
          });
          return;
        }

        // if duplicate (e.g. uniqId)
        if (error.code === 11000) {
          res.status(409).json({
            success: false,
            message: "Duplicate field",
            error: `key-value: ${JSON.stringify(error.keyValue)}`,
          });
          return;
        }

        res.status(400).json({
          success: false,
          message: "Unknown error",
        });
        return;
      });
  } catch (error) {
    errorHandler(error, req, res);
  }
};
