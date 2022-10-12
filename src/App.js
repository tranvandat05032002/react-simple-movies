import { Fragment } from "react";
import "swiper/scss";
import BannerList from "./components/banner/BannerList";
import MovieList from "./components/movie/MovieList";

function App() {
  return (
    <div className="App">
      <Fragment>
        <header className="header flex items-center justify-center gap-x-5 mb-10 py-10">
          <span className="text-primary">Home</span>
          <span>Movies</span>
        </header>

        <BannerList></BannerList>

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
      </Fragment>
    </div>
  );
}

export default App;
