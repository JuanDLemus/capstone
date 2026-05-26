const { execSync } = require('child_process');
const path = require('path');

async function run() {
  console.log("Starting Python Backend Custom Tests...");
  
  const backendDir = path.join(__dirname, '..', '..', '..', 'backend');
  
  try {
    console.log("  Running Pytest coverage suite...");
    execSync('python -m pytest --cov=app --cov-report=json tests/', { cwd: backendDir, stdio: 'inherit' });
  } catch (err) {
    throw new Error(`Python integration tests failed: ${err.message}`);
  }
}

module.exports = { name: "Python Backend Integrations (Phase 1-3)", run };
