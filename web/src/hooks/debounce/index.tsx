type UseDebounceProps = (callback: () => void) => void;

let timeout: number;

const useDebounce = (time: number): UseDebounceProps => {
  const debounce = (callback: () => void) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(callback, time);
  };

  return debounce;
};

export default useDebounce;
