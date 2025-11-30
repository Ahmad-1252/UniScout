// Button Component
export const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  disabled = false,
  fullWidth = false,
  className = "",
}) => {
  const baseStyles =
    "px-4 py-2 rounded-full font-bold text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-[#D26E1E] text-white hover:bg-[#8C3C0A] active:bg-[#6b2d07]",
    secondary:
      "bg-transparent border border-[#D26E1E] text-[#D26E1E] hover:bg-[#D26E1E] hover:text-white",
    outline:
      "bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-50",
    google:
      "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? "w-full" : ""
        } ${className}`}
    >
      {children}
    </button>
  );
};

// Input Component
export const Input = ({
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  disabled = false,
  className = "",
  ...props
}) => {
  return (
    <div className="w-full">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`w-full px-4 py-3 rounded border ${error
          ? "border-red-500 focus:border-red-500"
          : "border-gray-300 focus:border-[#D26E1E]"
          } bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 transition-all disabled:bg-gray-100 disabled:cursor-not-allowed ${className}`}
        style={{ color: '#1f2937', WebkitTextFillColor: '#1f2937' }}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

// Card Component
export const Card = ({ children, className = "" }) => {
  return (
    <div
      className={`bg-white border border-gray-200 rounded-2xl shadow-xl ${className}`}
    >
      {children}
    </div>
  );
};

// Alert Component
export const Alert = ({ type = "info", message, onClose }) => {
  const types = {
    success:
      "bg-green-50 border-green-200 text-green-800",
    error:
      "bg-red-50 border-red-200 text-red-800",
    info: "bg-blue-50 border-blue-200 text-blue-800",
    warning:
      "bg-yellow-50 border-yellow-200 text-yellow-800",
  };

  return (
    <div
      className={`p-4 rounded border ${types[type]} flex justify-between items-center`}
    >
      <span className="text-sm">{message}</span>
      {onClose && (
        <button onClick={onClose} className="ml-4 font-bold hover:opacity-70">
          ×
        </button>
      )}
    </div>
  );
};

// Loading Spinner
export const Spinner = ({ size = "md", className = "" }) => {
  const sizes = {
    sm: "w-4 h-4 border-2",
    md: "w-8 h-8 border-3",
    lg: "w-12 h-12 border-4",
  };

  return (
    <div
      className={`${sizes[size]} border-gray-200 border-t-[#D26E1E] rounded-full animate-spin ${className}`}
    ></div>
  );
};

// Link Component
export const Link = ({ href, children, className = "" }) => {
  return (
    <a
      href={href}
      className={`text-[#D26E1E] hover:underline text-sm ${className}`}
    >
      {children}
    </a>
  );
};

// Divider Component
export const Divider = ({ text, className = "" }) => {
  return (
    <div className={`flex items-center my-4 ${className}`}>
      <div className="flex-1 border-t border-gray-300"></div>
      {text && (
        <span className="px-4 text-sm text-gray-500">
          {text}
        </span>
      )}
      <div className="flex-1 border-t border-gray-300"></div>
    </div>
  );
};

// Toast Component - for notifications
export { Toast, ToastContainer } from "./Toast";

// Label Component
export const Label = ({ htmlFor, children, className = "" }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`text-sm font-medium text-gray-700 ${className}`}
    >
      {children}
    </label>
  );
};

// Card Sub-components
export const CardContent = ({ children, className = "" }) => {
  return (
    <div className={`p-6 ${className}`}>
      {children}
    </div>
  );
};

export const CardDescription = ({ children, className = "" }) => {
  return (
    <p className={`text-sm text-gray-500 ${className}`}>
      {children}
    </p>
  );
};

export const CardHeader = ({ children, className = "" }) => {
  return (
    <div className={`p-6 pb-0 ${className}`}>
      {children}
    </div>
  );
};

export const CardTitle = ({ children, className = "" }) => {
  return (
    <h3 className={`text-lg font-semibold text-gray-900 ${className}`}>
      {children}
    </h3>
  );
};

export const CardFooter = ({ children, className = "" }) => {
  return (
    <div className={`p-6 pt-0 ${className}`}>
      {children}
    </div>
  );
};
