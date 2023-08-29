const napnux = require("napnux");
module.exports = napnux()
  // All routes for the project root goes here
  .get("/", (req, res) => {
    res.render("index");
  })
  .get("/blog", (req, res) => {
    res.render("blog");
  });
