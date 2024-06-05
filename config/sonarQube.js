const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  sonarQubeToken: process.env.SONARQUBE_TOKEN,
  sonarQubeUrl: process.env.SONARQUBE_URL,
};