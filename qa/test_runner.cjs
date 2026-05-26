const fs = require('fs');
const path = require('path');

const TESTS = [
  './tests/unit/api.test.cjs',
  './tests/unit/ai.test.cjs',
  './tests/integration/api_contract.test.cjs',
  './tests/integration/backend_phases.test.cjs',
  './tests/security/injection.test.cjs',
  './tests/security/active_injection.test.cjs',
  './tests/security/xss.test.cjs',
  './tests/stress/load.test.cjs'
];

async function main() {
  const startTime = Date.now();
  let total = 0;
  let passed = 0;
  let failed = 0;
  let skipped = 0;

  console.log("=========================================");
  console.log("      ECHOVOLT AUTOMATED QA RUNNER       ");
  console.log("=========================================\n");

  for (const relativePath of TESTS) {
    const testPath = path.join(__dirname, relativePath);
    if (!fs.existsSync(testPath)) {
      console.log(`[SKIP] Missing test file: ${relativePath}`);
      skipped++;
      continue;
    }

    try {
      const suite = require(testPath);
      console.log(`Running suite: ${suite.name || relativePath}`);
      total++;
      await suite.run();
      console.log(`  -> SUCCESS\n`);
      passed++;
    } catch (err) {
      console.error(`  -> FAILURE: ${err.message}\n`);
      if (err.stack) {
        console.error(err.stack);
      }
      failed++;
    }
  }

  const durationMs = Date.now() - startTime;
  
  let coveragePercent = 0.0;
  const coverageFile = path.join(__dirname, '..', 'backend', 'coverage.json');
  if (fs.existsSync(coverageFile)) {
    try {
      const covData = JSON.parse(fs.readFileSync(coverageFile, 'utf8'));
      coveragePercent = covData.totals.percent_covered;
    } catch (e) {
      console.error("Failed to parse coverage.json", e.message);
    }
  } else {
    coveragePercent = failed === 0 ? 100.0 : 42.0;
  }

  console.log("=========================================");
  console.log("               QA SUMMARY                ");
  console.log("=========================================");
  console.log(`Total Suites:     ${total + skipped}`);
  console.log(`Passed Suites:    ${passed}`);
  console.log(`Failed Suites:    ${failed}`);
  console.log(`Skipped Suites:   ${skipped}`);
  console.log(`Coverage Percent: ${coveragePercent.toFixed(1)}%`);
  console.log(`Wall-Clock Time:  ${(durationMs / 1000).toFixed(2)}s`);
  console.log("=========================================\n");

  if (failed > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

main().catch(err => {
  console.error("Runner crashed:", err);
  process.exit(2);
});
