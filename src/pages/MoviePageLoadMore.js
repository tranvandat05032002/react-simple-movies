import React, { useEffect, useState } from "react";
import useSWR from "swr";
import useSWRInfinite from "swr/infinite";
import MovieCard, { MovieCardSkeleton } from "../components/movie/MovieCard";
import { fetcher, tmpAPI } from "../Config";
import useDebounce from "../hooks/useDebounce";
import { v4 as uuidv4 } from "uuid";
import Button from "../components/button/Button";

const MoviePage = () => {
  const itemPerPage = 10;
  const [pageIndex, setPageIndex] = useState(1);
  const [url, setUrl] = useState(
    tmpAPI.getMovieList("popular", null, pageIndex)
  );
  //   console.log(url);
  const [filter, setFilter] = useState("");
  const filterDebounce = useDebounce(filter, 1000);
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };
  //load more
  const { data, error, size, setSize } = useSWRInfinite(
    (index) => url.replace("page=1", `page=${index + 1}`),
    fetcher
  );
  const movies = data ? data.reduce((a, b) => a.concat(b.results), []) : [];
  const isEmpty = data?.[0]?.results.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.results?.length < itemPerPage);
  useEffect(() => {
    if (filterDebounce) {
      setUrl(tmpAPI.getMovieSearch(filterDebounce, pageIndex));
    } else {
      setUrl(tmpAPI.getMovieList("popular", null, pageIndex));
    }
  }, [filterDebounce, pageIndex]);

  const isLoading = !data && !error;
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
      {isLoading && (
        <div className="grid grid-cols-5 gap-5">
          {new Array(itemPerPage).fill(0).map(() => (
            <MovieCardSkeleton key={uuidv4()}></MovieCardSkeleton>
          ))}
        </div>
      )}
      <div className="grid grid-cols-5 gap-5">
        {!isLoading &&
          movies.length > 0 &&
          movies.map((item) => (
            <MovieCard key={item.id} item={item}></MovieCard>
          ))}
      </div>
      <div className="mt-10 text-center">
        <Button
          disabled={isReachingEnd}
          className={`${isReachingEnd ? "opacity-50 cursor-default" : ""}`}
          onClick={() => (isReachingEnd ? {} : setSize(size + 1))}
        >
          LoadMore
        </Button>
      </div>
    </div>
  );
};

export default MoviePage;
