import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Lottie from "lottie-react";
import Loader from "../Ui/Loader";
import background from "../../../public/background.json";
import person from "../../../public/person.json";
import "./Home.css";

function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const darkMode = useSelector((state) => state.darkMode.darkMode);

  const handleButtonClick = () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      navigate("/tasks");
    }, 1500);
  };

  return (
    <section
      className={`relative flex justify-center items-center h-screen overflow-hidden ${
        darkMode ? "bg-dark-bg text-dark-text" : "bg-light-bg text-light-text"
      }`}
    >
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Lottie
            animationData={background}
            className="md:block hidden absolute inset-0 w-full h-full object-cover z-0 "
          />

          <div className="relative z-10 flex flex-col items-center md:flex-row md:justify-center container mx-auto text-center md:text-left p-6">
            <div className="mb-8 md:mb-0 md:mr-8">
              <h1 className={`text-4xl md:text-6xl font-bold mb-5 ${darkMode? "text-dark-text": "text-light-text" }`}>
                Organize, Prioritize,  and Conquer Your Tasks Effortlessly
              </h1>
              <p className={`text-xl font-medium mb-6 ${darkMode? "text-dark-text": "text-light-text" }`} >
                Stay on top of your to-do list with our intuitive task
                management system. Boost your productivity, meet deadlines, and
                achieve your goals—all in one place.
              </p>
              <button
                onClick={handleButtonClick}
                className={`bg-li  py-2 px-6 hover:shadow-md rounded transition ${darkMode? "text-dark-text bg-dark-primary hover:bg-dark-pHover" : "text-ligh-text bg-light-primary hover:bg-light-pHover"}`}
              >
                Get Started
              </button>
            </div>
            <Lottie animationData={person} className="w-80 md:w-96" />
          </div>
        </>
      )}
    </section>
  );
}

export default Home;
