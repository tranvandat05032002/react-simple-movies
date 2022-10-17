import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../button/Button";

const MovieCard = ({ item }) => {
  const { title, vote_average, poster_path, release_date, id } = item;
  const navigate = useNavigate();
  return (
    <div className="flex flex-col h-full p-3 text-white rounded-lg select-none movie-card bg-slate-800">
      <img
        src={
          `https://image.tmdb.org/t/p/w500/${poster_path}` ||
          "https://images.unsplash.com/photo-1665606855702-144fd49af552?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
        }
        alt=""
        className="w-full h-[250px] rounded-lg object-cover mb-5"
      />
      <div className="flex flex-col flex-1">
        <h3 className="mb-3 text-lg font-bold">{title} </h3>
        <div className="flex items-center justify-between mb-10 text-sm opacity-50">
          <span>{new Date(release_date).getFullYear()}</span>
          <span>{vote_average}</span>
        </div>
        {/* <button
          className="w-full px-6 py-3 mt-auto capitalize rounded-lg bg-primary"
          onClick={() => navigate(`/movies/${id}`)}
        >
          Watch Now
        </button> */}
        <Button onClick={() => navigate(`/movies/${id}`)} full>
          Watch Now
        </Button>
      </div>
    </div>
  );
};

export default MovieCard;
