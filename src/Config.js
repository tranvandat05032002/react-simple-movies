export const fetcher = (...args) => fetch(...args).then((res) => res.json());
export const apiKey = "2537abce0574afa219f72b4d7aacde04";

const tmdbEndpoint = "https://api.themoviedb.org/3/movie";
const tmdbEndpointSearch = "https://api.themoviedb.org/3/search/movie";

export const tmpAPI = {
  getMovieList: (type, movieID, page = 1) =>
    `${tmdbEndpoint}/${
      movieID ? movieID + "/" : ""
    }${type}?api_key=${apiKey}&page=${page}`,
  getMovieDetails: (movieID, type) =>
    `${tmdbEndpoint}/${movieID}${type ? "/" + type : ""}?api_key=${apiKey}`,
  getMovieBannerList: (type) => `${tmdbEndpoint}/${type}?api_key=${apiKey}`,
  getMovieSearch: (query, page = 1) =>
    `${tmdbEndpointSearch}?api_key=${apiKey}&query=${query}&page=${page}`,
  getMovieMeta: (movieID, type) =>
    `${tmdbEndpoint}/${movieID}/${type}?api_key=${apiKey}`,
  imgOriginal: (url) => `https://image.tmdb.org/t/p/w500/${url}`,
  img500: (url) => `https://image.tmdb.org/t/p/w500/${url}`,
};
