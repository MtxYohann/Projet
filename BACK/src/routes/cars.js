import express from "express";
import {getCar, carPut, carDelete, createCar, getCars} from "../controller/cars.js"
import {body, query} from "express-validator"
const router = express.Router();



  router.get("/", getCars)

  router.get("/:Id", getCar)
  router.post("/",
  [
    body("marque").trim().isLength({ max: 20, min: 2 }),
    body("model").trim().isLength({ min: 2, max: 100 }),
  ],createCar)

 // PUT http://localhost:3001/cars/1 creer une route qui
// permet de modiier une voiture
router.put("/:id", carPut) 
  
  // DELETE http://localhost:3001/cars/1 creer une route qui
  // permet de supprimer une voiture
  router.delete("/:id", carDelete)
  // PUT http://localhost:3001/cars/1 creer une route qui
// permet de modiier une voiture

// DELETE http://localhost:3001/cars/1 creer une route qui
// permet de supprimer une voiture

// Ceci est un export default, on peut en avoir
// qu'un seul par fichier (module)

  export default router 