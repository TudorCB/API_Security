const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { fetchMetrics, updateDashboard } = require('../services/istioService');

router.get('/metrics', authMiddleware, async (req, res) => {
    try {
        console.log('Fetching metrics with query:', req.query.query);
        const metrics = await fetchMetrics(req.query.query);
        res.json(metrics);
    } catch (error) {
        console.error('Error fetching metrics:', error.message, error.stack);
        res.status(500).json({ error: error.message });
    }
});

router.put('/dashboard/:id', authMiddleware, async (req, res) => {
    try {
        console.log('Updating dashboard with ID:', req.params.id, 'and settings:', req.body);
        const updated = await updateDashboard(req.params.id, req.body);
        res.json(updated);
    } catch (error) {
        console.error('Error updating Grafana dashboard:', error.message, error.stack);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;