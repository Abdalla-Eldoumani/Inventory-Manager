import { db } from './firebase';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, where } from 'firebase/firestore';

const inventoryCollection = collection(db, 'inventory');

export const addItemToFirestore = async (userId: string, name: string, quantity: number) => {
  return await addDoc(inventoryCollection, {
    userId,
    name,
    quantity,
    createdAt: new Date(),
  });
};

export const getItemsFromFirestore = async (userId: string): Promise<Array<{ id: string; name: string; quantity: number }>> => {
  const q = query(inventoryCollection, where('userId', '==', userId));
  const querySnapshot = await getDocs(q);

  const items: Array<{ id: string; name: string; quantity: number }> = [];
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    items.push({ id: doc.id, name: data.name, quantity: data.quantity });
  });

  return items;
};

export const updateItemInFirestore = async (id: string, name: string, quantity: number) => {
  const itemDoc = doc(db, 'inventory', id);
  return await updateDoc(itemDoc, { name, quantity });
};

export const deleteItemFromFirestore = async (id: string) => {
  const itemDoc = doc(db, 'inventory', id);
  return await deleteDoc(itemDoc);
};
