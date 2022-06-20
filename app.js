const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");

const ejs = require("ejs");
const Post = require("./models/Post");
const pageControllers = require("./controllers/pageControllers");
const postControllers = require("./controllers/postControllers");
const app = express();
require("dotenv").config();
//Connect
const URL = process.env.URL;
const CONNECTION_URL = URL;
mongoose.connect(
  CONNECTION_URL,
  {
    useNewUrlParser: true,

    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log("Connected to MongoDB!!!");
  }
);

app.set("view engine", "ejs");

//Middlewares
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method", { methods: ["POST", "GET"] }));

//Routes
app.get("/", postControllers.getAllPost);
app.get("/posts/:id", postControllers.getPost);
app.post("/posts", postControllers.createPost);
app.put("/posts/:id", postControllers.updatePost);
app.delete("/posts/:id", postControllers.deletePost);

app.get("/about", pageControllers.getAboutPage);
app.get("/add", pageControllers.getAddPage);

app.get("/posts/edit/:id", pageControllers.getEditPage);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda başlatıldı`);
});
