import { useState, useEffect, useRef } from 'react';

export const useLazyLoad = () => {
  const [shouldFetch, setShouldFetch] = useState(true); // Change default to true
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          console.log('Target element is visible, enabling fetch');
          setShouldFetch(true);
        }
      },
      {
        root: null,
        rootMargin: '20px',
        threshold: 0.1,
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
      console.log('Observer attached to target element');
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
        console.log('Observer cleaned up');
      }
    };
  }, []);

  useEffect(() => {
    console.log('Lazy load state updated:', { shouldFetch });
  }, [shouldFetch]);

  return { ref, shouldFetch };
};
