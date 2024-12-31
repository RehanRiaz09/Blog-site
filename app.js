const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyparser = require('body-parser');
const mongoose = require('mongoose');


const userRoutes = require("./routes/users")
const postRoutes = require("./routes/posts")
const categoryRoutes = require("./routes/categories")
const commentRoutes = require("./routes/comments")
const tagRoutes = require("./routes/tags")
mongoose.connect("mongodb://127.0.0.1:27017/blog");
mongoose.Promise = global.Promise;

app.use(morgan("dev"));
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.use("/post",postRoutes)
app.use("/user", userRoutes)
app.use("/category", categoryRoutes)
app.use("/comment", commentRoutes)
app.use("/tag", tagRoutes)
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;