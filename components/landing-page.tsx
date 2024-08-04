"use client";

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { FaCircleUser } from 'react-icons/fa6';

const LandingPage = () => {
  const { user, signOut } = useAuth();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-200">
      <header className="w-full p-4 flex justify-between items-center bg-white shadow-md">
        <h1 className="text-2xl font-bold">Inventory Manager</h1>
        <div className="flex items-center space-x-4">
          {!user ? (
            <Link href="/sign-in">
              <button className="btn-primary">Sign In</button>
            </Link>
          ) : (
            <>
              <Link href="/dashboard">
                <button className="btn-primary">Dashboard</button>
              </Link>
              <button 
                className="ml-4 w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center"
                onClick={signOut}
              >
                <FaCircleUser size={25} />
              </button>
            </>
          )}
        </div>
      </header>
      <main className="flex-grow flex flex-col items-center justify-center p-4">
        <h2 className="text-5xl font-bold mb-4">Welcome to Inventory Manager</h2>
        <p className="text-lg mb-10 text-center">Manage your inventory with ease. Add, remove, update, and search through your items efficiently.</p>
        <div className="flex space-x-4">
          <Link href={!user ? "/sign-up" : "/dashboard"}>
            <button className="btn-secondary mb-8">Get Started</button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-4 bg-white shadow rounded-lg">
            <h3 className="text-xl text-center font-semibold mb-2">Easy Inventory Management</h3>
            <p>Quickly add, remove, and update items in your pantry. Our user-friendly interface makes it simple to keep your pantry organized and up-to-date.</p>
          </div>
          <div className="p-4 bg-white shadow rounded-lg">
            <h3 className="text-xl text-center font-semibold mb-2">Smart Search and Filter</h3>
            <p>Find what you need in seconds with our smart search and filter options. Easily locate, view, and manage your pantry efficiently.</p>
          </div>
          <div className="p-4 bg-white shadow rounded-lg">
            <h3 className="text-xl text-center font-semibold mb-2">Generate Fascinating Recipes</h3>
            <p>Get inspired with our recipe generator. Using the ingredients in your pantry, we&apos;ll suggest delicious recipes you can make right now.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;