import React, { useState, useEffect } from 'react';

const News1 = () => {
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const url = 'https://tech-news3.p.rapidapi.com/venturebeat';
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '6977997820msh853d5031dbd2aebp1337e2jsnc37ee3bd7502',
        'x-rapidapi-host': 'tech-news3.p.rapidapi.com'
      }
    };

    const fetchNews = async () => {
      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setNews(result);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Latest Tech News</h1>
      <ul>
        {news && news.map((item, index) => (
          <li key={index}>
            <a href={item.url} target="_blank" rel="noopener noreferrer">
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default News1;
