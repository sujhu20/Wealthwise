const mongoose = require('mongoose');

const bankAccountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  itemId: {
    type: String,
    required: true,
  },
  accessToken: {
    type: String,
    required: true,
  },
  institutionId: {
    type: String,
    required: true,
  },
  institutionName: {
    type: String,
    required: true,
  },
  accounts: [{
    accountId: String,
    name: String,
    type: String,
    subtype: String,
    balance: {
      current: Number,
      available: Number,
      limit: Number,
    },
  }],
  lastSync: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('BankAccount', bankAccountSchema); 