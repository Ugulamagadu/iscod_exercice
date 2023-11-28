const Article = require("./article.model.js");
const User = require("../users/users.model.js");

class ArticleService {
  getAll() {
    return Article.find();
  }

  get(id) {
    return Article.findById(id);
  }

  create(data) {
    return Article.create(data);
  }

  update(id, data) {
    return Article.findByIdAndUpdate(id, data, { new: true });
  }

  delete(id) {
    return Article.findByIdAndDelete(id);
  }

  async getUserArticles(userId) {
    return User.findById(userId).populate("articles", "-password");
  }
}

module.exports = new ArticleService();
