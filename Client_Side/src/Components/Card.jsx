import React from "react";

export default function Card({
  title,
  description,
  icon = null,       // Optional icon component
  footer = null,     // Optional footer element
  className = "",    // Additional classes
}) {
  return (
    <div className={`bg-white rounded-xl shadow-lg p-6 flex flex-col justify-between hover:shadow-2xl transition-shadow ${className}`}>
      
      {/* Icon */}
      {icon && (
        <div className="text-red-600 text-3xl mb-4">
          {icon}
        </div>
      )}

      {/* Title */}
      {title && (
        <h3 className="text-xl font-bold mb-2 text-gray-800">
          {title}
        </h3>
      )}

      {/* Description */}
      {description && (
        <p className="text-gray-600 mb-4">
          {description}
        </p>
      )}

      {/* Footer */}
      {footer && (
        <div className="mt-auto">
          {footer}
        </div>
      )}
    </div>
  );
}
