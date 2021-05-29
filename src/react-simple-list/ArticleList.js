import React, { useCallback, useEffect, useState } from 'react';
import { Article } from './Article';
import { retrieveArticles, useDetector } from './io';

export const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const screenWidth = useDetector();

  const fetchData = useCallback(async () => {
    setLoading(true);
    const data = await retrieveArticles();
    setLoading(false);
    setArticles(data);
  }, []);

  // Be careful with the async/await usage in useEffect
  useEffect(() => fetchData(), [fetchData, screenWidth]);

  // Loading state
  if (isLoading) return <div>Loading...</div>;

  // Empty state
  const isEmpty = !articles.length;
  if (isEmpty) return <div>Nothing!</div>;

  return (
    articles
      // order articles alphabetically
      .sort((a, b) => (a.title > b.title ? 1 : -1))
      // limit
      .slice(0, 3)
      .map(({ id, ...item }) => <Article key={id} {...item} />)
  );
};
