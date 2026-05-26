const autocannon = require('autocannon');
const assert = require('assert');

async function run() {
  console.log("Starting Dynamic Capacity Load Test...");
  console.log("We will incrementally increase concurrent users until the server exhibits >1% errors.\n");

  const levels = [10, 50, 100, 200, 500, 1000, 3000, 6000, 7000, 8000, 9000, 10000, 11000, 12000];
  let maxCapacity = 0;
  
  for (const connections of levels) {
    console.log(`[Testing Capacity] Concurrency: ${connections} users...`);
    
    const result = await autocannon({
      url: 'http://127.0.0.1:8000/openapi.json', // A public endpoint that doesn't require Auth
      connections: connections,
      pipelining: 1,
      duration: 3 // Keep it brief to not hang CI
    });
    
    if (result.requests.total === 0 && result.errors > 0) {
      console.warn("Backend server unreachable. Make sure it's running on port 8000.");
      break;
    }
    
    const errorRate = result.non2xx / result.requests.total;
    console.log(`  -> Handled ${result.requests.total} requests. Errors: ${result.non2xx} (${(errorRate * 100).toFixed(2)}%)`);
    
    if (errorRate > 0.01) {
      console.log(`\n[!] Capacity Limit Reached: The backend starts failing at ~${connections} concurrent users.`);
      break;
    }
    
    maxCapacity = connections;
  }
  
  console.log(`\nVerified Stable Capacity: ${maxCapacity} concurrent users.`);
  assert.ok(maxCapacity >= 10, "Server should be able to handle at least 10 concurrent users without errors.");
}

module.exports = { name: "Dynamic Capacity Breakpoint Tests", run };
