const express = require("express");
const path = require("path");
const tagsData = require("./data.json");
const fs = require("fs");

// Membaca file JSON secara manual
const jsonData = JSON.parse(fs.readFileSync("./data.json", "utf-8"));
//inisialisasi express
const app = express();
//menginisialisasi view engine
app.set("view engine", "ejs");
//menginisialisasi folder views
app.set("/views", "path.join(__dirname, '/views')");
// membuat static folder untuk assets web
app.use(express.static(path.join(__dirname, "/public")));

//membuat route untuk parsing data & conditional statement
app.get("/", (req, res) => {
  const randomgen = Math.floor(Math.random() * 10) + 1;
  //respon merender file home.ejs
  res.render("home", { randomgen: randomgen });
});

//membuat route untuk parsing data dengan parameter
// app.get("/tags/:tag", (req, res) => {
//   const tag = req.params.tag;
//   res.render("tag", { tag: tag });
// });

// menampilkan data dari file data.json/ query
app.get("/tags/:tag", (req, res) => {
  const { tag } = req.params;
  const data = tagsData[tag];
  if (data) {
    res.render("tag", { data });
  } else {
    res.render("notfound", { tag });
  }
});

//membuat route untuk looping
app.get("/dogs", (req, res) => {
  const dogs = ["Bulldog", "Beagle", "Rottweiler", "Dalmatian"];
  res.render("dogs", { dogs: dogs });
});

app.use(express.json());
app.listen(5000, () => {
  console.log("sudah berjalan di http://localhost:5000/");
});
