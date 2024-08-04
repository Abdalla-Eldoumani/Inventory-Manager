import React from 'react';
import Image from 'next/image';

const InventoryList = ({ items, editItem, removeItem, searchQuery }: { items: Array<{ id: string, name: string, quantity: number }>, editItem: (id: string, name: string, quantity: number) => void, removeItem: (id: string) => void, searchQuery: string }) => {
  const filteredItems = items.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));

  if (filteredItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center mt-10">
        <div className="relative w-64 h-64 mb-4">
          <Image src="/images/empty-inventory.png" layout="fill" objectFit="contain" alt="Empty Inventory" />
        </div>
        <p className="text-gray-500 text-lg">Nothing in inventory</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Item Name</th>
            <th className="py-2">Quantity</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.map(item => (
            <tr key={item.id} className="border-b">
              <td className="py-2">{item.name}</td>
              <td className="py-2 text-center">{item.quantity}</td>
              <td className="py-2 text-center">
                <button onClick={() => editItem(item.id, item.name, item.quantity)} className="text-blue-500 mr-2">Edit</button>
                <button onClick={() => removeItem(item.id)} className="text-red-500">Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryList;