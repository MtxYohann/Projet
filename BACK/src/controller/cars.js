import { model } from "mongoose";
import mockCars from "../data/mock.js"
import Car from "../models/cars.js"; // Import the Car model
import { validationResult, query } from "express-validator";

export const getCars = (req, res) => {
  Car.find()
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      console.log(error);
      throw new Error(error);
      // res.status(400).json({ message: error.message });
    });
};

export const getCar = (req, res) => {
  const id = req.params.Id;
  Car.findById(id)
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      console.log(error);
      throw new Error(error);
      // res.status(400).json({ message: error.message });
    });
};

export const createCar = async (request, response) => {
  const bodyContent = request.body;
  const errors = validationResult(request);
  
  console.log(errors);
  if(errors.isEmpty())
    {
    // on cree un nouvelle instance de Car
    const newCar = new Car(bodyContent);
    const CarOld = await Car.findOne({model:newCar.model});
    console.log({carold: CarOld})
    try {
      if (CarOld != null){
         return response.status(400).json("Voiture déjà existante")
        } 
        else{
        // on sauvegarde la nouvelle instance de Car
        newCar
          .save()
          .then((result) => {
            response.status(201).json(result);});
          }
          } catch (error) {} 
          } else {
            console.log(errors)
            response.status(400).json({ message: "Ta Gueule" });
      }
  
    
  
  // const id = mockCars.length + 1;
  // const newCar = { id, ...bodyContent };
  // mockCars.push(newCar);
  // response.status(201).json(newCar);
};



  export const carPut = (req, res) => {
    const id = req.params.id;
    const bodyContent = req.body
    Car.findByIdAndUpdate(id, bodyContent)
      .then((result) => {
        res.json(result);
      })
      .catch((error) => {
        console.log(error);
        throw new Error(error);
        // res.status(400).json({ message: error.message });
      });
  };
  export const carDelete = (req, res) => {
    const id = req.params.id;
    Car.findByIdAndDelete(id)
      .then((result) => {
        res.json(result);
      })
      .catch((error) => {
        console.log(error);
        throw new Error(error);
        // res.status(400).json({ message: error.message });
      });
  };