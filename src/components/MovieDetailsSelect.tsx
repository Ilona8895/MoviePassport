import { useState, useEffect } from "react";
import { KEY } from "../App";
import { ErrorMessage } from "./ErrorMessage";
import { Loader } from "./Loader";

import { useMovies } from "../contexts/MoviesContext";
import { MovieDetailsDescription } from "./MovieDetailsDescription";

type RawData = Record<
  | "Title"
  | "Year"
  | "Actors"
  | "Website"
  | "Response"
  | "Awards"
  | "BoxOffice"
  | "DVD"
  | "Director"
  | "Genre"
  | "Language"
  | "Metascore"
  | "Plot"
  | "Poster"
  | "Production"
  | "Country"
  | "Rated"
  | "Released"
  | "Runtime"
  | "Type"
  | "Writer"
  | "imdbID"
  | "imdbRating"
  | "imdbVotes",
  string
> & {
  Ratings: {
    Source: string;
    Value: string;
  }[];
};

export type MovieConverted = {
  title: string;
  year: string;
  poster: string;
  runtime: string;
  imdbRating: string;
  plot: string;
  released: string;
  actors: string;
  director: string;
  genre: string;
};

export function MovieDetailsSelect() {
  const { selectedId } = useMovies();
  const [movie, setMovie] = useState<MovieConverted | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(
    function () {
      async function getMovieDetails() {
        try {
          setMovie(null);
          setIsLoading(true);
          setError("");
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
          );
          const data = (await res.json()) as RawData;

          if (data.Response === "False") throw new Error("Wrong film ID");

          const convertedData: MovieConverted = {
            title: data.Title,
            year: data.Year,
            poster: data.Poster,
            runtime: data.Runtime,
            imdbRating: data.imdbRating,
            plot: data.Plot,
            released: data.Released,
            actors: data.Actors,
            director: data.Director,
            genre: data.Genre,
          };
          setMovie(convertedData);
        } catch (err) {
          setError((err as Error).message);
        } finally {
          setIsLoading(false);
        }
      }
      getMovieDetails();
    },
    [selectedId]
  );

  return (
    <div className="details">
      {error && <ErrorMessage message={error} />}
      {isLoading && <Loader />}
      {movie && <MovieDetailsDescription movie={movie} />}
    </div>
  );
}
