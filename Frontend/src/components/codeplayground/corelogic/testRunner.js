export async function runTestcases(executor, code, testcases) {
  const results = [];

  for (const tc of testcases) {
    const res = await executor(code, tc.input);

    // Normalize output for comparison
    let got;
    let displayGot; // This will store the original value for display
    if (Array.isArray(res)) {
      got = res[0]; // for Python runner
      displayGot = got; // keep original for panel
    } else {
      got = res.output ?? res.error;
      displayGot = got;
    }

    // Convert booleans to lowercase strings for comparison
    let gotForComparison = got;
    if (typeof gotForComparison === "boolean")
      gotForComparison = gotForComparison ? "true" : "false";
    if (typeof gotForComparison === "string")
      gotForComparison = gotForComparison.trim();

    const pass = gotForComparison === tc.expected.toString().trim();

    results.push({
      input: tc.input,
      expected: tc.expected,
      got: displayGot, // original value to show in panel
      pass,
    });
  }

  return results;
}
