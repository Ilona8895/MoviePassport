import { useMovies } from "../contexts/MoviesContext";
import { WatchedMovie } from "./WatchedMovie";

export function WatchedMovieList() {
  const { watched } = useMovies();
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
}
