import React from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import MovieList from "../components/movie/MovieList";
import { fetcher, tmpAPI } from "../Config";

const MovieDetailsPage = () => {
  const { movieID } = useParams();
  const { data } = useSWR(tmpAPI.getMovieDetails(movieID), fetcher);
  if (!data) return null;
  const { backdrop_path, poster_path, title, genres, overview } = data;
  return (
    <div className="py-10">
      <div className="w-full h-[600px] relative">
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>
        <div
          className="w-full h-full bg-no-repeat bg-cover"
          style={{
            backgroundImage: `url(${tmpAPI.img500(backdrop_path)})`,
          }}
        ></div>
      </div>
      <div className="w-full max-w-[800px] h-[400px] mx-auto  rounded-lg">
        <img
          src={`${tmpAPI.img500(poster_path)}`}
          alt=""
          className="w-full h-full object-cover rounded-lg -mt-[240px] relative z-10"
        />
      </div>
      <h1 className="mt-4 mb-10 text-4xl font-bold text-center text-white">
        {title}
      </h1>
      {genres.length > 0 && (
        <div className="flex items-center justify-center mb-10 gap-x-5">
          {genres.map((item) => (
            <span
              key={item.id}
              className="px-4 py-2 font-bold border rounded-full border-primary text-primary"
            >
              {item.name}
            </span>
          ))}
        </div>
      )}
      <p className="text-center leading-relaxed max-w-[600px] mx-auto mb-10 text-primary">
        {overview}
      </p>
      <MovieMeta type="credits"></MovieMeta>
      <MovieMeta type="videos"></MovieMeta>
      <MovieMeta type="similar"></MovieMeta>
    </div>
  );
};

const MovieMeta = ({ type = "videos" }) => {
  const { movieID } = useParams();
  const { data } = useSWR(tmpAPI.getMovieMeta(movieID, type), fetcher);
  if (!data) return null;
  if (type === "credits") {
    const { cast } = data;
    if (!cast || cast.length <= 0) return null;
    return (
      <div className="py-10 ">
        <h2 className="mb-10 text-3xl text-center text-white"> Casts</h2>
        <div className="grid grid-cols-4 gap-5">
          {cast.slice(0, 4).map((item) => (
            <div className="cast-item " key={item.id}>
              <h3 className="mb-2 text-xl font-medium text-center text-white">
                {item.name}
              </h3>
              <img
                src={tmpAPI.imgOriginal(item.profile_path)}
                alt=""
                className="w-full h-[350px] object-cover rounded-lg mb-3"
              />
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    const { results } = data;
    if (!results || results.length <= 0) return null;
    if (type === "videos") {
      return (
        <div className="py-10">
          <div className="flex flex-col gap-10">
            {results.slice(0, 2).map((item) => (
              <div className="" key={item.id}>
                <h3 className="inline-block p-3 mb-5 text-xl font-medium text-white border-b-2 border-l-2 border-primary w-max">
                  {item.name}
                </h3>
                <div className="w-full aspect-video">
                  <iframe
                    width="790"
                    height="444"
                    src={`https://www.youtube.com/embed/${item.key}`}
                    title="Nh???c Chill 2022 - Thu Cu???i, Anh V???n ??? ????y, Th?? Th??i - Nh???c Chill Nh??? Nh??ng Hot TikTok"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="object-fill w-full h-full"
                  ></iframe>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
    if (type === "similar") {
      return (
        <div className="py-10">
          <h2 className="mb-10 text-3xl font-medium text-white">Similar</h2>
          <MovieList type="similar" movieID={movieID}></MovieList>
        </div>
      );
    }
    return null;
  }
};

// const MovieMetaa = () => {
//   const { movieID } = useParams();
//   const { data } = useSWR(tmpAPI.getMovieMeta(movieID, "credits"), fetcher);
//   console.log(data);
//   if (!data) return null;
//   const { cast } = data;
//   if (!cast | (cast.length <= 0)) return null;
//   return (
//     <div className="py-10 ">
//       <h2 className="mb-10 text-3xl text-center text-white"> Casts</h2>
//       <div className="grid grid-cols-4 gap-5">
//         {cast.slice(0, 4).map((item) => (
//           <div className="cast-item " key={item.id}>
//             <h3 className="mb-2 text-xl font-medium text-center text-white">
//               {item.name}
//             </h3>
//             <img
//               src={tmpAPI.imgOriginal(item.profile_path)}
//               alt=""
//               className="w-full h-[350px] object-cover rounded-lg mb-3"
//             />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// const MovieVideo = () => {
//   const { movieID } = useParams();
//   const { data } = useSWR(tmpAPI.getMovieMeta(movieID, "videos"), fetcher);
//   if (!data) return null;
//   const { results } = data;
//   if (!results || results.length <= 0) return null;

//   return (
//     <div className="py-10">
//       <div className="flex flex-col gap-10">
//         {results.slice(0, 2).map((item) => (
//           <div className="" key={item.id}>
//             <h3 className="inline-block p-3 mb-5 text-xl font-medium text-white border-b-2 border-l-2 border-primary w-max">
//               {item.name}
//             </h3>
//             <div className="w-full aspect-video">
//               <iframe
//                 width="790"
//                 height="444"
//                 src={`https://www.youtube.com/embed/${item.key}`}
//                 title="Nh???c Chill 2022 - Thu Cu???i, Anh V???n ??? ????y, Th?? Th??i - Nh???c Chill Nh??? Nh??ng Hot TikTok"
//                 frameBorder="0"
//                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                 allowFullScreen
//                 className="object-fill w-full h-full"
//               ></iframe>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// const MovieSimilar = () => {
//   const { movieID } = useParams();
//   const { data } = useSWR(tmpAPI.getMovieMeta(movieID, "similar"), fetcher);
//   console.log(data);
//   if (!data) return null;
//   const { results } = data;
//   if (!results || results.length <= 0) return null;
//   return (
//     <div className="py-10">
//       <h2 className="mb-10 text-3xl font-medium text-white">Similar</h2>
//       <MovieList type="similar" movieID={movieID}></MovieList>
//     </div>
//   );
// };

export default MovieDetailsPage;
