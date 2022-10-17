export const fetcher = (...args) => fetch(...args).then((res) => res.json());
export const apiKey = "2537abce0574afa219f72b4d7aacde04";

const tmdbEndpoint = "https://api.themoviedb.org/3/movie";

export const tmpAPI = {
  getMovieList: (type, movieID) =>
    `${tmdbEndpoint}/${movieID ? movieID + "/" : ""}${type}?api_key=${apiKey}`,
  getMovieDetails: (movieID, type) =>
    `${tmdbEndpoint}/${movieID}${type ? "/" + type : ""}?api_key=${apiKey}`,
  // https://api.themoviedb.org/3/movie/upcoming?api_key=2537abce0574afa219f72b4d7aacde04
  getMovieBannerList: (type) => `${tmdbEndpoint}/${type}${apiKey}`,
};
