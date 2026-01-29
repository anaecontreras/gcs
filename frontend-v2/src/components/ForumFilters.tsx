'use client';

import { useState } from 'react';

interface Props {
  categorias: string[];
  onFilterByCategory: (categoria: string) => void;
  onReset: () => void;
}

export default function ForumFilters({
  categorias,
  onFilterByCategory,
  onReset
}: Props) {
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleCategoryChange = (categoria: string) => {
    setSelectedCategory(categoria);
    onFilterByCategory(categoria);
  };

  const handleReset = () => {
    setSelectedCategory('');
    onReset();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Filtrar por categoría</h3>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={handleReset}
          className={`px-4 py-2 rounded-md transition-colors ${
            selectedCategory === ''
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Todas
        </button>

        {categorias.map((categoria) => (
          <button
            key={categoria}
            onClick={() => handleCategoryChange(categoria)}
            className={`px-4 py-2 rounded-md transition-colors ${
              selectedCategory === categoria
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {categoria}
          </button>
        ))}
      </div>
    </div>
  );
}