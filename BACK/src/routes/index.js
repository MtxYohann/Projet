import { Router } from "express";
import isAuth from "../midlewares/auth.js"
import authRoutes from "./auth.js";
import carsRoutes from "./cars.js";
import fileRoutes from "./file.js";

const router = Router();

router.use("/cars", carsRoutes);
router.use("/auth", authRoutes);
router.use("/file",fileRoutes)


export default router;