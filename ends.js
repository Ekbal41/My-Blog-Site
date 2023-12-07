const fs = require('fs').promises;
const napnux = require("napnux");
const { getFileMetaDatas } = require('./utils');
const { about, projects, skills } = require("./data");
const path = require('path');
const blogDir = path.join(process.cwd(), "data/blog-posts/");

module.exports = napnux()
  .get("/", async (req, res) => {
    try {
      const files = await fs.readdir(blogDir);
      const blogPostMetas = getFileMetaDatas(files);
      const firstFiveBlogPostMeta = blogPostMetas.slice(0, 5);
      res.render("index", { firstFiveBlogPostMeta, about, skills, projects });
    } catch (error) {
      // Handle errors
      console.error(error);
      res.send("Internal Server Error");
    }
  })
  .get("/blog-posts", async (req, res) => {
    try {
      const files = await fs.readdir(blogDir);
      const blogPostMetas = getFileMetaDatas(files);
      res.render("blog/blog-posts", { blogPostMetas });
    } catch (error) {
      // Handle errors
      console.error(error);
      res.send("Internal Server Error");
    }
  })

  .get("/blog/:slug", async (req, res) => {
    const { slug } = req.params;
    try {
      const rawfileContent = await fs.readFile(path.join(blogDir, `${slug}.md`), 'utf8');
      const blogPostContent = rawfileContent.replace(/---[\s\S]*?---/, '');
      const files = await fs.readdir(blogDir);
      const blogPostsMetas = getFileMetaDatas(files);
      const blogPostsMeta = blogPostsMetas.find(bpm => bpm.slug === slug);
      const blogPostTags = blogPostsMeta.tags.split(",").map(tag => tag.trim());
      res.render("blog/index", {
        blogPostsMeta,
        blogPostContent,
        blogPostTags
      });
    } catch (error) {
      // Handle errors
      console.error(error);
      res.send("Internal Server Error");
    }
  });
