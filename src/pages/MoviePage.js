import React, { useEffect, useState } from "react";
import useSWR from "swr";
import MovieCard, { MovieCardSkeleton } from "../components/movie/MovieCard";
import { fetcher, tmpAPI } from "../Config";
import useDebounce from "../hooks/useDebounce";
import ReactPaginate from "react-paginate";
import { v4 as uuidv4 } from "uuid";
const MoviePage = () => {
  const itemPerPage = 10;
  const [pageIndex, setPageIndex] = useState(1);
  const [url, setUrl] = useState(
    tmpAPI.getMovieList("popular", null, pageIndex)
  );
  const [filter, setFilter] = useState("");
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };
  const filterDebounce = useDebounce(filter, 1000);
  const { data, error } = useSWR(url, fetcher);
  const isLoading = !data && !error;
  useEffect(() => {
    if (filterDebounce) {
      setUrl(tmpAPI.getMovieSearch(filterDebounce, pageIndex));
    } else {
      setUrl(tmpAPI.getMovieList("popular", null, pageIndex));
    }
  }, [filterDebounce, pageIndex]);
  const movies = data?.results || [];
  //react-pagination
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 20;

  useEffect(() => {
    if (!data || !data.total_results) return;
    setPageCount(Math.ceil(data.total_results / itemsPerPage));
  }, [data, itemOffset]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.total_results;
    setItemOffset(newOffset);
    setPageIndex(event.selected + 1);
  };
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
      {!isLoading && (
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
      <ReactPaginate
        breakLabel="..."
        nextLabel=" >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< "
        renderOnZeroPageCount={null}
        className="pagination"
      />
    </div>
  );
};

export default MoviePage;
