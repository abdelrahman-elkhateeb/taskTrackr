import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Lottie from "lottie-react";
import Loader from "../Ui/Loader";
import tasks from "../../../public/hero section.json";
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
      className={`container mx-auto flex px-4 h-screen overflow-hidden ${
        darkMode ? " text-dark-text" : " text-light-text"
      }`}
    >
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="grid md:grid-cols-2 justify-center items-center">
            <div className="mb-8 md:mb-0 md:mr-8">
              <h1
                className={`text-4xl md:text-6xl font-bold mb-5 ${
                  darkMode ? "text-dark-text" : "text-light-text"
                }`}
              >
                Organize, Prioritize, and Conquer Your Tasks Effortlessly
              </h1>
              <p
                className={`text-xl font-medium mb-6 ${
                  darkMode ? "text-dark-text" : "text-light-text"
                }`}
              >
                Stay on top of your to-do list with our intuitive task
                management system. Boost your productivity, meet deadlines, and
                achieve your goals—all in one place.
              </p>
              <button
                onClick={handleButtonClick}
                className={`bg-li py-2 px-6 hover:shadow-md rounded transition ${
                  darkMode
                    ? "text-light-text bg-dark-primary"
                    : "text-dark-text bg-light-primary"
                }`}
              >
                Get Started
              </button>
            </div>
            <Lottie animationData={tasks} className="md:block hidden" />
          </div>
        </>
      )}
    </section>
  );
}

export default Home;
