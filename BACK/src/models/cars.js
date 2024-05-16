import mongoose from "mongoose";
const { Schema, model } = mongoose;

const carSchema = new Schema({
    marque: String,
    model: String,
    Cylindree: String,
    Position_moteur: String,
    Architechture_moteur: String,
    Poid: Number,
  });
  
  export default model("Car", carSchema);