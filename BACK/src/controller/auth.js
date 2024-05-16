import User from "../models/user.js";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { email, password, name, phoneNumber } = req.body;
  console.log(req.body);
  // On va hasher le mot de passe
  const hashedPassword = await bcrypt.hash(password, 12);
  // On cree un nouvel utilisateur
  const newUser = new User({
    email,
    password: hashedPassword,
    name,
    phoneNumber,
  });
  const user = await User.findOne({ email: email });
  try {
  if (newUser.email === user.email){
    return res.status(400).json("utilisateur déjà existant")
  } 
} catch (error) {
  // On sauvegarde le nouvel utilisateur
  const doc = await newUser.save();
  // si tout s'est bien passé, on renvoie un status 201
  res.status(201).json(doc);
}
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  // On cherche l'utilisateur dans la base de donnees
  const user = await User.findOne({ email: email });

  // si l'utilisateur n'existe pas, on renvoie une erreur
  if (!user) {
    return res.status(401).json({ message: "Utilisateur inexistant" });
  }

  // si l'utilisateur existe, on compare les mots de passe
  const isPasswordValid = await bcrypt.compare(password, user.password);

  // si le mot de passe est invalide, on renvoie une erreur
  if (!isPasswordValid) {
    return res.status(400).json("mauvais MDP")
  }

  // sinon on genere un token
  const token = jwt.sign(
    { email: user.email, id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
  // on renvoie le token
  res.status(200).json({ token });
};