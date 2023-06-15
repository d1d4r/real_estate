import React, { useState } from "react";
import RoutePage from "./components/Routepage";

const App = () => {
  const [movies, setMovies] = useState([]);
  const fetchMovies = async () => {
    const response = await fetch("https://swapi.dev/api/films/");
    const data = await response.json();
    const neededData = data.results.map((movieData) => {
      return {
        id: movieData.episode_id,
        title: movieData.title,
        openingText: movieData.opening_crawl,
        releaseData: movieData.release_date,
      };
    });
    setMovies(neededData);
  };
  return (
    <div>
      <button onClick={fetchMovies}>fetch</button>
      <RoutePage movies={movies} />
    </div>
  );
};

export default App;
