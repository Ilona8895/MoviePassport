import { createContext, type ReactNode, useContext, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage.tsx";
import { KEY } from "../App";

type MovieData = {
  Response: string;
  totalResults: string;
  Search: Movie[];
};

export type Movie = {
  Poster: string;
  Title: string;
  Type: string;
  Year: string;
  imdbID: string;
};

export type Watched = {
  imdbID: string;
  imdbRating: number;
  poster: string;
  runtime: number;
  title: string;
  userRating: number;
  year: string;
};

type MoviesContextValue = {
  movies: Movie[];
  isLoading: boolean;
  error: string;
  selectedId: string;
  watched: Watched[];
  selectMovie: (id: string) => void;
  closeMovie: () => void;
  addWatched: (movie: Watched) => void;
  deleteWatched: (id: string) => void;
  searchMovie: (query: string) => void;
};

const MoviesContext = createContext<MoviesContextValue | null>(null);

type MoviesProviderTypes = {
  children: ReactNode;
};

function MoviesProvider({ children }: MoviesProviderTypes) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const [watched, setWatched] = useLocalStorage<Watched[]>([], "watched");

  function selectMovie(id: string) {
    setSelectedId((selectedId) => (selectedId === id ? "" : id));
  }

  function closeMovie() {
    setSelectedId("");
  }

  function addWatched(movie: Watched) {
    setWatched((watched) => [...watched, movie]);
  }

  function deleteWatched(id: string) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  function searchMovie(query: string) {
    const controller = new AbortController();
    async function fetchMovies() {
      try {
        setIsLoading(true);
        setError("");
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
          { signal: controller.signal }
        );

        if (!res.ok)
          throw new Error("Something went wrong with fetching movies");

        const data = (await res.json()) as MovieData;

        if (data.Response === "False") throw new Error("Movie not found");

        setMovies(data.Search);
      } catch (err) {
        if ((err as Error).name !== "AbortError")
          setError((err as Error).message);
      } finally {
        setIsLoading(false);
      }
    }
    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }
    closeMovie();
    fetchMovies();

    return function () {
      controller.abort();
    };
  }

  return (
    <MoviesContext.Provider
      value={{
        movies,
        isLoading,
        error,
        selectedId,
        watched,
        selectMovie,
        addWatched,
        deleteWatched,
        searchMovie,
        closeMovie,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
}

function useMovies() {
  const context = useContext(MoviesContext);
  if (context === null)
    throw new Error("MoviesContext was used outside the MoviesProvider");
  return context;
}

export { MoviesProvider, useMovies };
