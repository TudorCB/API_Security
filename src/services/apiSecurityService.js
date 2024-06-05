const { runZapScan } = require('./zapService');
const ApiSpecification = require('../models/ApiSpecification');

async function scheduleZapScan(apiSpecificationId) {
    try {
        const apiSpecification = await ApiSpecification.findById(apiSpecificationId);
        if (!apiSpecification) {
            console.error(`API Specification with id ${apiSpecificationId} not found`);
            return;
        }
        await runZapScan(apiSpecification);
        console.log(`Scheduled ZAP scan for API Specification with id ${apiSpecificationId}`);
    } catch (err) {
        console.error('Error scheduling ZAP scan:', err.message);
        console.error(err.stack);
    }
}

module.exports = { scheduleZapScan };