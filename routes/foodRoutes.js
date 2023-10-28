import express from "express";

import {addFood, deleteFood, getAllFoods, getFood, updateFood} from "../controllers/foodController.js";

// schema
import {createFoodSchema} from "../validations/foodValidations.js";

// middlewares
import {validateMongoDbId} from "../middlewares/validateMongoDbId.js";
import {verifyTokenAdmin} from "../middlewares/verifyTokenAdmin.js";
import {checkRestaurant} from "../middlewares/checkRestaurant.js";
import {validation} from "../middlewares/validation.js";

const router = express.Router()

router.get("/", verifyTokenAdmin, checkRestaurant, getAllFoods)
router.get("/:id", validateMongoDbId, verifyTokenAdmin, checkRestaurant, getFood)

router.put("/:id", validateMongoDbId, verifyTokenAdmin, checkRestaurant, validation(createFoodSchema), updateFood)

router.post("/", verifyTokenAdmin, checkRestaurant, validation(createFoodSchema), addFood)

router.delete("/:id", validateMongoDbId, verifyTokenAdmin, checkRestaurant, deleteFood)

export default router
