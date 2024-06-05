const { spawn } = require('child_process');
const fs = require('fs');
const ApiSpecification = require('../models/ApiSpecification');
const ScanResult = require('../models/ScanResult'); // Assuming there's a ScanResult model

async function runZapScan(apiSpecification) {
    const zapProcess = spawn('zap.sh', ['-cmd', '-quickurl', apiSpecification.url, '-quickprogress']);

    zapProcess.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });

    zapProcess.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });

    zapProcess.on('close', async (code) => {
        if (code !== 0) {
            console.error(`ZAP process exited with code ${code}`);
            return;
        }
        console.log('ZAP scan completed');
        try {
            // Implement logic to retrieve scan results from ZAP
            const scanResults = await getScanResults(apiSpecification);

            // Store scan results in MongoDB
            const scanResult = new ScanResult({
                apiSpecification: apiSpecification._id,
                results: scanResults
            });
            await scanResult.save();
            console.log('Scan results stored in MongoDB');
        } catch (error) {
            console.error('Error storing scan results:', error);
            console.error(error.stack);
        }
    });
}

async function getScanResults(apiSpecification) {
    // Placeholder for actual implementation to retrieve scan results from ZAP
    // This function should be implemented to fetch the results from ZAP and return them
    // For now, it returns an empty array to avoid breaking the flow
    return [];
}

module.exports = { runZapScan, getScanResults };