export default function OutputConsole({ output }) {
  // If output is a string, convert to array with single element
  const lines = Array.isArray(output) ? output : [output];
  // console.log(typeof output);
  // console.log("out", output);
  // lines.map((each) => console.log(each));

  return (
    <div className="p-3 h-full overflow-auto bg-black text-green-400 text-sm">
      {lines.map((line, index) => (
        <p key={index} className="m-0">
          {line}
        </p>
      ))}
    </div>
  );
}
