const express = require('express');
const { prometheusMiddleware } = require('express-prometheus-middleware');
const jwt = require('jsonwebtoken');
const { prometheusExporter } = require('./utils/prometheusExporter');
const { grafanaExporter } = require('./utils/grafanaExporter');
const { istioExporter } = require('./utils/istioExporter');
const { elkExporter } = require('./utils/elkExporter');
const { mongoExporter } = require('./utils/mongoExporter');
const { configureMonitoring, manageAlertRules } = require('./controllers/monitoringController');
const { authenticateJWT } = require('./middleware/authMiddleware');

const app = express();

// Middleware for JWT authentication
app.use(authenticateJWT);

// Prometheus metrics middleware
app.use(prometheusMiddleware({
  metricsPath: '/metrics',
  collectDefaultMetrics: true,
  requestDurationMicroseconds: {
    buckets: [0.1, 0.5, 1, 2, 5, 10, 20, 30, 60, 120]
  }
}));

// Istio metrics endpoint
app.get('/api/monitoring/istio', istioExporter);

// Prometheus metrics endpoint
app.get('/api/monitoring/prometheus', prometheusExporter);

// Grafana metrics endpoint
app.get('/api/monitoring/grafana', grafanaExporter);

// ELK metrics endpoint
app.get('/api/monitoring/elk', elkExporter);

// MongoDB metrics endpoint
app.get('/api/monitoring/mongo', mongoExporter);

// Endpoint to configure monitoring settings
app.post('/api/monitoring/config', (req, res) => {
  configureMonitoring(req.body)
    .then(() => {
      console.log('Monitoring configuration updated successfully');
      res.status(200).json({ message: 'Monitoring configuration updated successfully' });
    })
    .catch(err => {
      console.error('Failed to update monitoring configuration', err);
      res.status(500).json({ message: 'Failed to update monitoring configuration', error: err.message });
    });
});

// Endpoint to manage custom alert rules
app.post('/api/monitoring/alert-rules', (req, res) => {
  manageAlertRules(req.body)
    .then(() => {
      console.log('Alert rules updated successfully');
      res.status(200).json({ message: 'Alert rules updated successfully' });
    })
    .catch(err => {
      console.error('Failed to update alert rules', err);
      res.status(500).json({ message: 'Failed to update alert rules', error: err.message });
    });
});

module.exports = app;