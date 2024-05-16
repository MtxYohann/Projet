import "dotenv/config"
import mongoose from 'mongoose'
import  express  from "express";
import { CreateApp } from "./app.js";




const app = CreateApp()

const PORT = process.env.PORT || 3001;

const MONGO_STRING = process.env.MONGO_STRING




//Midlewares
//Midleware qui se charge de rediriger les req
//qui concernent les voitures vers le router des voitures


mongoose.connect(MONGO_STRING).then(() =>{
    console.log("connected to the db")

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    })
})

