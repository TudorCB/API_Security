const cron = require('node-cron');
const { runZapScan } = require('../services/zapService');
const ApiSpecification = require('../models/ApiSpecification');

async function startScheduler() {
    cron.schedule('*/10 * * * * *', async () => {
        try {
            const latestSpecs = await ApiSpecification.find({ lastScanned: null });
            for (const spec of latestSpecs) {
                try {
                    const apiSpecification = await ApiSpecification.findById(spec._id);
                    if (!apiSpecification) {
                        console.error(`API Specification with id ${spec._id} not found`);
                        continue;
                    }
                    await runZapScan(apiSpecification);
                    console.log(`Scheduled and completed ZAP scan for API Specification with id ${spec._id}`);
                    spec.lastScanned = new Date();
                    await spec.save();
                } catch (error) {
                    console.error('Error scheduling or executing ZAP scan:', error);
                    console.error(error.stack);
                }
            }
        } catch (error) {
            console.error('Error in scheduler:', error);
            console.error(error.stack);
        }
    });
}

// Call the scheduler to start scheduling ZAP scans
startScheduler();

module.exports = { startScheduler };