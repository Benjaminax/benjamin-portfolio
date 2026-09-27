import { useEffect, useState } from 'react';

export const useHoverCapability = () => {
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(any-hover: hover) and (any-pointer: fine)');
    const updateHoverCapability = () => setCanHover(mediaQuery.matches);

    updateHoverCapability();
    mediaQuery.addEventListener('change', updateHoverCapability);
    return () => mediaQuery.removeEventListener('change', updateHoverCapability);
  }, []);

  return canHover;
};
