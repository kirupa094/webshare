const express = require("express");
const path = require("path");
const fs = require("fs");
const { getPostById } = require("./stub/posts");
const app = express();

const PORT = process.env.PORT || 3000;
const indexPath = path.resolve(__dirname, "..", "build", "index.html");

// static resources should just be served as they are
app.use(
  express.static(path.resolve(__dirname, "..", "build"), { maxAge: "30d" })
);
// here we serve the index.html page
app.get("/*", (req, res, next) => {
  fs.readFile(indexPath, "utf8", (err, htmlData) => {
    if (err) {
      console.error("Error during file reading", err);
      return res.status(404).end();
    }
    // get post info
    const postId = req.query.id;
    const param=req.query.title;
    const image=req.query.img;
    const post = getPostById(postId);
    if (!post) return res.status(404).send("Post not found");

    // inject meta tags
    htmlData = htmlData
      // .replace("<title>React App</title>", `<title>${param}</title>`)
      .replace("__META_OG_TITLE__", param)
      .replace("__META_OG_DESCRIPTION__", post.description)
      .replace("__META_DESCRIPTION__", post.description)
      .replace("__META_OG_IMAGE__", image)
      .replace("__META_OG_URL__", post.url);
    return res.send(htmlData);
  });
});
// listening...
app.listen(PORT, (error) => {
  if (error) {
    return console.log("Error during app startup", error);
  }
  console.log("listening on " + PORT + "...");
});
