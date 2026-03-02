export default function TestcasePanel({ results }) {
  console.log(results);
  return (
    <div className="p-3 text-sm text-white">
      {results.map((r, i) => (
        <div
          key={i}
          className="mb-3 p-2 bg-gray-800 rounded border border-gray-600"
        >
          <p>
            <strong>Input:</strong> {r.input}
          </p>
          <p>
            <strong>Expected:</strong> {r.expected}
          </p>
          <p>
            <strong>Got:</strong>{" "}
            {typeof r.got === "object"
              ? JSON.stringify(r.got)
              : r.got.toString()}
          </p>

          <p
            className={`font-bold ${
              r.pass ? "text-green-400" : "text-red-400"
            }`}
          >
            {r.pass ? "PASS" : "FAIL"}
          </p>
        </div>
      ))}
    </div>
  );
}
