import { createScope } from 'animejs';
import { useEffect, useRef } from 'react';

export function useAnimeScope(setupFn, deps = []) {
  const root = useRef(null);
  const scope = useRef(null);

  useEffect(() => {
    if (!root.current) return;

    const mm = window.matchMedia('(prefers-reduced-motion: no-preference)');
    if (!mm.matches) return;

    scope.current = createScope({ root }).add(setupFn);

    return () => scope.current?.revert();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { root, scope };
}
