import React from 'react';
import { X, GitCompare, Trash2 } from 'lucide-react';
import { Plant } from '../utils/plantTypes';
import { useAppContext } from '../context/AppContext';
import { getTranslation } from '../utils/translations';


interface CompareModalProps {
  show: boolean;
  onClose: () => void;
  comparePlants: Plant[];
  darkMode: boolean;
  language?: 'en' | 'es';
}

const CompareModal: React.FC<CompareModalProps> = ({
  show,
  onClose,
  comparePlants = [], // Valor por defecto
  darkMode,
  language = 'es'
}) => {
  const { dispatch } = useAppContext();
  const t = getTranslation(language); // Usar traducciones inline
  
  const cardBg = darkMode ? 'bg-gray-800' : 'bg-white';
  const textColor = darkMode ? 'text-gray-100' : 'text-gray-900';
  const textSecondary = darkMode ? 'text-gray-400' : 'text-gray-600';
  const borderColor = darkMode ? 'border-gray-700' : 'border-emerald-200';

  if (!show) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" 
      onClick={onClose}
    >
      <div 
        className={`${cardBg} rounded-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto`} 
        onClick={e => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-inherit p-6 border-b flex items-center justify-between">
          <h2 className={`text-2xl font-bold ${textColor} flex items-center gap-2`}>
            <GitCompare className="w-6 h-6 text-emerald-600" />
            {/* Usar valor por defecto si t es undefined */}
            {(t?.comparePlants || 'Compare Plants')} ({comparePlants.length})
          </h2>
          <div className="flex gap-2">
            {comparePlants.length > 0 && (
              <button
                onClick={() => dispatch({ type: 'CLEAR_COMPARE' })}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                {t?.clearComparison || 'Clear'}
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6">
          {!comparePlants || comparePlants.length === 0 ? (
            <div className="text-center py-12">
              <GitCompare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className={`text-xl ${textSecondary}`}>
                {t?.selectToCompare || 'Select 2-4 plants to compare'}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className={`border-b-2 ${borderColor}`}>
                    <th className={`p-4 text-left ${textColor} font-semibold`}>
                      {t?.scientificName || 'Scientific Name'}
                    </th>
                    {comparePlants.map(plant => (
                      <th key={plant.id} className="p-4">
                        <div className="flex flex-col items-center gap-2">
                          <img
                            src={plant.image_url}
                            alt={plant.scientific_name}
                            className="w-24 h-24 object-cover rounded-lg"
                          />
                          <button
                            onClick={() => dispatch({ type: 'TOGGLE_COMPARE', payload: plant.id })}
                            className="text-red-500 hover:text-red-600 text-sm"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className={`border-b ${borderColor}`}>
                    <td className={`p-4 font-semibold ${textColor}`}>
                      {t?.scientificName || 'Scientific Name'}
                    </td>
                    {comparePlants.map(plant => (
                      <td key={plant.id} className={`p-4 text-center ${textColor} italic`}>
                        {plant.scientific_name}
                      </td>
                    ))}
                  </tr>
                  <tr className={`border-b ${borderColor}`}>
                    <td className={`p-4 font-semibold ${textColor}`}>
                      {t?.commonName || 'Common Name'}
                    </td>
                    {comparePlants.map(plant => (
                      <td key={plant.id} className={`p-4 text-center ${textSecondary}`}>
                        {plant.common_name || '—'}
                      </td>
                    ))}
                  </tr>
                  <tr className={`border-b ${borderColor}`}>
                    <td className={`p-4 font-semibold ${textColor}`}>
                      {t?.family || 'Family'}
                    </td>
                    {comparePlants.map(plant => (
                      <td key={plant.id} className={`p-4 text-center ${textSecondary}`}>
                        {plant.family || '—'}
                      </td>
                    ))}
                  </tr>
                  <tr className={`border-b ${borderColor}`}>
                    <td className={`p-4 font-semibold ${textColor}`}>
                      {t?.genus || 'Genus'}
                    </td>
                    {comparePlants.map(plant => (
                      <td key={plant.id} className={`p-4 text-center ${textSecondary}`}>
                        {plant.genus || '—'}
                      </td>
                    ))}
                  </tr>
                  <tr className={`border-b ${borderColor}`}>
                    <td className={`p-4 font-semibold ${textColor}`}>
                      {t?.year || 'Year'}
                    </td>
                    {comparePlants.map(plant => (
                      <td key={plant.id} className={`p-4 text-center ${textSecondary}`}>
                        {plant.year || '—'}
                      </td>
                    ))}
                  </tr>
                  <tr className={`border-b ${borderColor}`}>
                    <td className={`p-4 font-semibold ${textColor}`}>
                      {t?.author || 'Author'}
                    </td>
                    {comparePlants.map(plant => (
                      <td key={plant.id} className={`p-4 text-center ${textSecondary}`}>
                        {plant.author || '—'}
                      </td>
                    ))}
                  </tr>
                  <tr className={`border-b ${borderColor}`}>
                    <td className={`p-4 font-semibold ${textColor}`}>
                      {t?.status || 'Status'}
                    </td>
                    {comparePlants.map(plant => (
                      <td key={plant.id} className="p-4 text-center">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            plant.status === 'accepted'
                              ? 'bg-emerald-500 text-white'
                              : 'bg-yellow-500 text-white'
                          }`}
                        >
                          {plant.status}
                        </span>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className={`p-4 font-semibold ${textColor}`}>
                      {t?.bibliography || 'Bibliography'}
                    </td>
                    {comparePlants.map(plant => (
                      <td key={plant.id} className={`p-4 text-center text-sm ${textSecondary}`}>
                        {plant.bibliography || '—'}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompareModal;