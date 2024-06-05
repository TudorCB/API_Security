require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const apiSpecificationsRoutes = require('./routes/apiSpecifications');
const authMiddleware = require('./middleware/authMiddleware');
const { startScheduler } = require('./utils/scheduler');
const apiSecurityRoutes = require('./routes/apiSecurityRoutes');

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB Connected');
    startScheduler();
  })
  .catch(err => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });

app.use('/api/specifications', apiSpecificationsRoutes);
app.use('/api/security', apiSecurityRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));