const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const EducationalResource = require('../models/EducationalResource');

// Get all educational resources
router.get('/', auth, async (req, res) => {
  try {
    const resources = await EducationalResource.find().sort({ createdAt: -1 });
    res.json(resources);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get a specific educational resource
router.get('/:id', auth, async (req, res) => {
  try {
    const resource = await EducationalResource.findById(req.params.id);
    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }
    res.json(resource);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a new educational resource (admin only)
router.post('/', auth, async (req, res) => {
  try {
    const { title, description, content, category, type, url } = req.body;
    const resource = new EducationalResource({
      title,
      description,
      content,
      category,
      type,
      url,
    });
    await resource.save();
    res.status(201).json(resource);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update an educational resource (admin only)
router.put('/:id', auth, async (req, res) => {
  try {
    const resource = await EducationalResource.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }
    res.json(resource);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete an educational resource (admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    const resource = await EducationalResource.findByIdAndDelete(req.params.id);
    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }
    res.json({ message: 'Resource deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 