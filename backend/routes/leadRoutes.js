const express = require("express");
const router = express.Router();
const Lead = require("../models/Lead");
const { protect } = require("../middleware/authMiddleware");

// Create Lead
router.post("/", protect, async (req, res) => {
  try {
    const lead = await Lead.create(req.body);
    res.status(201).json(lead);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get All Leads (with search)
router.get("/", protect, async (req, res) => {
  try {
    const { search } = req.query;
    const query = search 
      ? {
          $or: [
            { name: { $regex: search, $options: 'i' } },
            { email: { $regex: search, $options: 'i' } },
            { phone: { $regex: search, $options: 'i' } }
          ]
        }
      : {};
    const leads = await Lead.find(query).sort({ createdAt: -1 });
    res.json(leads);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update Lead
router.put("/:id", protect, async (req, res) => {
  try {
    const { note, ...updateData } = req.body;
    
    // Prepare the update object
    let updateObj = updateData;
    
    // If note is provided, use $push to add it to notes array
    if (note) {
      updateObj = {
        ...updateData,
        $push: { notes: note }
      };
    }
    
    const updatedLead = await Lead.findByIdAndUpdate(
      req.params.id,
      updateObj,
      { new: true }
    );

    if (!updatedLead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    res.json(updatedLead);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete Lead
router.delete("/:id", protect, async (req, res) => {
  try {
    const deletedLead = await Lead.findByIdAndDelete(req.params.id);

    if (!deletedLead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    res.json({ message: "Lead deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
