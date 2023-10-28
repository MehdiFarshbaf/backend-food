import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import Restaurant from "../models/Restaurant.js";

export const getAllRestaurants = async (req, res, next) => {
    try {
        const restaurants = await Restaurant.find().select(["-adminPassword", "-adminUsername", "-id", "-__v"]).populate("menus")
        res.status(200).json({
            success: true,
            restaurants
        })
    } catch (err) {
        next(err)
    }
}

export const getRestaurant = async (req, res, next) => {
    try {
        const restaurant = await Restaurant.findById(req?.params?.id).populate("menus")

        if (!restaurant) {
            const error = new Error("رستورانی با این شناسه یافت نشد.")
            error.statusCode = 404
            throw error
        }

        res.status(200).json({
            success: true,
            restaurant
        })

    } catch (err) {
        next(err)
    }
}

export const createRestaurant = async (req, res, next) => {
    try {
        const {name, description, address, adminUsername, adminPassword} = req.body
        const restaurant = await Restaurant.create({name, description, address, adminUsername, adminPassword})
        res.status(201).json({
            success: true,
            message: `رستوران ${name} ایجاد شد.`,
            restaurant
        })
    } catch (err) {
        next(err)
    }
}

export const updateRestaurant = async (req, res, next) => {

    const {id} = req.params
    const {name, description, address} = req.body

    try {
        const restaurant = await Restaurant.findByIdAndUpdate(id, {name, description, address}, {new: true})
        res.status(200).json({
            success: true,
            message: "رستوران مورد نظر ویرایش شد.",
            restaurant
        })
    } catch (err) {
        next(err)
    }
}

export const deleteRestaurant = async (req, res, next) => {
    const {id} = req.params
    try {
        const restaurant = await Restaurant.findByIdAndDelete(id)
        res.status(200).json({
            success: true,
            message: `رستوران ${restaurant?.name} حذف شد.`,
            restaurant
        })
    } catch (err) {
        next(err)
    }
}

export const loginToRestaurant = async (req, res, next) => {
    const {username, password} = req.body
    try {
        const user = await Restaurant.findOne({adminUsername: username})
        if (!user) {
            const error = new Error("رستورانی با این کلمه کاربر یافت نشد.")
            error.statusCode = 404
            throw error
        }
        const passwordCheck = await bcrypt.compare(password, user.adminPassword)
        if (!passwordCheck) {
            const error = new Error("کلمه کاربری یا کلمه عبور اشتباه است.")
            error.statusCode = 422
            throw error
        }
        const userData = {
            role: "restaurant",
            username: user.adminUsername,
            _id: user._id
        }
        const token = await jwt.sign(userData, process.env.ACCESS_TOKEN_ADMIN)

        res.status(200).json({
            success: true,
            token
        })
    } catch (err) {
        next(err)
    }
}