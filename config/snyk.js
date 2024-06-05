const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  snykToken: process.env.SNYK_TOKEN,
};