import express from "express";
import { signin, signup } from "../controller/auth.js";
import { body, validationResult } from "express-validator";

// import { body } from 'express-validator';

const router = express.Router();
const fieldvalid = (req,res,next) => {
const errors = validationResult(req);
if (!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()[0].msg})
}
next()
}

router.post("/signin", signin);
router.post("/signup",
    [
        body('email').trim().isEmail().withMessage("email invalid"),
        body('password').trim().notEmpty().isStrongPassword().withMessage("Mot de passe trop faible"),
        body('name').trim().notEmpty(),
        body('phoneNumber').trim().notEmpty(),

    ],
fieldvalid,signup);

export default router;