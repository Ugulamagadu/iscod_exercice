const articleService = require("./articles.service");

class ArticleController {
  async getAll(req, res, next) {
    try {
      const articles = await articleService.getAll();
      res.json(articles);
    } catch (err) {
      next(err);
    }
  }

  async getOne(req, res, next) {
    try {
      const id = req.params.id;
      const article = await articleService.get(id);
      if (!article) {
        res.status(404).json({ message: "Article not found" });
        return;
      }
      res.json(article);
    } catch (err) {
      next(err);
    }
  }

  async create(req, res, next) {
    try {
      // Assure-toi que l'enregistrement utilise l'id de l'utilisateur connecté
      const newArticleData = { ...req.body, user: req.user._id };
      const newArticle = await articleService.create(newArticleData);
      res.status(201).json(newArticle);
    } catch (err) {
      next(err);
    }
  }

  async update(req, res, next) {
    try {
      const id = req.params.id;
      const data = req.body;
      const updatedArticle = await articleService.update(id, data);
      res.json(updatedArticle);
    } catch (err) {
      next(err);
    }
  }

  async delete(req, res, next) {
    try {
      const id = req.params.id;
      await articleService.delete(id);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new ArticleController();
