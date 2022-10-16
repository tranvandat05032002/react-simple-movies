import React, { useEffect, useState } from "react";
import useSWR from "swr";
import MovieCard from "../components/movie/MovieCard";
import { apiKey, fetcher } from "../Config";
import useDebounce from "../hooks/useDebounce";
import LoadingSkeleton from "../loading/LoadingSkeleton";
const MoviePage = () => {
  const [pageIndex, setPageIndex] = useState(1);
  const [url, setUrl] = useState(
    `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${pageIndex}`
  );
  const [filter, setFilter] = useState("");
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };
  const filterDebounce = useDebounce(filter, 1000);
  const { data, error } = useSWR(url, fetcher);
  const loading = !data && !error;
  const countIndex = 5;
  if (pageIndex > countIndex) {
    setPageIndex(0);
  } else if (pageIndex < 1) {
    setPageIndex(1);
  }
  useEffect(() => {
    if (filterDebounce) {
      setUrl(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${filterDebounce}&page=${pageIndex}`
      );
    } else {
      setUrl(
        `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${pageIndex}`
      );
    }
  }, [filterDebounce, pageIndex]);
  const movies = data?.results || [];
  return (
    <div className="py-10 ">
      <div className="flex mb-10">
        <div className="relative flex-1">
          <input
            type="text"
            className="w-full p-4 text-white rounded-lg outline-none bg-slate-800"
            placeholder="Type here to search..."
            onChange={handleFilterChange}
          />
          <button className="absolute top-0 right-0 h-full p-4 text-white rounded-lg bg-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </button>
        </div>
      </div>
      {loading && (
        <div className="w-10 h-10 mx-auto mb-5 transition-all border-4 rounded-full border-primary border-t-transparent animate-spin"></div>
      )}
      <div className="grid grid-cols-5 gap-5">
        {!loading &&
          movies.length > 0 &&
          movies.map((item) => (
            <MovieCard key={item.id} item={item}></MovieCard>
          ))}
      </div>
      <div className="flex items-center justify-center mt-10 text-white gap-x-5 text-[12px] font-bold">
        <span
          className="bg-[#1e293c] cursor-pointer opacity-75 py-3 leading-none px-4 hover:border-violet-400 border-transparent border-[1px] rounded-[4px] "
          onClick={() => setPageIndex(pageIndex - 1)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
            />
          </svg>
        </span>
        {new Array(countIndex).fill(0).map((item, index) => (
          <span
            key={index}
            className={`bg-[#1e293c] cursor-pointer opacity-75 py-3 leading-none px-4 hover:border-violet-400 border-transparent border-[1px] rounded-[4px] focus:outline-none outline-none max-w-[40px] text-center`}
            onClick={() => setPageIndex(index + 1)}
          >
            {index + 1}
          </span>
        ))}
        <span
          className="bg-[#1e293c] cursor-pointer opacity-75 py-3 leading-none px-4 hover:border-violet-400 border-transparent border-[1px] rounded-[4px]"
          onClick={() => setPageIndex(pageIndex + 1)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
            />
          </svg>
        </span>
      </div>
    </div>
  );
};

const MoviePageSkeleton = () => {
  return (
    <div className="py-10 ">
      {/* Card */}
      <div className="grid grid-cols-5 gap-5">
        <div className="flex flex-col h-full p-3 text-white rounded-lg select-none movie-card bg-slate-800">
          <LoadingSkeleton height={"250px"} rounded="16px"></LoadingSkeleton>
          <div className="flex flex-col flex-1">
            {/* <h3 className="mb-3 text-lg font-bold">{title} </h3> */}
            <div className="flex items-center justify-between mb-10 text-sm opacity-50">
              {/* <span>{new Date(release_date).getFullYear()}</span>  */}
              {/* <span></span> vote */}
            </div>
            <button className="w-full px-6 py-3 mt-auto capitalize rounded-lg bg-primary">
              Watch Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MoviePage;
