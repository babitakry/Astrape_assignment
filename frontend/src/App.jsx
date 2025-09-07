import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [jokes, setJokes] = useState([]);
  const [news, setNews] = useState([]);

  useEffect(() => {
    axios.get('/api/jokes')
      .then((response) => {
        setJokes(response.data);
      })
      .catch((error) => {
        console.error("Error fetching jokes:", error);
      });
  }, []);

  useEffect(() => {
    axios.get('/api/news')
      .then((response) => {
        setNews(response.data);
      })
      .catch((error) => {
        console.error("Error fetching news:", error);
      });
  }, []);

  return (
    <>
      <h1>Full Stack Project</h1>
      <div className="container">
        
        <div className="column">
          <h2>JOKES ({jokes.length})</h2>
          {
            jokes?.map((joke) => (
              <div key={joke.id} className="item">
                <p className="title">{joke.title}</p>
                <p className="content">{joke.content}</p>
              </div>
            ))
          }
        </div>

        <div className="column">
          <h2>NEWS ({news.length})</h2>
          {
            news?.map((newItem) => (
              <div key={newItem.id} className="item">
                <p className="title">{newItem.title}</p>
                <p className="content">{newItem.content}</p>
              </div>
            ))
          }
        </div>

      </div>
    </>
  );
}

export default App;
