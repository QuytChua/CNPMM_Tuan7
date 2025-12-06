import React from "react";

function ErrorScreen({ error }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-xl text-red-600">Lỗi: {error}</div>
    </div>
  );
}

export default ErrorScreen;
