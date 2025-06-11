import { useState, useRef, useEffect } from 'react';

export default function CurrencyDropdown({ 
  value, 
  options, 
  onChange,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (currency) => {
    onChange(currency);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        type="button"
        className="w-full flex justify-between items-center border border-gray-300 rounded px-3 py-2 bg-black text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{value}</span>
        <svg
          className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${
            isOpen ? 'transform rotate-180' : ''
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>

      {/* Dropdown options */}
      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-black border border-gray-300 rounded shadow-lg overflow-hidden">
          <div className="max-h-[200px] overflow-y-auto">
            {Object.keys(options).map((currency) => (
              <div
                key={currency}
                className={`px-3 py-2 cursor-pointer hover:bg-gray-800  ${
                  value === currency ? 'bg-gray-700' : ''
                }`}
                onClick={() => handleSelect(currency)}
              >
                {currency}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}