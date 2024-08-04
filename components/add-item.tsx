import React, { useState } from 'react';

const AddItemForm = ({ addItem }: { addItem: (name: string, quantity: number) => void }) => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addItem(name, quantity);
    setName('');
    setQuantity(1);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="flex space-x-4">
        <input 
          type="text" 
          className="p-2 border border-gray-300 rounded" 
          placeholder="Item Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
        />
        <input 
          type="number" 
          className="p-2 border border-gray-300 rounded" 
          placeholder="Quantity" 
          value={quantity} 
          onChange={(e) => setQuantity(Number(e.target.value))} 
          required 
        />
        <button type="submit" className="btn-primary">Add Item</button>
      </div>
    </form>
  );
};

export default AddItemForm;