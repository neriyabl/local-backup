require("dotenv").config();

const express = require("express");
const multer = require("multer");
const { writeFile, rename } = require("fs").promises;
const { connectDb, models } = require("./models");

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

app.get("/register", async (req, res) => {
  const { name } = req.query
  const dev = new models.Device({
    name,
    key: "test key",
    lastSync: Date.now(),
    dir: `${process.env.BASE_DIR}/${name}`,
    serverMessage: "test sm",
    clientMessage: "test cm"
  })

  await dev.save()
  res.status(201).send(dev)
})

const port = process.env.PORT || 3000;
connectDb().then(() => {
  app.listen(port, () => {
    console.log(`server listen in http://localhost:${port}`);
  });
});
