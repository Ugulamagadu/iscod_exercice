const { Schema, model } = require("mongoose");

// Définition du schéma de l'article
const articleSchema = Schema({
  title: String,          // Champ privé title de type String
  content: String,        // Champ privé content de type String
  user: {                 // Champ privé user qui est une référence à un objet de la classe User
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  statut: {
    type: String,
    enum: {
      values: ["draft", "published"],
      message: "{VALUE} inconnue",
    },         // Champ privé status de type String
  }
});

// Export du modèle Article
let Article;

module.exports = Article = model("Article", articleSchema);

  