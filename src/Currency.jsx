import { useEffect, useState } from 'react';
import axios from 'axios';
import CurrencyDropdown from './CurrencyDropdown';
import { SiConvertio } from "react-icons/si";

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
          `https://v6.exchangerate-api.com/v6/${import.meta.env.VITE_EXCHANGE_API_KEY}/latest/USD`
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
      setTargetAmount(Number((baseAmount * rate).toFixed(2)));
    } else {
      const reverseRate = rates[baseCurrency] / rates[targetCurrency];
      setBaseAmount(Number((targetAmount * reverseRate).toFixed(2)));
    }
  }, [baseAmount, targetAmount, baseCurrency, targetCurrency, rates, lastChanged]);

  return (
    <>
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium playfair-display text-center text-black pt-10 sm:pt-12 md:pt-16 lg:pt-20 leading-tight">
        <span className="block sm:inline">Currency</span>{' '}
        <span className="block sm:inline">Converter</span>
      </h1>


      <div className='min-h-screen flex items-center justify-center'>
        <div className='w-[400px] h-[400px] bg-gray-200 rounded-lg shadow-2xl flex items-center justify-evenly flex-col bg-cover bg-center m-5' 
          style={{ backgroundImage: `url('/dbg1.svg')` }}
          >
          <div className='bg-black text-white rounded-xl p-2 flex items-center justify-center flex-row'>
            <input
              className='px-2 me-2 focus:outline-none'
              type="number"
              value={baseAmount}
              onChange={(e) => {
                setBaseAmount(Number(e.target.value));
                setLastChanged('base');
              }}
            />

            <CurrencyDropdown
              value={baseCurrency}
              options={rates}
              onChange={setBaseCurrency}
            />
          </div>

          <SiConvertio className="w-10 h-10" />

          <div className='bg-black text-white rounded-xl p-2 flex items-center justify-center flex-row'>
            <input
              className='px-2 me-2 focus:outline-none'
              type="number"
              value={targetAmount}
              onChange={(e) => {
                setTargetAmount(Number(e.target.value));
                setLastChanged('target');
              }}
            />
            <CurrencyDropdown
              value={targetCurrency}
              options={rates}
              onChange={setTargetCurrency}
            />
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