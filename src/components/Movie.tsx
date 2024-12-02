import { type Movie, useMovies } from "../contexts/MoviesContext";

type MovieTypes = {
  movie: Movie;
};

export function Movie({ movie }: MovieTypes) {
  const { selectMovie } = useMovies();
  return (
    <li onClick={() => selectMovie(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}
