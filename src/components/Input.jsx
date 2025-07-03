export function Input({ className = "", ...props }) {
    return (
      <input
        className={`rounded-xl px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${className}`}
        {...props}
      />
    );
  }
  