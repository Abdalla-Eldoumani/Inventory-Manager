"use client";

import DashboardSkeleton from '@/components/dashboard-skeleton';
import { toast } from 'react-hot-toast';
import React, { useState, useEffect, useRef } from 'react';
import DashboardHeader from '@/components/dashboard-header';
import RecipeModal from '@/components/recipe-modal';
import SearchBar from '@/components/search-bar';
import AddItemForm from '@/components/add-item';
import AddItemCamera from '@/components/add-item-camera';
import InventoryList from '@/components/inventory-list';
import { useAuth } from '@/context/AuthContext';
import EditItemForm from '@/components/edit-item';
import ProtectedRoute from '@/components/protected-route';
import { useRouter } from 'next/navigation';
import { addItemToFirestore, getItemsFromFirestore, updateItemInFirestore, deleteItemFromFirestore } from '@/lib/firestore';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [isRecipeModalOpen, setRecipeModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [items, setItems] = useState<Array<{ id: string, name: string, quantity: number }>>([]);
  const [isFormVisible, setFormVisible] = useState(true);
  const [editItemData, setEditItemData] = useState<{ id: string, name: string, quantity: number } | null>(null);
  const cameraRef = useRef<{ stopCamera: () => void } | null>(null);

  useEffect(() => {
    if (user) {
      getItemsFromFirestore(user.uid).then(setItems);
    }
  }, [user]);

  const addItem = async (name: string, quantity: number) => {
    try {
      if (user) {
        const existingItem = items.find(item => item.name.toLowerCase() === name.toLowerCase());
        if (existingItem) {
          const updatedQuantity = existingItem.quantity + quantity;
          await updateItemInFirestore(existingItem.id, existingItem.name, updatedQuantity);
          const updatedItems = items.map(item => item.id === existingItem.id ? { ...item, quantity: updatedQuantity } : item);
          setItems(updatedItems);
          toast.success('Item updated');
        } else {
          const docRef = await addItemToFirestore(user.uid, name, quantity);
          const newItem = { id: docRef.id, name, quantity };
          setItems([...items, newItem]);
          toast.success('Item added');
        }
      }
    } catch (error) {
      toast.error('Error adding item');
      console.error('Error adding item:', error);
    }
  };

  const editItem = async (id: string, name: string, quantity: number) => {
    try {
      await updateItemInFirestore(id, name, quantity);
      const updatedItems = items.map(item => item.id === id ? { ...item, name, quantity } : item);
      setItems(updatedItems);
      setEditItemData(null);
      toast.success('Item updated');
    } catch (error) {
      toast.error('Error updating item');
      console.error('Error updating item:', error);
    }

  };

  const removeItem = async (id: string) => {
    try {
      await deleteItemFromFirestore(id);
      const updatedItems = items.filter(item => item.id !== id);
      setItems(updatedItems);
      toast.success('Item removed');
    } catch (error) {
      toast.error('Error removing item');
      console.error('Error removing item:', error);
    }

  };

  const startEditingItem = (id: string, name: string, quantity: number) => {
    setEditItemData({ id, name, quantity });
  };

  const toggleFormVisibility = (visible: boolean) => {
    if (!visible && cameraRef.current) {
      cameraRef.current.stopCamera();
    }
    setFormVisible(visible);
  };

  const ingredients = items.map(item => item.name);

  // const checkUser = () => {
  //   if (!user) {
  //     router.push('/sign-in');
  //   }
  // }

  return (
    <>
      <ProtectedRoute>
        <DashboardHeader openRecipeModal={() => setRecipeModalOpen(true)} />
        <RecipeModal isOpen={isRecipeModalOpen} onClose={() => setRecipeModalOpen(false)} ingredients={ingredients} />
        <div className="p-4">
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          <div className="flex space-x-4 mb-4">
            <button className={`btn-secondary ${isFormVisible ? 'bg-blue-500' : ''}`} onClick={() => toggleFormVisibility(true)}>Add Using Form</button>
            <button className={`btn-secondary ${!isFormVisible ? 'bg-blue-500' : ''}`} onClick={() => toggleFormVisibility(false)}>Add Using Camera</button>
          </div>
          {isFormVisible ? <AddItemForm addItem={addItem} /> : <AddItemCamera addItem={addItem} ref={cameraRef} />}
          <InventoryList items={items} editItem={startEditingItem} removeItem={removeItem} searchQuery={searchQuery} />
          {editItemData && (
            <div className="mt-4">
              <EditItemForm
                item={editItemData}
                editItem={editItem}
                cancelEdit={() => setEditItemData(null)}
              />
            </div>
          )}
        </div>
      </ProtectedRoute>
    </>
  );
};

export default Dashboard;