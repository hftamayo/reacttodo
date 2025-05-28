import { useLocation } from 'wouter';

export const useSearchParams = () => {
  const [location, setLocation] = useLocation();

  const getSearchParam = (param: string): string | null => {
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get(param);
  };

  const setSearchParam = (param: string, value: string) => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set(param, value);
    setLocation(`${location.split('?')[0]}?${searchParams.toString()}`);
  };

  return {
    getSearchParam,
    setSearchParam,
  };
}; 