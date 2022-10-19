import React, { Fragment, Suspense } from "react";
import "swiper/scss";
import { Routes, Route } from "react-router-dom";
import Main from "./components/layout/Main";
import BannerList from "./components/banner/BannerList";
import MoviePage from "./pages/MoviePage";
// import HomePage from "./pages/HomePage";
// import MoviePage from "./pages/MoviePage";
// import MovieDetailsPage from "./pages/MovieDetailsPage";
const HomePage = React.lazy(() => import("./pages/HomePage"));
// const MoviePage = React.lazy(() => import("./pages/MoviePage"));
const MoviePageLoadMore = React.lazy(() => import("./pages/MoviePageLoadMore"));
const MovieDetailsPage = React.lazy(() => import("./pages/MovieDetailsPage"));

function App() {
  return (
    <Fragment>
      <Suspense fallback={<div>Loading.....</div>}>
        <Routes>
          <Route path="/" element={<Main></Main>}>
            <Route
              path="/"
              element={
                <>
                  <BannerList></BannerList>
                  <HomePage></HomePage>
                </>
              }
            ></Route>
            <Route path="/movies" element={<MoviePage></MoviePage>}></Route>
            <Route
              path="/movies2"
              element={<MoviePageLoadMore></MoviePageLoadMore>}
            ></Route>
            <Route
              path="/movies/:movieID"
              element={<MovieDetailsPage></MovieDetailsPage>}
            ></Route>
          </Route>
          <Route
            path="*"
            element={<h1 className="text-white text-[60px]">Error 404</h1>}
          ></Route>
        </Routes>
      </Suspense>
    </Fragment>
  );
}

export default App;
