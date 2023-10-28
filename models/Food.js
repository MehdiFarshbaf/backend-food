import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "نام غذا الزامی است."],
        trim: true,
    },
    description: {
        type: String,
        required: [true, "توضیحات برای غذا الزامی است."],
        trim: true,
    },
    score: {
        type: Number,
        default: 0
    },
    image: String,
    price: Number,
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant",
        required: [true, "شناسه رستوران الزامی است."]
    },
    comment: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }]
})

export default mongoose.model("Food", foodSchema)