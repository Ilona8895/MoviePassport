import { Loader } from "./components/Loader";
import { ErrorMessage } from "./components/ErrorMessage";
import { NavBar } from "./components/NavBar";
import { Logo } from "./components/Logo";
import { Search } from "./components/Search";
import { NumResults } from "./components/NumResults";
import { Main } from "./components/Main";
import { Box } from "./components/Box";
import { MovieList } from "./components/MovieList";
import { MovieDetailsSelect } from "./components/MovieDetailsSelect";
import { WatchedSummary } from "./components/WatchedSummary";
import { WatchedMovieList } from "./components/WatchedMovieList";
import { useMovies } from "./contexts/MoviesContext";

export const KEY = "35813d51";

export default function App() {
  const { isLoading, error, selectedId } = useMovies();
  return (
    <>
      <NavBar>
        <Logo />
        <Search />
        <NumResults />
      </NavBar>
      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && <MovieList />}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetailsSelect />
          ) : (
            <>
              <WatchedSummary />
              <WatchedMovieList />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
