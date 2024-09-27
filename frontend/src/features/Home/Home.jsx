import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux"; 
import Loader from "../Ui/Loader";
import homeImg from "../../../public/home.svg";
import './Home.css'; 

function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const darkMode = useSelector((state) => state.darkMode.darkMode); // Access dark mode state

  const handleButtonClick = () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      navigate("/tasks");
    }, 1500);
  };

  return (
    <section className={`flex flex-col md:flex-row justify-center items-center h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-base-100 text-black"}`}>
      <div className="flex flex-col items-center justify-center text-center md:w-1/2">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold mt-6 fade-in">
          Welcome to Our Project
        </h1>
        <p className="text-base sm:text-lg md:text-xl mt-2 max-w-md fade-in">
          This project is designed to help users manage their tasks efficiently
          and intuitively. Explore the features by clicking the button below.
        </p>

        <button
          type="button"
          className={`mt-6 btn btn-primary transition-all duration-200 ${darkMode ? "bg-blue-600 text-white" : "bg-blue-500 text-black hover:text-white"} bounce`}
          style={isLoading ? { border: "1px solid #FF865B", cursor: "not-allowed" } : { cursor: "pointer" }}
          onClick={handleButtonClick}
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center justify-center space-x-2 ">
              <Loader />
              <span>Loading...</span>
            </div>
          ) : (
            "Go to Tasks"
          )}
        </button>
      </div>

      <div className="hidden md:flex md:w-1/2 justify-center items-center">
        <img src={homeImg} alt="Home illustration" className="w-3/4 rotating-svg" />
      </div>
    </section>
  );
}

export default Home;
