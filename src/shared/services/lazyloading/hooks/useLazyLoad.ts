import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

export const useLazyLoad = () => {
  const { ref, inView } = useInView();
  const [shouldFetch, setShouldFetch] = useState(false);

  useEffect(() => {
    if (inView) {
      setShouldFetch(true);
    }
  }, [inView]);

  return { ref, shouldFetch };
};
