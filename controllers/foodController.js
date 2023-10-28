import Food from "../models/Food.js";
import Restaurant from "../models/Restaurant.js";

export const getAllFoods = async (req, res, next) => {
    try {
        const foods = await Food.find().populate("restaurant", ["name"])
        res.status(200).json({
            success: true,
            foods,
            total: foods.length
        })
    } catch (err) {
        next(err)
    }
}

export const getFood = async (req, res, next) => {
    const {id} = req.params
    try {
        const food = await Food.findById(id).populate("restaurant", ["name", "description", "score"])
        if (!food) {
            const error = new Error("غذایی با این شناسه یافت نشد.")
            error.statusCode = 404
            throw error
        }
        res.status(200).json({
            success: true,
            food
        })
    } catch (err) {
        next(err)
    }
}

export const addFood = async (req, res, next) => {
    const {name, description, price} = req.body
    try {
        const food = await Food.create({name, description, price, restaurant: req.user._id})
        res.status(200).json({
            success: true,
            message: `غذای ${name} با موفقیت ایجاد شد.`,
            food
        })
    } catch (err) {
        next(err)
    }
}

export const updateFood = async (req, res, next) => {
    const {id} = req.params
    const {name, description, price} = req.body
    try {
        const food = await Food.findById(id).populate("restaurant")
        if (!food) {
            const error = new Error("غذایی با این شناسه یافت نشد.")
            error.statusCode(404)
            throw error
        }
        if (food.restaurant._id.toString() == req.user._id.toString()) {
            await Food.findByIdAndUpdate(id, {name, description, price})
            res.status(200).json({
                success: true,
                message: "ویرایش موفقیت آمیز بود.",
                food
            })
        }
        res.status(200).json({
            success: false,
            message: "شما نمی توانید غذای رستوران دیگری را ویرایش کنید"
        })
    } catch (err) {
        next(err)
    }
}

export const deleteFood = async (req, res, next) => {
    const {id} = req.params
    try {
        const food = await Food.findById(id).populate("restaurant")
        if (!food) {
            const error = new Error("غذایی با این شناسه یافت نشد.")
            error.statusCode(404)
            throw error
        }
        if (food.restaurant._id.toString() == req.user._id.toString()) {
            await Food.findByIdAndDelete(id)
            res.status(200).json({
                success: true,
                message: `غذای ${food?.name} از رستوارن شما با موفقیت حذف شد.`,
                food
            })
        }
        res.status(200).json({
            success: false,
            message: "شما نمی توانید غذای رستوران دیگری را حذف کنید"
        })
    } catch (err) {
        next(err)
    }
}