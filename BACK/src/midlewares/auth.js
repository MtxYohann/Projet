import jwt from "jsonwebtoken";
import pkg from 'jsonwebtoken';
const JsonWebTokenError = pkg;



export default function auth(req, res, next) {
  // recuperer le header authorization
  const header = req.header("Authorization");
  if (header != null){
    // "Bearer token"
    const array = header.split(" ");
    if (array.length !== 2) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const token = array[1];
    // si le token n'est pas existant, on renvoie une erreur 401
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    let decodedToken;
    // faire des try catch pour gerer les erreurs
    try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET);
   

      // vous allez ensuite modifier request pour qu'il contiennent des infos relatives
      // au user authentifié
      req.user = decodedToken;
      next();
    }
    catch (error) {
      return res.status(401).json("Token Invalide")
    }
  } else {
    return res.json("Token invalid")
  }
}