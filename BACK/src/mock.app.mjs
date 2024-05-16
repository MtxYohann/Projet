import express from "express";
import { handleUncaughtErrors } from "./midlewares/error.js";
import routes from "./routes/index.js";
import multer from "multer";
import path from "path";


const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString().replace(/:/g, '-') + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
export function CreateApp() {
  const app = express();

  app.use(express.json());
  // file upload middleware configuration
  // file uploads middlware configuration
  app.use(
    multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
  );
  console.log("path: ", path.join(__dirname, "images"));
  app.use("/images", express.static(path.join(__dirname, "images")));


  app.use(routes);

  app.use(handleUncaughtErrors);
  return app;
}