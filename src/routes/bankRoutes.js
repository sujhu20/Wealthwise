const express = require('express');
const router = express.Router();
const bankController = require('../controllers/bankController');
const auth = require('../middleware/auth');

// All routes require authentication
router.use(auth);

// Create link token for OAuth
router.post('/create-link-token', bankController.createLinkToken);

// Handle OAuth callback
router.post('/oauth', bankController.handleOAuth);

// Connect a bank account
router.post('/connect', bankController.connectBank);

// Disconnect a bank account
router.delete('/disconnect/:bankId', bankController.disconnectBank);

// Get connected bank accounts
router.get('/accounts', bankController.getConnectedBanks);

module.exports = router; 