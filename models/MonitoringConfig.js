const mongoose = require('mongoose');

const MonitoringConfigSchema = new mongoose.Schema({
  prometheusUrl: {
    type: String,
    required: true,
  },
  grafanaUrl: {
    type: String,
    required: true,
  },
  alertRules: {
    type: [Object],
    default: [],
  },
  meshName: {
    type: String,
    required: true,
  },
  namespace: {
    type: String,
    required: true,
  },
  serviceAccount: {
    type: String,
    required: true,
  },
  customAlertRules: {
    type: [Object],
    default: [],
  },
  elkUrl: {
    type: String,
    required: true,
  },
  mongoUrl: {
    type: String,
    required:true
  },
  elkIndex: {
    type: String,
    required:true
  },
  mongoDbName:{
    type:String,
    required:true
  },
  mongoCollectionName:{
    type:String,
    required:true
  },
  prometheusMetrics: {
    type: [Object],
    default: [],
  },
  grafanaDashboards: {
    type: [Object],
    default: [],
  },
  istioSettings: {
    type: Object,
    default: {},
  },
});

const MonitoringConfig = mongoose.model('MonitoringConfig', MonitoringConfigSchema);

module.exports = MonitoringConfig;