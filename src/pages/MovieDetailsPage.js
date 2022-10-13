import React from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { apiKey, fetcher } from "../Config";
const MovieDetailsPage = () => {
  const { movieID } = useParams();
  const { data, error } = useSWR(
    ` https://api.themoviedb.org/3/movie/${movieID}?api_key=${apiKey}`,
    fetcher
  );
  return <div>1212</div>;
};

export default MovieDetailsPage;
