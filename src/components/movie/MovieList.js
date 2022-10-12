import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import MovieCard from "./MovieCard";
import useSWR from "swr";
import { fetcher } from "../../Config";
import { useState } from "react";

const MovieList = ({ type = "now_playing" }) => {
  const { data, error } = useSWR(
    `https://api.themoviedb.org/3/movie/${type}?api_key=2537abce0574afa219f72b4d7aacde04`,
    fetcher
  );
  const movies = data?.results || [];
  return (
    <div className="movie-list">
      <Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={"auto"}>
        {movies.length > 0 &&
          movies.map((item) => (
            <SwiperSlide key={item.id}>
              <MovieCard item={item}></MovieCard>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default MovieList;
