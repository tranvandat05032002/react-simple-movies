import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import MovieCard from "./MovieCard";
import useSWR from "swr";
import { apiKey, fetcher } from "../../Config";

const MovieList = ({ type = "now_playing", movieID = "" }) => {
  const { data } = useSWR(
    `https://api.themoviedb.org/3/movie/${
      movieID ? movieID + "/" : ""
    }${type}?api_key=${apiKey}`,
    fetcher
  );
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
