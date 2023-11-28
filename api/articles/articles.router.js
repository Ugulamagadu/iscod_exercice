const express = require("express");
const articleController = require("./articles.controller");
const authMiddleware = require("../../middlewares/auth");

const router = express.Router();

// Utilise le middleware d'authentification pour toutes les routes de cet endpoint
router.use(authMiddleware);

// Définit les routes
router.get("/", articleController.getAll);
router.get("/:id", articleController.getOne);
router.post("/", articleController.create);
router.put("/:id", articleController.update);
router.delete("/:id", articleController.delete);

module.exports = router;
