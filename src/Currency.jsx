import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Currency() {
  const [rates, setRates] = useState({});
  const [targetCurrency, setTargetCurrency] = useState('INR');
  const [baseCurrency, setBaseCurrency] = useState('USD');
  const [targetAmount, setTargetAmount] = useState(85.66);
  const [baseAmount, setBaseAmount] = useState(1);
  const [lastChanged, setLastChanged] = useState('base'); // 'base' or 'target'

  useEffect(() => {
    const fetchCurrencyData = async () => {
      try {
        const response = await axios.get(
          'https://v6.exchangerate-api.com/v6/25b6ccf225482c02b595ae98/latest/USD'
        );
        setRates(response.data.conversion_rates);
      } catch (error) {
        console.error('Error fetching currency data:', error);
      }
    };

    fetchCurrencyData();
  }, []);

  useEffect(() => {
    if (!rates[baseCurrency] || !rates[targetCurrency]) return;

    const rate = rates[targetCurrency] / rates[baseCurrency];

    if (lastChanged === 'base') {
      setTargetAmount((baseAmount * rate).toFixed(2));
    } else {
      const reverseRate = rates[baseCurrency] / rates[targetCurrency];
      setBaseAmount((targetAmount * reverseRate).toFixed(2));
    }
  }, [baseAmount, targetAmount, baseCurrency, targetCurrency, rates, lastChanged]);

  return (
    <>
      <h1 className="text-7xl font-medium playfair-display text-center text-black pt-10">
        Currency Converter
      </h1>

      <div className='min-h-screen flex items-center justify-center'>
        <div className='w-[400px] h-[400px] bg-gray-200 rounded-lg shadow-2xl flex items-center justify-evenly flex-col bg-cover bg-center' 
          style={{ backgroundImage: `url('/src/assets/dbg1.svg')` }}
          >
          <div className='bg-black text-white rounded-xl p-2'>
            <input
              className='px-2 me-2 focus:outline-none'
              type="number"
              value={baseAmount}
              onChange={(e) => {
                setBaseAmount(Number(e.target.value));
                setLastChanged('base');
              }}
            />

            <select
              value={baseCurrency}
              className='bg-black max-h-32 overflow-y-auto border border-gray-300 rounded px-3 py-2'
              onChange={(e) => {
                setBaseCurrency(e.target.value);
                // Ensure the lastChanged stays relevant
                if (lastChanged === 'target') {
                  setTargetAmount((targetAmount * rates[e.target.value] / rates[baseCurrency]).toFixed(2));
                }
              }}
            >
              {Object.keys(rates).map((currency) => (
                <option key={currency} value={currency}>{currency}</option>
              ))}
            </select>
          </div>

          <div className='bg-black text-white rounded-xl p-2'>
            <input
              className='px-2 me-2 focus:outline-none'
              type="number"
              value={targetAmount}
              onChange={(e) => {
                setTargetAmount(Number(e.target.value));
                setLastChanged('target');
              }}
            />
            <select
              value={targetCurrency}
              className='max-h-32 overflow-y-auto border border-gray-300 rounded px-3 py-2 bg-black '
              onChange={(e) => {
                setTargetCurrency(e.target.value);
                // Ensure the lastChanged stays relevant
                if (lastChanged === 'base') {
                  setTargetAmount((baseAmount * rates[e.target.value] / rates[targetCurrency]).toFixed(2));
                }
              }}
            >
              {Object.keys(rates).map((currency) => (
                <option key={currency} value={currency}>{currency}</option>
              ))}
            </select>
          </div>

          {baseAmount && targetAmount && (
            <div className='mt-15 bg-transparent'>
              <h2 className='bg-black text-white p-3 shadow-2xl rounded-2xl'>
                {baseAmount} {baseCurrency} = {targetAmount} {targetCurrency}
              </h2>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Currency;
