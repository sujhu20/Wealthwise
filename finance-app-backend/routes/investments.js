const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Investment = require('../models/Investment');

// Get all sustainable investments for the user
router.get('/sustainable', auth, async (req, res) => {
  try {
    const investments = await Investment.find({
      userId: req.user.id,
      type: 'sustainable'
    });
    res.json(investments);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get total impact metrics
router.get('/impact', auth, async (req, res) => {
  try {
    const investments = await Investment.find({
      userId: req.user.id,
      type: 'sustainable'
    });

    // Calculate total impact metrics
    const totalImpact = investments.reduce((acc, investment) => {
      return {
        carbonReduction: acc.carbonReduction + (investment.impactMetrics?.carbonReduction || 0),
        waterSaved: acc.waterSaved + (investment.impactMetrics?.waterSaved || 0),
        treesPlanted: acc.treesPlanted + (investment.impactMetrics?.treesPlanted || 0)
      };
    }, { carbonReduction: 0, waterSaved: 0, treesPlanted: 0 });

    res.json(totalImpact);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a new sustainable investment
router.post('/', auth, async (req, res) => {
  try {
    const { name, amount, category, esgScore } = req.body;

    // Calculate impact metrics based on investment amount and category
    const impactMetrics = calculateImpactMetrics(amount, category);

    const investment = new Investment({
      userId: req.user.id,
      name,
      amount,
      category,
      esgScore,
      type: 'sustainable',
      impactMetrics,
      performance: 0, // Initial performance
      impactScore: calculateImpactScore(esgScore, impactMetrics)
    });

    await investment.save();
    res.status(201).json(investment);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Helper function to calculate impact metrics
function calculateImpactMetrics(amount, category) {
  const baseMultiplier = amount / 1000; // Base multiplier per $1000 invested

  switch (category) {
    case 'renewable_energy':
      return {
        carbonReduction: baseMultiplier * 2, // 2 tons CO2 per $1000
        waterSaved: baseMultiplier * 500, // 500L water saved per $1000
        treesPlanted: baseMultiplier * 10 // 10 trees equivalent per $1000
      };
    case 'clean_water':
      return {
        carbonReduction: baseMultiplier * 0.5,
        waterSaved: baseMultiplier * 2000,
        treesPlanted: baseMultiplier * 5
      };
    case 'sustainable_agriculture':
      return {
        carbonReduction: baseMultiplier * 1.5,
        waterSaved: baseMultiplier * 1000,
        treesPlanted: baseMultiplier * 15
      };
    case 'green_buildings':
      return {
        carbonReduction: baseMultiplier * 3,
        waterSaved: baseMultiplier * 800,
        treesPlanted: baseMultiplier * 8
      };
    default:
      return {
        carbonReduction: baseMultiplier,
        waterSaved: baseMultiplier * 1000,
        treesPlanted: baseMultiplier * 10
      };
  }
}

// Helper function to calculate impact score
function calculateImpactScore(esgScore, impactMetrics) {
  // Weight ESG score and impact metrics
  const esgWeight = 0.4;
  const impactWeight = 0.6;

  // Normalize impact metrics to 0-100 scale
  const normalizedCarbon = Math.min(impactMetrics.carbonReduction / 10, 100);
  const normalizedWater = Math.min(impactMetrics.waterSaved / 5000, 100);
  const normalizedTrees = Math.min(impactMetrics.treesPlanted / 100, 100);

  const averageImpact = (normalizedCarbon + normalizedWater + normalizedTrees) / 3;

  // Calculate final score
  return Math.round((esgScore * esgWeight) + (averageImpact * impactWeight));
}

module.exports = router; 