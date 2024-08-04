import React from 'react';

const RecipeModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-2xl mb-4">Generate a Recipe</h2>
        <button className="btn-primary" onClick={onClose}>Generate a Recipe</button>
        <button className="mt-4 text-red-500" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default RecipeModal;