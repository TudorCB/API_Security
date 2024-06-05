const axios = require('axios');
const { prometheusUrl, grafanaUrl } = process.env;

async function fetchMetrics(query) {
    try {
        console.log(`Fetching metrics for query: ${query}`);
        const response = await axios.get(`${prometheusUrl}/api/v1/query?query=${query}`);
        console.log('Metrics fetched successfully');
        return response.data;
    } catch (error) {
        console.error('Error fetching metrics:', error.message, error.stack);
        throw error;
    }
}

async function updateDashboard(dashboardId, settings) {
    try {
        console.log(`Updating dashboard ${dashboardId} with settings:`, settings);
        const response = await axios.put(`${grafanaUrl}/api/dashboards/db/${dashboardId}`, settings);
        console.log('Dashboard updated successfully');
        return response.data;
    } catch (error) {
        console.error('Error updating Grafana dashboard:', error.message, error.stack);
        throw error;
    }
}

module.exports = { fetchMetrics, updateDashboard };