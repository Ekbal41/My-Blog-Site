const napnux = require("napnux");
module.exports = napnux()
  // All routes for the project root goes here
  .get("/", (req, res) => {
    res.render("index");
  });
