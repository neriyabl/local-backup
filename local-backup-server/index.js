require("dotenv").config();

const express = require("express");
const multer = require("multer");
const { rename } = require("fs").promises;
const { connectDb } = require("./models");
const { createDevice, checkMessage } = require("./services/device.service");

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
  if (!name) {
    res.sendStatus(400);
    return;
  }

  const device = await createDevice(name);

  res.status(201).send(device);
});

app.get("/login", async (req, res) => {
  const { id, message } = req.query;
  if (!id || !message) {
    res.sendStatus(400);
    return;
  }
  const device = await checkMessage(id, message);
  if (!device) {
    return res.sendStatus(403);
  }
  const jwt = "12345asdasd.asdasfa.adfasdf" //TODO await generateJwt();
  //TODO send response with message and token
  //TODO caldulate server message
  const serverMessage = "12312412412";
  res.send({ serverMessage, jwt });
});

const port = process.env.PORT || 3000;
connectDb().then(() => {
  app.listen(port, () => {
    console.log(`server listen in http://localhost:${port}`);
  });
});
