// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Initialize Express app
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Atlas connection URI
const uri = "mongodb+srv://sagar:sagar@cluster0.hwwv5fd.mongodb.net/DrashtiFoods?retryWrites=true&w=majority";

// Connect to MongoDB
mongoose.connect(uri)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// Define the Papad schema
const papadSchema = new mongoose.Schema({
    productId: { type: Number, required: true },
    name: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    price: {
      "500g": { type: Number, required: true },
      "1kg": { type: Number, required: true },
    },
  });
// Create a model based on the schema
const Papad = mongoose.model('papads', papadSchema);

// API Routes

// Get all papads
app.get("/papads", async (req, res) => {
    try {
      const papads = await Papad.find({});
      res.json(papads);
    } catch (error) {
      console.error("Error fetching papads:", error);
      res.status(500).json({ error: "Failed to fetch papads." });
    }
  });
  
  // Get a papad by ID
  app.get("/papads/:id", async (req, res) => {
    try {
      const papad = await Papad.findOne({ productId: req.params.id });
      if (!papad) {
        return res.status(404).json({ error: "Papad not found." });
      }
      res.json(papad);
    } catch (error) {
      console.error("Error fetching papad:", error);
      res.status(500).json({ error: "Failed to fetch papad." });
    }
  });
  
  // Create a new papad
  app.post("/papads", async (req, res) => {
    const { productId, name, image, description, price } = req.body;
    try {
      const newPapad = new Papad({ productId, name, image, description, price });
      await newPapad.save();
      res.status(201).json(newPapad);
    } catch (error) {
      console.error("Error creating papad:", error);
      res.status(500).json({ error: "Failed to create papad." });
    }
  });
  
  // Update a papad
  app.put("/papads/:id", async (req, res) => {
    const { name, image, description, price } = req.body;
    try {
      const updatedPapad = await Papad.findOneAndUpdate(
        { productId: req.params.id },
        { name, image, description, price },
        { new: true }
      );
  
      if (!updatedPapad) {
        return res.status(404).json({ error: "Papad not found." });
      }
  
      res.json(updatedPapad);
    } catch (error) {
      console.error("Error updating papad:", error);
      res.status(500).json({ error: "Failed to update papad." });
    }
  });
  
  // Delete a papad
  app.delete("/papads/:id", async (req, res) => {
    try {
      const deletedPapad = await Papad.findOneAndDelete({ productId: req.params.id });
  
      if (!deletedPapad) {
        return res.status(404).json({ error: "Papad not found." });
      }
  
      res.json({ message: "Papad deleted successfully." });
    } catch (error) {
      console.error("Error deleting papad:", error);
      res.status(500).json({ error: "Failed to delete papad." });
    }
  });
  
  
  
  // Uncomment the following line to seed the database on server start
  // seedDatabase();
  
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });