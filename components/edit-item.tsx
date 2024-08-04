import React, { useState } from 'react';

const EditItemForm = ({ item, editItem, cancelEdit }: { item: { id: string, name: string, quantity: number }, editItem: (id: string, name: string, quantity: number) => void, cancelEdit: () => void }) => {
  const [name, setName] = useState(item.name);
  const [quantity, setQuantity] = useState(item.quantity);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (quantity < 1) {
      setError('Quantity must be greater than 0');
      return;
    }
    editItem(item.id, name, quantity);
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
          <button type="submit" className="btn-primary w-1/4">Save</button>
          <button type="button" className="btn-secondary w-1/4" onClick={cancelEdit}>Cancel</button>
        </div>
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </form>
  );
};

export default EditItemForm;