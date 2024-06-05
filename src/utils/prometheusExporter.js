const prometheus = require('prom-client');

const register = new prometheus.Registry();

const collectDefaultMetrics = prometheus.collectDefaultMetrics;
collectDefaultMetrics({ register });

const prometheusExporter = (req, res) => {
  try {
    const metrics = register.metrics();
    res.setHeader('Content-Type', register.contentType);
    res.send(metrics);
  } catch (err) {
    res.status(500).send({ error: err.toString() });
  }
};

module.exports = prometheusExporter;