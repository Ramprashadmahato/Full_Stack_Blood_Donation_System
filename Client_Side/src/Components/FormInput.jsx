import React from "react";

export default function FormInput({
  label,
  type = "text",
  placeholder = "",
  value,
  onChange,
  name,
  required = false,
  icon = null, // optional icon component
  className = "",
}) {
  return (
    <div className={`flex flex-col mb-4 ${className}`}>
      {label && <label className="mb-2 font-semibold text-gray-700">{label}</label>}
      
      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {icon}
          </span>
        )}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-500 transition-all ${
            icon ? "pl-10" : ""
          }`}
        />
      </div>
    </div>
  );
}
