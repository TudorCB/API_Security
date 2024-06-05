const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const GRAYLOG_URL = process.env.GRAYLOG_URL;

async function sendLog(logData) {
  try {
    await axios.post(`${GRAYLOG_URL}/gelf`, logData, {
      headers: { 'Content-Type': 'application/json' }
    });
    console.log('Log data sent to Graylog successfully');
  } catch (error) {
    console.error('Error sending log to Graylog:', error.message, error.stack);
  }
}

module.exports = { sendLog };