const fs = require('fs');
const napnux = require("napnux");
const { getFileMetaDatas } = require('./utils');
const { about, projects, skills } = require("./data");
const path = require('path');
const blogDir = path.join(process.cwd(), "data/blogs/");

module.exports = napnux()
  .get("/", (req, res) => {
    const files = fs.readdirSync(blogDir);
    const blogs = getFileMetaDatas(files);
    const firstFiveBlogs = blogs.slice(0, 5);
    res.render("index", { firstFiveBlogs, about, skills, projects });
  })
  .get("/blogs", (req, res) => {
    const files = fs.readdirSync(blogDir);
    const blogs = getFileMetaDatas(files);
    res.render("blog/blogs", { blogs });
  })
  .get("/blog/:slug", (req, res) => {
    const { slug } = req.params;
    let rawfileContent = fs.readFileSync(blogDir + slug + ".md", 'utf8');
    let fileContent = rawfileContent.replace(/---[\s\S]*?---/, '');
    const files = fs.readdirSync(blogDir);
    const blogs = getFileMetaDatas(files);
    const blog = blogs.find(blog => blog.slug === slug);
    const tags = blog.tags.split(",").map(tag => tag.trim());
    res.render("blog/index", {
      blog,
      fileContent,
      tags
    });
  });


