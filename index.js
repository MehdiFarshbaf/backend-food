import express from 'express'
import dotenv from 'dotenv'

import {connectDB} from "./config/db.js";
import {headers} from "./middlewares/headers.js";
import {errorHandler} from "./middlewares/error.js";

// routers import
import restaurantRoutes from "./routes/restaurantRoutes.js";
import foodRoutes from "./routes/foodRoutes.js";

// Load Config
dotenv.config()
connectDB()

const app = new express()

// BodyParser & Headers
app.use(express.json())
app.use(headers)

// File Upload Middleware

// Static Folder

// Routes
app.use("/api/restaurant", restaurantRoutes)
app.use("/api/food", foodRoutes)

// error handler
app.use(errorHandler)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
})