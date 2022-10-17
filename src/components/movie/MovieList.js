import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import MovieCard from "./MovieCard";
import useSWR from "swr";
import { fetcher, tmpAPI } from "../../Config";

const MovieList = ({ type = "now_playing", movieID = "" }) => {
  const { data } = useSWR(tmpAPI.getMovieList(type, movieID), fetcher);
  const movies = data?.results || [];
  return (
    <div className="movie-list ">
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
