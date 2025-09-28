require('dotenv').config();
const model4 = require('./model4');
const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const cors = require("cors");
const npt = require("./Model");
const mode1 = require("./model1");
const model3 = require("./Model3");
const jwt = require("jsonwebtoken");
const app = express();

app.use(cors());
app.use(express.json());

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("DB connected successfully");
  })
  .catch(error => {
    console.error("DB connection error:", error);
  });

app.post("/post", upload.single('image'), async (req, res) => {
  if (!req.file || req.file.size === 0) {
    return res.status(400).send("No file uploaded or empty file");
  }
  try {
    const amn = new npt({ image: "placeholder_url", text: req.body.text, banner: "placeholder_url" });
    await amn.save();
    res.send("Image saved to DB (Cloudinary removed)");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error saving data");
  }
});

app.post('/send', upload.fields([{ name: 'image' }, { name: 'banner' }]), async (req, res) => {
  try {
    if (!req.files || !req.files.image || !req.files.banner) {
      return res.status(400).send('Both image and banner files are required');
    }
    const newData = new mode1({ image: "placeholder_url", text: req.body.text, banner: "placeholder_url", video: req.body.video });
    await newData.save();
    res.send('Data saved to DB (Cloudinary removed)');
  } catch (error) {
    console.error('Error saving files:', error);
    res.status(500).send('Error saving files');
  }
});

app.get("/", async (req, res) => {
  res.send("ok");
});

app.get('/item/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const md = await mode1.findById(id);
    res.json(md);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error fetching item");
  }
});

app.post('/create', async (req, res) => {
  const { name, pass } = req.body;
  const ch = new model3({ name, pass });
  try {
    await ch.save();
    res.send("account created");
  } catch (error) {
    console.log(error);
  }
});

app.post('/login1', async (req, res) => {
  const { name, pass } = req.body;
  const bk = await model3.findOne({ name });
  if (bk && pass == bk.pass) {
    const bg = jwt.sign({ name, pass }, "12345Ha", { expiresIn: "1h" });
    res.json({ "token": bg });
  } else {
    res.status(401).send("Invalid credentials");
  }
});

const verifytoken = (req, res, next) => {
  const token = req.header["authorization"];
  if (!token) {
    return res.send("no token");
  }
  jwt.verify(token, "1234Ha");
  next();
};

app.post('/movie2', async (req, res) => {
  const { name, image, banner, info, image1 } = req.body;
  const Npo = new model4({ name, image, banner, info, image1 });
  try {
    await Npo.save();
    res.send("ok");
  } catch (error) {
    console.log(error);
  }
});

app.get("/movieg2", async (req, res) => {
  try {
    const movies = await model4.find();
    res.status(200).send(movies);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server Error" });
  }
});

app.get('/get', async (req, res) => {
  try {
    const cd = await npt.find();
    res.send(cd);
  } catch (error) {
    console.log(error);
  }
});

app.get('/take', async (req, res) => {
  try {
    const cd = await mode1.find();
    res.send(cd);
  } catch (error) {
    console.log(error);
  }
});

app.get('/item1/:id', async (req, res) => {
  const nba = req.params.id;
  try {
    const gh = await model4.findById(nba).lean();
    res.send(gh);
  } catch (error) {
    console.log(error);
  }
});

const port = process.env.PORT || 5000;
app.listen(port, "0.0.0.0", () => {
  console.log(`Server running on port ${port}`);
});
