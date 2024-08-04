// ./app/(dashboard)/(routes)/dashboard/page.tsx
"use client";

import React, { useState, useEffect } from 'react';
import DashboardHeader from '@/components/dashboard-header';
import RecipeModal from '@/components/recipe-modal';
import SearchBar from '@/components/search-bar';
import AddItemForm from '@/components/add-item';
import AddItemCamera from '@/components/add-item-camera';
import InventoryList from '@/components/inventory-list';
import { useAuth } from '@/context/AuthContext';
import { addItemToFirestore, getItemsFromFirestore, updateItemInFirestore, deleteItemFromFirestore } from '@/lib/firestore';


const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [isRecipeModalOpen, setRecipeModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [items, setItems] = useState<Array<{ id: string, name: string, quantity: number }>>([]);

  useEffect(() => {
    if (user) {
      getItemsFromFirestore(user.uid).then(setItems);
    }
  }, [user]);

  const addItem = async (name: string, quantity: number) => {
    if (user) {
      const docRef = await addItemToFirestore(user.uid, name, quantity);
      const newItem = { id: docRef.id, name, quantity };
      setItems([...items, newItem]);
    }
  };

  const editItem = async (id: string, name: string, quantity: number) => {
    await updateItemInFirestore(id, name, quantity);
    const updatedItems = items.map(item => item.id === id ? { ...item, name, quantity } : item);
    setItems(updatedItems);
  };

  const removeItem = async (id: string) => {
    await deleteItemFromFirestore(id);
    const updatedItems = items.filter(item => item.id !== id);
    setItems(updatedItems);
  };

  return (
    <>
      <DashboardHeader openRecipeModal={() => setRecipeModalOpen(true)} />
      <RecipeModal isOpen={isRecipeModalOpen} onClose={() => setRecipeModalOpen(false)} />
      <div className="p-4">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <AddItemForm addItem={addItem} />
        <AddItemCamera />
        <InventoryList items={items} editItem={editItem} removeItem={removeItem} />
      </div>
    </>
  );
};

export default Dashboard;
