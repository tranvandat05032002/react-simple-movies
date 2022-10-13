import React from "react";
import MovieList from "../components/movie/MovieList";

const HomePage = () => {
  return (
    <>
      <section className="movies-layout page-container pb-16 text-white">
        <h2 className="capitalize mb-10 text-3xl font-bold">Now playing</h2>
        <MovieList type={"now_playing"}></MovieList>
      </section>

      <section className="movies-layout page-container pb-16 text-white">
        <h2 className="capitalize mb-10 text-3xl font-bold">
          Top rated Movies
        </h2>
        <MovieList type={"top_rated"}></MovieList>
      </section>

      <section className="movies-layout page-container pb-16 text-white">
        <h2 className="capitalize mb-10 text-3xl font-bold">Trending</h2>
        <MovieList type={"popular"}></MovieList>
      </section>
    </>
  );
};

export default HomePage;
