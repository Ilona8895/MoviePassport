import { useMovies } from "../contexts/MoviesContext";

export function NumResults() {
  const { movies } = useMovies();
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}
