import { useEffect } from "react";

export default function useDebounce(value, delay, callback) {
  useEffect(() => {
    const handler = setTimeout(() => {
      callback(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
}
