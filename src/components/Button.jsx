export function Button({ children, onClick, variant = "default", size = "default", className = "", ...props }) {
    const base = "rounded-xl px-4 py-2 font-medium transition";
    const variants = {
      default: "bg-indigo-600 text-white hover:bg-indigo-700",
      outline: "border border-indigo-600 text-indigo-600 hover:bg-indigo-50",
      ghost: "text-gray-600 hover:text-indigo-600",
    };
    const sizes = {
      default: "",
      icon: "p-2",
    };
  
    return (
      <button
        onClick={onClick}
        className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
  