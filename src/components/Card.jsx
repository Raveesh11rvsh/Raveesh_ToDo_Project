export function Card({ children, className = "" }) {
  return (
    <div className={`rounded-2xl shadow-sm border bg-white ${className}`}>
      {children}
    </div>
  );
}