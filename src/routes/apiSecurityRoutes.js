const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const ApiSpecification = require('../models/ApiSpecification');
const { getScanResults } = require('../services/apiSecurityService');

router.get('/scan-results/:id', authMiddleware, async (req, res) => {
    try {
        console.log('Attempting to retrieve API specification by ID:', req.params.id);
        const apiSpecification = await ApiSpecification.findById(req.params.id);
        if (!apiSpecification) {
            console.error('API Specification not found for ID:', req.params.id);
            return res.status(404).json({ msg: 'Specification not found' });
        }

        console.log('Retrieved API specification:', apiSpecification);
        const scanResults = await getScanResults(apiSpecification);
        if (!scanResults) {
            console.error('Scan results not found for API Specification:', apiSpecification);
            return res.status(404).json({ msg: 'Scan results not found' });
        }

        console.log('Successfully retrieved scan results for API Specification:', apiSpecification);
        res.json(scanResults);
    } catch (err) {
        console.error('Error retrieving scan results:', err);
        console.error(err.stack);
        res.status(500).json({ msg: 'Server Error' });
    }
});

module.exports = router;