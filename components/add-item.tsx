import React, { useState } from 'react';

const AddItemForm = ({ addItem }: { addItem: (name: string, quantity: number) => void }) => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (quantity < 1) {
      setError('Quantity must be greater than 0');
      return;
    }
    addItem(name, quantity);
    setName('');
    setQuantity(1);
    setError('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="flex flex-col space-y-2">
        <div className="flex space-x-4">
          <input 
            type="text" 
            className="p-2 border border-gray-300 rounded w-1/2" 
            placeholder="Item Name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
          <input 
            type="number" 
            className="p-2 border border-gray-300 rounded w-1/4" 
            placeholder="Quantity" 
            value={quantity} 
            onChange={(e) => setQuantity(Number(e.target.value))} 
            required 
            min="1"
          />
          <button type="submit" className="btn-primary w-1/4">Add Item</button>
        </div>
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </form>
  );
};

export default AddItemForm;