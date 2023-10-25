import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const restaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "نام رستوران الزامی است."],
        trim: true,
    },
    description: {
        type: String,
        required: [true, "توضیحات برای رستوران الزامی است."],
        trim: true,
    },
    score: {
        type: Number,
        default: 0
    },
    address: String,
    image: String,
    adminPassword: {
        type: String,
        required: true
    },
    adminUsername: {
        type: String,
        required: true
    }
}, {
    toJSON: {virtuals: true},
    toObject: {virtuals: true},
    timestamps: true
})

restaurantSchema.virtual("comments", {
    ref: "Comment",
    foreignField: "restaurant",
    localField: "_id"
})
restaurantSchema.virtual("menus", {
    ref: "Menu",
    foreignField: "restaurant",
    localField: "_id"
})

restaurantSchema.pre("save", async function (next) {
    if (!this.isModified("adminPassword")) {
        next()
    }
    const salt = await bcrypt.genSalt(10)
    this.adminPassword = await bcrypt.hash(this.adminPassword, salt)
    next()
})

export default mongoose.model("Restaurant", restaurantSchema)