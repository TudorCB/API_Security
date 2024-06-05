const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const SonarQube = require('../src/services/sonarQubeService');

// @route POST /api/sast/scan
// @desc Trigger SonarQube scan for static code analysis
router.post('/scan', authMiddleware, async (req, res) => {
  try {
    const { projectKey, projectData } = req.body;
    if (!projectKey || !projectData) {
      return res.status(400).json({ msg: 'Project key and data are required' });
    }
    const analysisResultUrl = await SonarQube.runSonarQubeAnalysis(projectKey, projectData);
    res.json({ analysisResultUrl });
  } catch (error) {
    console.error('Error triggering SonarQube scan:', error.message, error.stack);
    res.status(500).send('Server Error');
  }
});

module.exports = router;