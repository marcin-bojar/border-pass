import { useRef, useEffect, useContext } from 'react';
import { AppContext } from './useAppState';

export const useCountryInput = () => {
  const { countries, setCountries } = useContext(AppContext);
  const inputRef = useRef(null);

  const handleSubmit = e => {
    const country = e.target.value.toUpperCase();

    if (!country) return;
    if (countries.includes(country)) {
      alert('Ten kraj jest już na liście.');
      return;
    }

    countries.unshift(country);
    setCountries([...countries]);
    inputRef.current.value = '';
  };

  const listener = e => {
    if (e.target !== inputRef.current) return;

    if (e.key !== undefined) {
      if (e.key === 'Enter') handleSubmit(e);

      //Legacy browsers
    } else if (e.keyCode !== undefined || e.which !== undefined) {
      if (e.keyCode === 13 || e.which === 13) handleSubmit(e);
    }
  };

  useEffect(() => {
    document.addEventListener('keyup', listener);
    return () => document.removeEventListener('keyup', listener);
  }, []);

  return inputRef;
};
