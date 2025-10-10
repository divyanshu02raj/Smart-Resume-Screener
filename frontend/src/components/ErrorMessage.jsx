import React from 'react';

const ErrorMessage = ({ message }) => {
  if (!message) return null;

  return (
    <div className="mt-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg text-center">
      <p>{message}</p>
    </div>
  );
};

export default ErrorMessage;