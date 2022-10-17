import React, { useEffect, useState } from "react";
import useSWR from "swr";
import MovieCard from "../components/movie/MovieCard";
import { apiKey, fetcher } from "../Config";
import useDebounce from "../hooks/useDebounce";
import LoadingSkeleton from "../loading/LoadingSkeleton";
import ReactPaginate from "react-paginate";
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
  console.log("🚀 ~ file: MoviePage.js ~ line 19 ~ MoviePage ~ data", data);
  const loading = !data && !error;
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
