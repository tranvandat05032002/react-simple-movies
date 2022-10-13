import React from "react";
import MovieList from "../components/movie/MovieList";
import HomePage from "./HomePage";

const MoviePage = () => {
  return (
    <div className="py-10">
      <MovieList></MovieList>
      <HomePage></HomePage>
    </div>
  );
};

export default MoviePage;
