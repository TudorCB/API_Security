const axios = require('axios');
const config = require('../../config/snyk');

async function scanDependencies(projectId) {
  try {
    const response = await axios.post(`https://api.snyk.io/rest/orgs/${process.env.SNYK_ORG}/issues?version=2022-02-16~beta`, {
      data: {
        target: {
          type: 'project',
          id: projectId,
        },
      },
      auth: {
        username: 'oauth',
        password: config.snykToken,
      },
    });
    console.log('Dependency scan results:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error scanning dependencies:', error.message, error.stack);
    throw error;
  }
}

module.exports = {
  scanDependencies,
};