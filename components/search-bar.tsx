import React from 'react';

const SearchBar = ({ searchQuery, setSearchQuery }: { searchQuery: string, setSearchQuery: (query: string) => void }) => {
  return (
    <div className="mb-4">
      <input 
        type="text" 
        className="w-full p-2 border border-gray-300 rounded" 
        placeholder="Search ingredients..." 
        value={searchQuery} 
        onChange={(e) => setSearchQuery(e.target.value)} 
      />
    </div>
  );
};

export default SearchBar;