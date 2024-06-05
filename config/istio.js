const { prometheus } = require('prom-client');
const axios = require('axios');
const express = require('express');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
  });

// JWT Middleware
const authMiddleware = (req, res, next) => {
  const token = req.header('x-auth-token');

  // Check for token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (e) {
    res.status(400).json({ msg: 'Token is not valid' });
  }
};

// Prometheus Metrics
const collectDefaultMetrics = prometheus.collectDefaultMetrics;
collectDefaultMetrics({ timeout: 10000 });

const istioMetrics = new prometheus.Gauge({
  name: 'istio_metrics',
  help: 'Metrics collected from Istio',
});

// Endpoint to configure Istio metrics collection
app.post('/api/monitoring/config', authMiddleware, async (req, res) => {
  const { prometheusUrl, grafanaUrl, alertRules } = req.body;

  if (!prometheusUrl || !grafanaUrl) {
    return res.status(400).json({ msg: 'Prometheus URL and Grafana URL are required' });
  }

  // Store configuration in MongoDB
  const IstioConfig = mongoose.model('IstioConfig', new mongoose.Schema({ prometheusUrl, grafanaUrl, alertRules }));
  try {
    await new IstioConfig({ prometheusUrl, grafanaUrl, alertRules }).save();
    console.log('Configuration saved successfully');
    res.json({ msg: 'Configuration saved' });
  } catch (err) {
    console.error('Failed to save configuration', err);
    res.status(500).json({ msg: 'Failed to save configuration', err });
  }
});

// Endpoint to collect Istio metrics
app.get('/api/monitoring/metrics', authMiddleware, async (req, res) => {
  try {
    const IstioConfig = mongoose.model('IstioConfig', new mongoose.Schema({ prometheusUrl: String, grafanaUrl: String, alertRules: Object }));
    const config = await IstioConfig.findOne();

    if (!config) {
      return res.status(404).json({ msg: 'Configuration not found' });
    }

    // Fetch metrics from Prometheus
    const response = await axios.get(config.prometheusUrl);
    const metrics = response.data;

    // Update Prometheus metrics
    istioMetrics.set(metrics);

    res.json({ metrics });
  } catch (err) {
    console.error('Failed to collect metrics', err);
    res.status(500).json({ msg: 'Failed to collect metrics', err });
  }
});

// Endpoint to manage Istio service mesh monitoring settings
app.post('/api/monitoring/settings', authMiddleware, async (req, res) => {
  const { meshName, namespace, serviceAccount, customAlertRules } = req.body;

  if (!meshName || !namespace || !serviceAccount) {
    return res.status(400).json({ msg: 'Mesh name, namespace, and service account are required' });
  }

  // Store settings in MongoDB
  const IstioSettings = mongoose.model('IstioSettings', new mongoose.Schema({ meshName, namespace, serviceAccount, customAlertRules }));
  try {
    await new IstioSettings({ meshName, namespace, serviceAccount, customAlertRules }).save();
    console.log('Monitoring settings saved successfully');
    res.json({ msg: 'Monitoring settings saved' });
  } catch (err) {
    console.error('Failed to save monitoring settings', err);
    res.status(500).json({ msg: 'Failed to save monitoring settings', err });
  }
});

const PORT = process.env.PORT || 5002;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));