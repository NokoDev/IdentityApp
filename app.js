const express = require("express");
const app = express();
const mongoose = require("mongoose");
const ejs = require("ejs");
const ejsMate = require("ejs-mate");
const path = require("path");
const methodOverride = require("method-override")

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
app.use(methodOverride("_method"))
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {

  const identities = await Account.find({})
  res.render("index", { identities });
});

app.get("/new", (req, res) => {
  res.render("new");
});

app.post("/new/account", async (req, res) => {
  // console.log(req.body.account)
  const newIdentity = new Account(req.body.account);
  await newIdentity.save()
  res.redirect("/");
});



app.get("/account/:id", async (req, res) => {
  const { id } = req.params

  const account = await Account.findById({ _id: id })

  res.render("edit", { account })
})



app.post("/account/:id/edit", async (req, res) => {
  const { id } = req.params

  const account = await Account.findByIdAndUpdate({ _id: id }, req.body.account, { new: true })

  await account.save()
  res.redirect("/")

})

app.delete("/account/:id", async (req, res) =>{
  console.log("delete........")
  const {id} = req.params
  await Account.findOneAndDelete({_id: id})
  res.redirect("/")
})



app.listen(port, () => {
  console.log("Server started...");
});
