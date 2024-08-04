import React from 'react';

const InventoryList = ({ items, editItem, removeItem }: { items: Array<{ id: string, name: string, quantity: number }>, editItem: (id: string, name: string, quantity: number) => void, removeItem: (id: string) => void }) => {
  return (
    <div>
      {items.map(item => (
        <div key={item.id} className="flex justify-between items-center p-2 border-b border-gray-200">
          <div>
            <span className="font-semibold">{item.name}</span>
            <span className="ml-2 text-gray-500">x{item.quantity}</span>
          </div>
          <div>
            <button onClick={() => editItem(item.id, item.name, item.quantity)} className="mr-2 text-blue-500">Edit</button>
            <button onClick={() => removeItem(item.id)} className="text-red-500">Remove</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InventoryList;