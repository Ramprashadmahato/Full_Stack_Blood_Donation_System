import React from "react";

export default function Alert({ message, type }) {
  const bgColor = type === "error" ? "bg-red-500" : "bg-green-500";
  return (
    <div className={`${bgColor} text-white p-2 rounded my-2`}>
      {message}
    </div>
  );
}
