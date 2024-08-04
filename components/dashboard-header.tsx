"use client";

import { useAuth } from '@/context/AuthContext';
import { GiCook } from 'react-icons/gi';
import { FaCircleUser } from 'react-icons/fa6';
import { FaChrome } from 'react-icons/fa6';
import { ImExit } from 'react-icons/im';
import Link from 'next/link';

const DashboardHeader = ({ openRecipeModal }: { openRecipeModal: () => void }) => {
  const { user, signOut } = useAuth();

  return (
    <header className="w-full p-4 flex justify-between items-center bg-white shadow-md">
      <button className="ml-4 w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center" onClick={openRecipeModal}>
        <GiCook size={25} />
      </button>
      <h1 className="text-2xl font-bold">Inventory Management</h1>
      <Link href="/">
        <button 
            className="ml-4 w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center"
            onClick={signOut}
        >
            <ImExit size={25} />
        </button>
      </Link>
    </header>
  );
};

export default DashboardHeader;