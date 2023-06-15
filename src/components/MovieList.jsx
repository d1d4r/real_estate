import Movie from "./Movie";

const MovieList = (props) => {
  return (
    <ul>
      {props.movies.map((movie) => {
        <Movie
          title={movie.title}
          releaseData={movie.releaseData}
          openingText={movie.openingText}
        ></Movie>;
      })}
    </ul>
  );
};

export default MovieList;
