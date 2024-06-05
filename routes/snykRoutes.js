const express = require('express');
const router = express.Router();
const Snyk = require('../src/services/snykService');

// @route POST /api/snyk/scan
// @desc Scan project dependencies using Snyk
router.post('/scan', async (req, res) => {
  try {
    const { projectId } = req.body;
    if (!projectId) {
      return res.status(400).json({ msg: 'Project ID is required' });
    }
    const results = await Snyk.scanDependencies(projectId);
    res.json(results);
  } catch (err) {
    console.error('Error scanning dependencies:', err.message, err.stack);
    res.status(500).send('Server Error');
  }
});

module.exports = router;