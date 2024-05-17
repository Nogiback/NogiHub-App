import { useEffect, useState } from 'react';

export default function useDebounce(value: string, delay = 500) {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => {
      clearTimeout(id);
    };
  }, [value, delay]);

  return debounceValue;
}
