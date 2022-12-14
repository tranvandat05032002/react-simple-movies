import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import useSWR from "swr";
import { fetcher, tmpAPI } from "../../Config";
import BannerItem from "./BannerItem";

const BannerList = ({ type = "upcoming" }) => {
  const { data } = useSWR(tmpAPI.getMovieBannerList(type), fetcher);
  const movies = data?.results || [];
  return (
    <section className="banner h-[500px] page-container mb-16 overflow-hidden select-none">
      <Swiper grabCursor="true" slidesPerView={"auto"}>
        {movies.length > 0 &&
          movies.map((item) => (
            <SwiperSlide key={item.id}>
              <BannerItem item={item} id={item.id}></BannerItem>
            </SwiperSlide>
          ))}
      </Swiper>
    </section>
  );
};

export default BannerList;
