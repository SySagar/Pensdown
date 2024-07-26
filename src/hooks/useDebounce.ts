import { useEffect, useState } from "react";

function useDebounce(value: string, delay = 1000) {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => {
      clearTimeout(timeout);
    };
  }, [value, delay]);

  return debounceValue;
}

export default useDebounce;
