const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./db");
const PORT = 3000;
const HOST = "localhost";

//Create Express Application
const app = express();
app.use(express.json());

// Define a simple schema and model for 'name'
const nameSchema = new mongoose.Schema({
  name: { type: String, required: true },
});
const NameModel = mongoose.model("UserName", nameSchema);

// GET route to fetch the name
app.get("/", async (req, res) => {
  try {
    const name = new NameModel({ name: "Static Name" });
    await name.save();
    const getnames = await NameModel.find();
    res.status(200).json(getnames);
  } catch (err) {
    console.error("Error saving name to database:", err.message);
    res.status(500).send("Server error");
  }
});

//Start Your WebServer & Listen on PORT 3000
app.listen(PORT, async () => {
  console.log(`Server is listening port http://${HOST}:${PORT}`);
  await connectDB();
});
