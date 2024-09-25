import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../Ui/Loader";
import homeImg from "../../../public/home.svg";

function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleButtonClick = () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      navigate("/tasks");
    }, 1500);
  };

  return (
    <section className="bg-base-100 flex flex-col md:flex-row justify-center items-center">
      <div className="flex flex-col items-center justify-center h-full px-6 py-8 text-center md:w-1/2">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold mt-6">
          Welcome to Our Project
        </h1>
        <p className="text-base sm:text-lg md:text-xl mt-2 max-w-md">
          This project is designed to help users manage their tasks efficiently
          and intuitively. Explore the features by clicking the button below.
        </p>

        <button
          type="button"
          className={`mt-6 btn btn-primary  transition-all duration-200`}
          style={isLoading ? { border: "1px solid #FF865B", cursor: "not-allowed" } : {cursor: "pointer"}}
          onClick={handleButtonClick}
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center justify-center space-x-2">
              <Loader />
              <span>Loading...</span>
            </div>
          ) : (
            "Go to Tasks"
          )}
        </button>
      </div>

      <div className="hidden md:flex md:w-1/2 justify-center items-center">
        <img src={homeImg} alt="Home illustration" className="w-3/4" />
      </div>
    </section>
  );
}

export default Home;
