const mongoose = require('mongoose');

const educationalResourceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['sustainable_investing', 'esg', 'climate_change', 'green_technology', 'social_impact'],
    required: true,
  },
  type: {
    type: String,
    enum: ['article', 'video', 'course', 'infographic', 'podcast'],
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the updatedAt timestamp before saving
educationalResourceSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('EducationalResource', educationalResourceSchema); 