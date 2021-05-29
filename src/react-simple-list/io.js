import { debounce } from 'lodash';
import { useState, useEffect } from 'react';

export const retrieveArticles = () =>
  new Promise(resolve => {
    setTimeout(async () => {
      const response = await fetch('./articles.json');
      const data = await response.json();
      resolve(data);
    }, 3000);
  });

export const retriveComments = () =>
  new Promise(resolve => {
    setTimeout(async () => {
      const response = await fetch('./comments.json');
      const data = await response.json();
      resolve(data);
    }, 1000);
  });

export const useDetector = () => {
  const [state, setState] = useState(window.innerWidth);
  const handleWindowResize = () => {
    const width = window.innerWidth;
    setState(width);
  };
  const handleWindowResizeDebounce = debounce(handleWindowResize, 500);

  useEffect(() => {
    window.addEventListener('resize', handleWindowResizeDebounce);
    return () =>
      window.removeEventListener('resize', handleWindowResizeDebounce);
  }, []);

  return state;
};
