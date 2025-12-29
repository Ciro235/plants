// components/Pagination.tsx
import React from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
  darkMode: boolean;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  setCurrentPage,
  darkMode
}) => {
  const cardBg = darkMode ? 'bg-gray-800' : 'bg-white';
  const textColor = darkMode ? 'text-gray-100' : 'text-gray-900';
  const borderColor = darkMode ? 'border-gray-700' : 'border-emerald-200';
  const activeBg = 'bg-emerald-600';
  const activeText = 'text-white';

  const getPageNumbers = () => {
  const pages: number[] = [];
  
  // Siempre mostrar la página actual
  pages.push(currentPage);
  
  // Agregar página anterior si existe
  if (currentPage > 0) {
    pages.unshift(currentPage - 1);
  }
  
  // Agregar las 2 páginas siguientes si existen
  for (let i = 1; i <= 2; i++) {
    if (currentPage + i < totalPages) {
      pages.push(currentPage + i);
    }
  }
  
  // Limitar a máximo 4 páginas (anterior + actual + 2 siguientes)
  return pages.slice(0, 3);
};



  if (totalPages <= 1) return null;

  return (
    <div className="flex flex-col items-center gap-4 pb-8">
  {/* Información de página - arriba */}
  <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
    Page {currentPage + 1} of {totalPages}
  </div>
  
  {/* Controles de paginación - abajo */}
  <div className="flex items-center justify-center gap-2">
    {/* Primer página */}
    <button
      onClick={() => setCurrentPage(0)}
      disabled={currentPage === 0}
      className={`p-2 rounded-lg ${cardBg} ${textColor} border ${borderColor} 
        ${currentPage === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-emerald-100 dark:hover:bg-gray-700'}
        transition-colors shadow-sm`}
      title="First page"
    >
      <ChevronsLeft className="w-5 h-5" />
    </button>
    
    {/* Página anterior */}
    <button
      onClick={() => setCurrentPage(currentPage - 1)}
      disabled={currentPage === 0}
      className={`p-2 rounded-lg ${cardBg} ${textColor} border ${borderColor} 
        ${currentPage === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-emerald-100 dark:hover:bg-gray-700'}
        transition-colors shadow-sm`}
      title="Previous page"
    >
      <ChevronLeft className="w-5 h-5" />
    </button>
    
    {/* Números de página */}
    <div className="flex items-center gap-1">
      {getPageNumbers().map(pageIndex => (
        <button
          key={pageIndex}
          onClick={() => setCurrentPage(pageIndex)}
          className={`w-9 h-9 text-sm font-medium rounded-lg transition-colors ${
            currentPage === pageIndex
              ? `${activeBg} ${activeText}`
              : `${cardBg} ${textColor} border ${borderColor} hover:bg-emerald-100 dark:hover:bg-gray-700`
          }`}
        >
          {pageIndex + 1}
        </button>
      ))}
    </div>
    
    {/* Siguiente página */}
    <button
      onClick={() => setCurrentPage(currentPage + 1)}
      disabled={currentPage === totalPages - 1}
      className={`p-2 rounded-lg ${cardBg} ${textColor} border ${borderColor} 
        ${currentPage === totalPages - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-emerald-100 dark:hover:bg-gray-700'}
        transition-colors shadow-sm`}
      title="Next page"
    >
      <ChevronRight className="w-5 h-5" />
    </button>
    
    {/* Última página */}
    <button
      onClick={() => setCurrentPage(totalPages - 1)}
      disabled={currentPage === totalPages - 1}
      className={`p-2 rounded-lg ${cardBg} ${textColor} border ${borderColor} 
        ${currentPage === totalPages - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-emerald-100 dark:hover:bg-gray-700'}
        transition-colors shadow-sm`}
      title="Last page"
    >
      <ChevronsRight className="w-5 h-5" />
    </button>
  </div>
</div>
  );
};

export default Pagination;