export default function Panel({ children, className = "" }) {
  return (
    <div className={`h-full border border-gray-700 bg-gray-900 ${className}`}>
      {children}
    </div>
  );
}
