// components/Filters.tsx
import React from 'react';
import { Search, Filter } from 'lucide-react';
import { getTranslation } from '../utils/translations';

interface FiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedFamily: string;
  setSelectedFamily: (family: string) => void;
  sortBy: 'nameAsc' | 'nameDesc' | 'familyAsc' | 'yearAsc' | 'yearDesc' | 'genusAsc' | 'genusDesc';
  setSortBy: (sortBy: 'nameAsc' | 'nameDesc' | 'familyAsc' | 'yearAsc' | 'yearDesc' | 'genusAsc' | 'genusDesc') => void;
  families: string[];
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
  darkMode: boolean;
  language?: 'en' | 'es';
}

const Filters: React.FC<FiltersProps> = ({
  searchTerm,
  setSearchTerm,
  selectedFamily,
  setSelectedFamily,
  sortBy,
  setSortBy,
  families,
  showFilters,
  setShowFilters,
  darkMode,
  language = 'es'
}) => {
  const t = getTranslation(language);
  const textSecondary = darkMode ? 'text-gray-400' : 'text-gray-600';
  const borderColor = darkMode ? 'border-gray-700' : 'border-emerald-200';
  const inputBg = darkMode ? 'bg-gray-700' : 'bg-white';
  const textColor = darkMode ? 'text-gray-100' : 'text-gray-900';

  return (
    <div className="flex flex-col lg:flex-row gap-4 mb-6">
      <div className="flex-1 relative">
        <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${textSecondary} w-5 h-5`} />
        <input
          type="text"
          placeholder={t.search}
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className={`w-full pl-10 pr-4 py-3 rounded-lg border ${borderColor} ${inputBg} ${textColor} focus:outline-none focus:ring-2 focus:ring-emerald-500`}
        />
      </div>
      <button
        onClick={() => setShowFilters(!showFilters)}
        className={`lg:hidden px-4 py-3 rounded-lg ${inputBg} ${textColor} border ${borderColor} flex items-center gap-2 justify-center`}
      >
        <Filter className="w-5 h-5" />
        {t.filter}
      </button>
      <div className={`${showFilters ? 'flex' : 'hidden'} lg:flex flex-col sm:flex-row gap-4`}>
        <select
          value={selectedFamily}
          onChange={e => setSelectedFamily(e.target.value)}
          className={`px-4 py-3 rounded-lg border ${borderColor} ${inputBg} ${textColor} focus:outline-none focus:ring-2 focus:ring-emerald-500`}
        >
          <option value="all">{t.allFamilies}</option>
          {families.map(f => (
            <option key={f} value={f}>{f}</option>
          ))}
        </select>
        <select
          value={sortBy}
          onChange={e => setSortBy(e.target.value as any)} // Cast para evitar error de tipo
          className={`px-4 py-3 rounded-lg border ${borderColor} ${inputBg} ${textColor} focus:outline-none focus:ring-2 focus:ring-emerald-500`}
        >
          <option value="nameAsc">{t.nameAsc}</option>
          <option value="nameDesc">{t.nameDesc}</option>
          <option value="familyAsc">{t.familyAsc}</option>
          <option value="genusAsc">{t.genusAsc || "Genus A-Z"}</option>
          <option value="genusDesc">{t.genusDesc || "Genus Z-A"}</option>
          <option value="yearAsc">{t.yearAsc}</option>
          <option value="yearDesc">{t.yearDesc}</option>
        </select>
      </div>
    </div>
  );
};

export default Filters;