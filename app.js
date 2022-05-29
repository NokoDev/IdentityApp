const express = require("express");
const app = express();
const mongoose = require("mongoose");
const ejs = require("ejs");
const ejsMate = require("ejs-mate");
const path = require("path");

const Account = require("./modules/user");

const port = 3000;

mongoose
  .connect("mongodb://localhost:27017/UserAccount")
  .then(() => {
    console.log("DB Connection open...");
  })
  .catch((err) => {
    console.log(`Something went wrong: ${error}`);
  });

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/new",  (req, res) => {
  res.render("new");
});

app.post("/new/account", async (req, res) => {
  // console.log(req.body.account)
  const newIdentity = new Account(req.body.account);
  await newIdentity.save()
  res.redirect("/");
});

app.listen(port, () => {
  console.log("Server started...");
});
