const axios = require('axios');
const config = require('../../config/sonarQube');

async function runSonarQubeAnalysis(projectKey, projectData) {
  try {
    console.log('Starting SonarQube analysis for project:', projectKey);

    const response = await axios.post(`${config.sonarQubeUrl}/api/projects/create`, {
      name: projectKey,
      qualifier: 'TRK',
    }, {
      headers: {
        'Authorization': `Bearer ${config.sonarQubeToken}`,
        'Content-Type': 'application/json'
      }
    });

    const projectUuid = response.data.project.key;
    console.log('Project UUID obtained:', projectUuid);

    await axios.post(`${config.sonarQubeUrl}/api/qualitygates/associate_with_project`, {
      project: projectUuid
    }, {
      headers: {
        'Authorization': `Bearer ${config.sonarQubeToken}`,
        'Content-Type': 'application/json'
      }
    });

    const analysisResultUrl = `${config.sonarQubeUrl}/dashboard?id=${projectUuid}`;
    console.log('Analysis result URL:', analysisResultUrl);
    return analysisResultUrl;
  } catch (error) {
    console.error('Error running SonarQube analysis:', error.message, error.stack);
    throw error;
  }
}

module.exports = {
  runSonarQubeAnalysis
};