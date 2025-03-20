const mongoose = require('mongoose');

const investmentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['renewable_energy', 'clean_water', 'sustainable_agriculture', 'green_buildings']
  },
  type: {
    type: String,
    required: true,
    enum: ['sustainable', 'traditional']
  },
  esgScore: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  impactMetrics: {
    carbonReduction: {
      type: Number,
      default: 0
    },
    waterSaved: {
      type: Number,
      default: 0
    },
    treesPlanted: {
      type: Number,
      default: 0
    }
  },
  performance: {
    type: Number,
    default: 0
  },
  impactScore: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt timestamp before saving
investmentSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Investment', investmentSchema); 