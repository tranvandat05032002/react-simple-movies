import { Fragment } from "react";

function App() {
  return (
    <div className="App">
      <Fragment>
        <header className="header flex items-center justify-center gap-x-5 mb-10 py-10">
          <span className="text-primary">Home</span>
          <span>Movies</span>
        </header>
        <section className="banner h-[400px] page-container">
          <div className="w-full h-full relative rounded-lg overflow-hidden">
            <div className="overlay absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.5)] rounded-lg"></div>
            <img
              src="https://nld.mediacdn.vn/2019/4/25/3515432-endgamedek-15561710302491765206118.jpg"
              alt=""
              className="w-full h-full object-cover"
            />
            <div className="absolute left-5 bottom-8 text-white w-full">
              <h2 className="font-bold text-3xl mb-5">Avengers: EndGame</h2>
              <div className="flex items-center gap-x-3 mb-8">
                <span className="py-2 px-4 border border-white rounded-md">
                  Action
                </span>
                <span className="py-2 px-4 border border-white rounded-md">
                  Adventure
                </span>
                <span className="py-2 px-4 border border-white rounded-md">
                  Drama
                </span>
              </div>
              <button className="py-3 px-6 rounded-lg text-white font-medium bg-primary">
                Watch Now
              </button>
            </div>
          </div>
        </section>
      </Fragment>
    </div>
  );
}

export default App;
