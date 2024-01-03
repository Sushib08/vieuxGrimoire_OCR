const jwt = require("jsonwebtoken");

require("dotenv").config();
const TOKEN_KEY = process.env.TOKEN_KEY;

const authUser = (req, res, next) => {
  // Récupérer le token d'authentification depuis les en-têtes de la requête
  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Authentification requise." });
  }

  // Vérifier et décoder le token
  jwt.verify(token, `${TOKEN_KEY}`, (err, decodedToken) => {
    if (err) {
      return res.status(403).json({ message: "Token invalide." });
    }
    // Si le token est valide, ajoutez l'ID utilisateur décodé à la requête pour une utilisation ultérieure
    req.userId = decodedToken.userId;
    next(); // Passez au middleware suivant ou à la fonction de contrôleur
  });
};

module.exports = authUser;
