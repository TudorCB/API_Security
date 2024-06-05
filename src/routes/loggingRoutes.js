const express = require('express');
const { authMiddleware } = require('../middleware/authMiddleware');
const logger = require('../services/logstashService');

const router = express.Router();

router.post('/config', authMiddleware, (req, res) => {
  const { source, level } = req.body;
  // Implement logic to update log source and level
  try {
    // Validate input
    if (!source || !level) {
      throw new Error('Source and level are required fields');
    }

    // Update log configuration
    logger.info(`Updating log configuration for source: ${source}, level: ${level}`);

    // Simulate configuration update
    // In a real-world scenario, you would interact with a database or configuration service here

    res.status(200).json({ message: 'Log configuration updated' });
  } catch (error) {
    logger.error(`Error updating log configuration: ${error.message}\n${error.stack}`);
    res.status(500).json({ message: 'Error updating log configuration' });
  }
});

module.exports = router;