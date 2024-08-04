import React, { useState } from 'react';
import Modal from 'react-modal';
import { generateRecipe } from '@/lib/openai';

const RecipeModal = ({ isOpen, onClose, ingredients }: { isOpen: boolean, onClose: () => void, ingredients: string[] }) => {
  const [recipe, setRecipe] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateRecipe = async () => {
    setLoading(true);
    setRecipe(null);
    setError(null);
    try {
      const generatedRecipe = await generateRecipe(ingredients);
      if (generatedRecipe) {
        setRecipe(generatedRecipe);
      } else {
        setError('Failed to generate a recipe.');
      }
    } catch (err) {
      setError('Error generating recipe. Please try again.');
    }
    setLoading(false);
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="Generate Recipe">
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Generate Recipe</h2>
        <button onClick={handleGenerateRecipe} className="btn-primary mb-4" disabled={loading}>
          {loading ? 'Generating...' : 'Generate Recipe'}
        </button>
        {error && <p className="text-red-500">{error}</p>}
        {recipe && (
          <div>
            <h3 className="text-xl font-bold mb-2">Generated Recipe</h3>
            <p>{recipe}</p>
          </div>
        )}
        <button onClick={onClose} className="btn-secondary mt-4">Close</button>
      </div>
    </Modal>
  );
};

export default RecipeModal;