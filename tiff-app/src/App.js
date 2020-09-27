import React from 'react';
import './App.css';
import MovieResults from './components/MovieResult';
import MovieSpecifics from './components/MovieSpecifics';

function App() {
  // set 'loading' flag for slow network connections
  const [loading, setLoading] = React.useState(false);
  const [response, setResponse] = React.useState([]);
  const [detailedResponse, setDetailedResponse] = React.useState();
  const [page, setPage] = React.useState(1);

  React.useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      // & sort_by=primary_release_date.desc
      // & language=en - US & sort_by=release_date.asc & include_adult=false & include_video=false & primary_release_year=2020 &
      const result = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&primary_release_year=2020&sort_by=release_date.desc&page=${page}`)
        .then((res) => res.json())
        .then((res) => {
          setResponse(res.results.filter((m) => m.popularity > 10));
        });
      setLoading(false);
      return result;
    }
    fetchMovies();
  }, [page]);

  const getMovieDetails = async (e, id) => {
    e.preventDefault();
    setLoading(true);
    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}`)
      .then((res) => res.json())
      .then((res) => setDetailedResponse(res));
    setLoading(false);
    return response;
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src='/logo.svg' alt="logo" />
        <h1 style={{ fontWeight: '500', fontSize: '42px' }}>Popular Movies released this year</h1>
      </header>      {loading && <p> Loading</p>}
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
        <section className="card">
          <p>Page {page}</p>
          {response && response.length > 0 && response.map((m, i) => <MovieResults onClick={(e) => getMovieDetails(e, m.id)} movie={m} key={i} />)}
          {response.length === 0 && page > 1 && (
            <React.Fragment>
              <p>No results for this page</p>
              <button onClick={() => page > 1 ? setPage(1) : null}>Go back to Page 1 </button>
            </React.Fragment>
          )}
        </section>
        <section className="card">
          {detailedResponse ? <MovieSpecifics movie={detailedResponse} /> : <img style={{ width: '50%' }} src='./noun_Movie_1241202.svg' alt="movie reel" />}
        </section>
      </div>
      {page > 1 && <button onClick={() => page > 1 ? setPage(page - 1) : null}>Go back to previous Page: {page - 1} </button>}
      {response && response.length > 0 && <button onClick={() => setPage(page + 1)}>Go to next Page: {page + 1}</button>}
    </div>
  );
}

export default App;
