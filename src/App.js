import { Fragment } from "react";
import "swiper/scss";
import { Routes, Route } from "react-router-dom";
import Main from "./components/layout/Main";
import BannerList from "./components/banner/BannerList";
import HomePage from "./pages/HomePage";
import MoviePage from "./pages/MoviePage";
import MovieDetailsPage from "./pages/MovieDetailsPage";

function App() {
  return (
    <Fragment>
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
          {/* <Route
            path="/movies/:movieID"
            element={<MovieDetailsPage></MovieDetailsPage>}
          ></Route> */}
        </Route>
        <Route
          path="*"
          element={<h1 className="text-white text-[60px]">Error 404</h1>}
        ></Route>
      </Routes>
    </Fragment>
  );
}

export default App;
