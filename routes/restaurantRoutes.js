import express from "express";

import {
    createRestaurant, deleteRestaurant,
    getAllRestaurants,
    getRestaurant, loginToRestaurant,
    updateRestaurant
} from "../controllers/restaurantController.js";

// middlewares
import {validateMongoDbId} from "../middlewares/validateMongoDbId.js";
import {validation} from "../middlewares/validation.js";

//schemas
import {createRestaurantSchema, loginRestaurantSchema} from "../validations/restaurantValidations.js";
import {verifyTokenAdmin} from "../middlewares/verifyTokenAdmin.js";

const router = express.Router()

//crud restaurant
router.get("/", verifyTokenAdmin, getAllRestaurants)
router.get("/:id", validateMongoDbId, getRestaurant)

router.post("/", validation(createRestaurantSchema), createRestaurant)

router.put("/:id", validateMongoDbId, verifyTokenAdmin, validation(createRestaurantSchema), updateRestaurant)

router.delete("/:id", validateMongoDbId, deleteRestaurant)

// authentication
router.post("/login", validation(loginRestaurantSchema), loginToRestaurant)

export default router