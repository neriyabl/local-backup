require("dotenv").config();

const express = require("express");
const multer = require("multer");
const { writeFile, rename } = require("fs").promises;

const upload = multer({ dest: process.env.BASE_DIR });
const app = express();

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/upload", upload.any(), (req, res) => {
  const files = req.files;
  if (files) {
    files.forEach((file) => {
      rename(file.path, process.env.BASE_DIR + file.originalname);
    });
  }
  res.send("OK Done");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server listen in http://localhost:${port}`);
});
