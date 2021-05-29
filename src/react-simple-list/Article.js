import React, { useState, useEffect } from 'react';
import { retriveComments } from './io';

export const Article = ({ title, description }) => {
  const [comments, setComments] = useState([]);
  const fetchData = async () => {
    const data = await retriveComments();
    setComments(data);
    return data;
  };
  useEffect(() => fetchData(), []);
  return (
    <article>
      <header>
        <h2>{title}</h2>
      </header>
      <p>{description}</p>
      {comments.length > 0 && (
        <footer>
          <ul>
            {comments.map(({ id, comment }) => (
              <li key={id}>{comment}</li>
            ))}
          </ul>
        </footer>
      )}
    </article>
  );
};
