const fs = require('fs');
const napnux = require("napnux");
const { getFileMetaDatas } = require('./utils');
const { about, projects, skills } = require("./data")

module.exports = napnux()
  .get("/", (req, res) => {
    const files = fs.readdirSync('data/blogs/');
    const blogs = getFileMetaDatas(files);
    const firstFiveBlogs = blogs.slice(0, 5);
    res.render("index", { firstFiveBlogs, about, skills, projects });
  })
  .get("/blog/:slug", (req, res) => {
    const { slug } = req.params;
    let rawfileContent = fs.readFileSync('data/blogs/' + slug + ".md", 'utf8');
    let fileContent = rawfileContent.replace(/---[\s\S]*?---/, '');
    const files = fs.readdirSync('data/blogs/');
    const blogs = getFileMetaDatas(files);
    const blog = blogs.find(blog => blog.slug === slug);
    res.render("blog/index", {
      blog,
      fileContent
    });
  });


