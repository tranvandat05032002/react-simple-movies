import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../button/Button";

const BannerItem = ({ item, id }) => {
  const { title, poster_path } = item;
  const navigate = useNavigate();
  return (
    <div className="relative w-full h-full overflow-hidden rounded-lg">
      <div className="overlay absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.5)] rounded-lg"></div>
      <img
        src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
        alt=""
        className="w-full h-[500px] object-cover rounded-lg banner-img"
      />
      <div className="absolute w-full text-white left-5 bottom-8">
        <h2 className="mb-5 text-3xl font-bold">{title}</h2>
        <div className="flex items-center mb-8 gap-x-3">
          <span className="px-4 py-2 border border-white rounded-md">
            Action
          </span>
          <span className="px-4 py-2 border border-white rounded-md">
            Adventure
          </span>
          <span className="px-4 py-2 border border-white rounded-md">
            Drama
          </span>
        </div>
        {/* <button className="px-6 py-3 font-medium text-white rounded-lg bg-primary">
          Watch Now
        </button> */}
        <Button onClick={() => navigate(`/movies/${id}`)}>Watch Now</Button>
      </div>
    </div>
  );
};

export default BannerItem;
