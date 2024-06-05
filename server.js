const express = require('express');
const connectDB = require('./config/db');
const apiSpecificationsRoutes = require('./routes/apiSpecifications');
const vulnerabilitiesRoutes = require('./routes/vulnerabilities');
const authMiddleware = require('./middleware/authMiddleware');
const snykRoutes = require('./routes/snykRoutes');
const sastRoutes = require('./routes/sastRoutes');
const monitoringRoutes = require('./routes/monitoringRoutes');
const istioRoutes = require('./routes/istioRoutes');
const loggingRoutes = require('./src/routes/loggingRoutes');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Define routes
app.use('/api/specifications', apiSpecificationsRoutes);
app.use('/api/vulnerabilities', authMiddleware, vulnerabilitiesRoutes);
app.use('/api/snyk', authMiddleware, snykRoutes);
app.use('/api/sast', authMiddleware, sastRoutes);
app.use('/api/monitoring', authMiddleware, monitoringRoutes);
app.use('/api/istio', authMiddleware, istioRoutes);
app.use('/api/logging', authMiddleware, loggingRoutes);

const PORT = process.env.PORT || 5003;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});