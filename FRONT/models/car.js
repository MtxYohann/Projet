import mongoose from "mongoose"
const { Schema, model } = mongoose

const carSchema = new Schema({
    marque: String,
    modele: String,
    cylindre: String,

});

export default model("Car", carSchema);