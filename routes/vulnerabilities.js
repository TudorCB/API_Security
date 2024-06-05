const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const Vulnerability = require('../models/Vulnerability');

// @route GET /api/vulnerabilities
// @desc Retrieve all vulnerabilities for the authenticated user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const vulnerabilities = await Vulnerability.find({ user: req.user.id }).populate('apiSpecification');
    res.json(vulnerabilities);
  } catch (err) {
    console.error('Error retrieving vulnerabilities:', err.message);
    res.status(500).send('Server Error');
  }
});

// @route POST /api/vulnerabilities
// @desc Create a new vulnerability report
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { apiSpecificationId, description, severity, remediation } = req.body;
    const newVulnerability = new Vulnerability({
      apiSpecification: apiSpecificationId,
      description,
      severity,
      remediation,
      user: req.user.id
    });
    const savedVulnerability = await newVulnerability.save();
    res.json(savedVulnerability);
  } catch (err) {
    console.error('Error creating vulnerability:', err.message);
    res.status(500).send('Server Error');
  }
});

// @route GET /api/vulnerabilities/filter
// @desc Retrieve filtered vulnerabilities for the authenticated user
router.get('/filter', authMiddleware, async (req, res) => {
  try {
    const { severity, date, specificVulnerability } = req.query;
    let query = { user: req.user.id };

    if (severity) {
      query.severity = severity;
    }
    if (date) {
      query.detectedAt = { $gte: new Date(date) };
    }
    if (specificVulnerability) {
      query.description = specificVulnerability;
    }

    const vulnerabilities = await Vulnerability.find(query).populate('apiSpecification');
    res.json(vulnerabilities);
  } catch (err) {
    console.error('Error filtering vulnerabilities:', err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;