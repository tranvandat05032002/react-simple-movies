import React from "react";

const BannerItem = ({ item }) => {
  const { title, poster_path } = item;
  return (
    <div className="w-full h-full relative rounded-lg overflow-hidden">
      <div className="overlay absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.5)] rounded-lg"></div>
      <img
        src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
        alt=""
        className="w-full h-[500px] object-cover rounded-lg banner-img"
      />
      <div className="absolute left-5 bottom-8 text-white w-full">
        <h2 className="font-bold text-3xl mb-5">{title}</h2>
        <div className="flex items-center gap-x-3 mb-8">
          <span className="py-2 px-4 border border-white rounded-md">
            Action
          </span>
          <span className="py-2 px-4 border border-white rounded-md">
            Adventure
          </span>
          <span className="py-2 px-4 border border-white rounded-md">
            Drama
          </span>
        </div>
        <button className="py-3 px-6 rounded-lg text-white font-medium bg-primary">
          Watch Now
        </button>
      </div>
    </div>
  );
};

export default BannerItem;
