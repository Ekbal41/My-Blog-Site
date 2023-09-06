const fs = require('fs').promises; // Use fs.promises for async operations
const napnux = require("napnux");
const { getFileMetaDatas } = require('./utils');
const { about, projects, skills } = require("./data");
const path = require('path');
const blogDir = path.join(process.cwd(), "data/blogs/");

module.exports = napnux()
  .get("/", async (req, res) => {
    try {
      const files = await fs.readdir(blogDir);
      const blogs = getFileMetaDatas(files);
      const firstFiveBlogs = blogs.slice(0, 5);
      res.render("index", { firstFiveBlogs, about, skills, projects });
    } catch (error) {
      // Handle errors
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  })
<<<<<<< HEAD
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
=======
  .get("/blog/:slug", async (req, res) => {
    const { slug } = req.params;
    try {
      const rawfileContent = await fs.readFile(path.join(blogDir, `${slug}.md`), 'utf8');
      const fileContent = rawfileContent.replace(/---[\s\S]*?---/, '');
      const files = await fs.readdir(blogDir);
      const blogs = getFileMetaDatas(files);
      const blog = blogs.find(blog => blog.slug === slug);
      res.render("blog/index", { blog, fileContent });
    } catch (error) {
      // Handle errors
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
>>>>>>> 7b8cf9a4a475095c008f2a7a96035e0cec52d49c
  });
