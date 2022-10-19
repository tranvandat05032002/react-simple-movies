import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../button/Button";
import { tmpAPI } from "../../Config";
import PropTypes from "prop-types";
import { withErrorBoundary } from "react-error-boundary";
import LoadingSkeleton from "../../loading/LoadingSkeleton";

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

const MovieCard = ({ item }) => {
  const { title, vote_average, poster_path, release_date, id } = item;
  const navigate = useNavigate();
  return (
    <div className="flex flex-col h-full p-3 text-white rounded-lg select-none movie-card bg-slate-800">
      <img
        src={
          tmpAPI.img500(poster_path) ||
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
        <Button onClick={() => navigate(`/movies/${id}`)} full>
          Watch Now
        </Button>
      </div>
    </div>
  );
};
MovieCard.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string,
    vote_average: PropTypes.number,
    poster_path: PropTypes.string,
    release_date: PropTypes.string,
    id: PropTypes.number,
  }),
};
export default withErrorBoundary(MovieCard, {
  FallbackComponent: ErrorFallback,
});

export const MovieCardSkeleton = () => (
  <div className="flex flex-col h-full p-3 text-white rounded-lg select-none movie-card bg-slate-800">
    <LoadingSkeleton
      width="100%"
      height="250px"
      className="mb-5"
    ></LoadingSkeleton>
    <div className="flex flex-col flex-1">
      <h3 className="mb-3 text-xl font-bold">
        <LoadingSkeleton width="100%" height="20px"></LoadingSkeleton>
      </h3>
      <div className="flex items-center justify-between mb-10 text-sm opacity-50">
        <span>
          <LoadingSkeleton width="50px" height="10px"></LoadingSkeleton>
        </span>
        <span>
          <LoadingSkeleton width="30px" height="10px"></LoadingSkeleton>
        </span>
      </div>
      <LoadingSkeleton height="45px" width="100%"></LoadingSkeleton>
    </div>
  </div>
);

//         <h3 className="mb-3 text-xl font-bold">
// <LoadingSkeleton width="100%" height="20px"></LoadingSkeleton>
//         </h3>
//         <div className="flex items-center justify-between mb-10 text-sm opacity-50">
//           <span>
// <LoadingSkeleton width="50px" height="10px"></LoadingSkeleton>
//           </span>
//           <span>
// <LoadingSkeleton width="30px" height="10px"></LoadingSkeleton>
//           </span>
//         </div>
// <LoadingSkeleton
//   width="100%"
//   height="45px"
//   radius="6px"
// ></LoadingSkeleton>
//       </div>
//     </div>
//   );
// };
