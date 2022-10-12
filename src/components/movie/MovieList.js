import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import MovieCard from "./MovieCard";
import "swiper/scss";
import useSWR from "swr";
import { fetcher } from "../../Config";
import { useState } from "react";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const { data, error } = useSWR(
    "https://api.themoviedb.org/3/movie/now_playing?api_key=2537abce0574afa219f72b4d7aacde04",
    fetcher
  );
  useEffect(() => {
    setMovies(data.results);
  }, [data]);
  console.log("🚀 ~ file: MovieList.js ~ line 11 ~ MovieList ~ movies", movies);
  return (
    <div className="movie-list">
      <Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={"auto"}>
        <SwiperSlide>
          <MovieCard></MovieCard>
        </SwiperSlide>
        <SwiperSlide>
          <MovieCard></MovieCard>
        </SwiperSlide>
        <SwiperSlide>
          <MovieCard></MovieCard>
        </SwiperSlide>
        <SwiperSlide>
          <MovieCard></MovieCard>
        </SwiperSlide>
        <SwiperSlide>
          <MovieCard></MovieCard>
        </SwiperSlide>
        <SwiperSlide>
          <MovieCard></MovieCard>
        </SwiperSlide>
        <SwiperSlide>
          <MovieCard></MovieCard>
        </SwiperSlide>
        <SwiperSlide>
          <MovieCard></MovieCard>
        </SwiperSlide>
        <SwiperSlide>
          <MovieCard></MovieCard>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default MovieList;
