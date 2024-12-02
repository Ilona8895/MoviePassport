import { useMovies } from "../contexts/MoviesContext";
import { Movie } from "./Movie";

export function MovieList() {
  const { movies } = useMovies();
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
}
