const request = require("supertest");
const { app } = require("../server");
const config = require("../config");
const mongoose = require("mongoose");
const mockingoose = require("mockingoose");

describe("Endpoints des articles", () => {
  let user, article;

  // Fonction fictive pour créer un utilisateur
  async function createUser() {
    const response = await request(app).post("/api/users").send({
      name: "Joshua Iscod",
      email: "joshua.iscod@example.com",
      password: "azertyuiop",
    });
    console.log(response.status)
    return response.body;
  }

  // Fonction fictive pour créer un article
  async function createArticle(userId) {
    const response = await request(app)
      .post("/api/articles")
      .send({
        title: "Nouvel article",
        content: "Contenu de l'article",
        user: userId,
      });
    return response.body;
  }

  beforeAll(async () => {
    user = await createUser(); // Créez un utilisateur pour les tests
    article = await createArticle(user._id); // Créez un article lié à l'utilisateur
  });

  it("devrait obtenir les articles de l'utilisateur", async () => {
    const response = await request(app).get(`/api/users/:${user._id}/articles`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0]._id).toEqual(article._id);
  });

});
