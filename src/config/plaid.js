const { Configuration, PlaidApi, PlaidEnvironments } = require('plaid');

const configuration = new Configuration({
  basePath: PlaidEnvironments[process.env.PLAID_ENV || 'sandbox'],
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID,
      'PLAID-SECRET': process.env.PLAID_SECRET,
      'Plaid-Version': '2020-09-14',
    },
  },
});

const plaidClient = new PlaidApi(configuration);

// OAuth redirect URI configuration
const oauthConfig = {
  redirectUri: process.env.PLAID_OAUTH_REDIRECT_URI || 'http://localhost:3000/oauth.html',
  androidPackageName: process.env.PLAID_ANDROID_PACKAGE_NAME,
};

module.exports = { plaidClient, oauthConfig }; 