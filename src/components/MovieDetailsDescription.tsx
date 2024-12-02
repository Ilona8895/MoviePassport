import { useEffect, useState } from "react";
import StarRating from "./StarRating";
import { useMovies, type Watched } from "../contexts/MoviesContext";
import { useKey } from "../hooks/useKey";
import { type MovieConverted } from "./MovieDetailsSelect";

export type MovieDetailsDescriptionType = {
  movie: MovieConverted;
};

export function MovieDetailsDescription({
  movie,
}: MovieDetailsDescriptionType) {
  const { closeMovie, watched, selectedId, addWatched } = useMovies();
  const [userRating, setUserRating] = useState<number | null>(null);

  const isMovieWatched = watched
    .map((movie) => movie.imdbID)
    .includes(selectedId);
  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;

  function handleAdd() {
    const newWatchedMovie: Watched = {
      imdbID: selectedId,
      title: movie.title,
      year: movie.year,
      poster: movie.poster,
      imdbRating: Number(movie.imdbRating),
      runtime: Number(movie.runtime.split(" ")[0]),
      userRating: Number(userRating),
    };

    addWatched(newWatchedMovie);
    closeMovie();
  }

  useKey("Escape", closeMovie);

  useEffect(
    function () {
      if (!movie.title) return;
      document.title = movie.title;

      return function () {
        document.title = "MoviePassport";
      };
    },
    [movie.title]
  );

  return (
    <>
      <header>
        <button className="btn-back" onClick={closeMovie}>
          &larr;
        </button>
        <img src={movie.poster} alt={`${movie.title} poster`} />
        <div className="details-overview">
          <h2>{movie.title}</h2>
          <p>
            {movie.released} &bull; {movie.runtime}
          </p>
          <p>{movie.genre}</p>
          <p>
            <span>⭐</span>
            {movie.imdbRating} IMDb rating
          </p>
        </div>
      </header>
      <section>
        <div className="rating">
          {!isMovieWatched ? (
            <>
              <StarRating
                maxRating={10}
                size={24}
                onSetRating={setUserRating}
              />
              {userRating && (
                <button className="btn-add" onClick={handleAdd}>
                  Add to list
                </button>
              )}{" "}
            </>
          ) : (
            <p>You rated movie {watchedUserRating}</p>
          )}
        </div>
        <p>
          <em>{movie.plot}</em>
        </p>
        <p>Starring {movie.actors}</p>
        <p>Directed by {movie.director}</p>
      </section>
    </>
  );
}
