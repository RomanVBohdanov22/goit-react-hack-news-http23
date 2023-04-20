import React, { Component } from 'react';
import axios from 'axios';

function getRandomHexColor() {
  return `#${Math.floor((0.2 + 0.5 * Math.random()) * 16777215).toString(16)}`;
}

const appStyles = {
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '24px',
  gap: '12px',
  color: '#010101',
};
axios.defaults.baseURL = 'https://hn.algolia.com/api/v1';

const ArticleList = ({ articles }) => (
  <ul>
    {articles.map(({ objectID, url, title }) => (
      <li key={objectID}>
        <a href={url} target="_blank" rel="noreferrer noopener">
          {title}
        </a>
      </li>
    ))}
  </ul>
);

export class App extends Component {
  state = {
    articles: [],
    isLoading: false,
    error: null,
  };
/*
  async componentDidMount() {
    this.setState({ isLoading: true });
    const response = await axios.get('/search?query=react');
    this.setState({
      articles: response.data.hits,
      isLoading: false,
    });
  }*/
  async componentDidMount() {
    this.setState({ isLoading: true });

    try {
      const response = await axios.get("/search?query=react");
      this.setState({ articles: response.data.hits });
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
    }
  }

  render() {
    const { articles, isLoading, error } = this.state;

    return (
      <div style={{ ...appStyles, backgroundColor: getRandomHexColor() }}>
        {error && <p>Whoops, something went wrong: {error.message}</p>}
        {isLoading && <p>Loading...</p>}
        {articles.length > 0 && <ArticleList articles={articles} />}
      </div>
    );
  }
}

/*
<div style={{ ...appStyles, backgroundColor: getRandomHexColor() }}>
        {isLoading ? <p>Loading...</p> : <ArticleList articles={articles} />}
      </div>
*/