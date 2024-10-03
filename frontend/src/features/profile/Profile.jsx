import male from "../../../public/male.svg";
import female from "../../../public/female.svg";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function Profile() {
  const darkMode = useSelector((state) => state.darkMode.darkMode);
  const [userData, setUserData] = useState(null);
  const dataClassName = `p-4 rounded-xl text-2xl`;
  useEffect(() => {
    const userId = Cookies.get("userId");

    if (userId) {
      fetch(`http://localhost:5000/api/Users/${userId}`)
        .then((response) => response.json())
        .then((data) => setUserData(data.user)) // Access the nested user object
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    } else {
      console.error("User data not found in cookies.");
    }
  }, []);

  if (!userData) {
    return <p>Loading...</p>;
  }

  return (
    <section className="container mx-auto px-4">
      <div className="flex justify-center items-center flex-col mt-9 gap-2">
        <div className="w-56">
          <img src={userData.gender === "male" ? male : female} alt="profile" />
        </div>
        <div className="mt-7 flex flex-col gap-5">
          <div
            className={`${dataClassName} ${
              darkMode ? "bg-dark-accent" : "bg-light-accent"
            }`}
          >
            <h2
              className={`${darkMode ? "text-dark-text" : "text-light-text"}`}
            >
              Name: {userData.username}
            </h2>
          </div>
          <div
            className={`${
              darkMode ? "bg-dark-accent" : "bg-light-accent"
            } ${dataClassName}`}
          >
            <p className={`${darkMode ? "text-dark-text" : "text-light-text"}`}>
              Email: {userData.email}
            </p>
          </div>
          <div
            className={`${
              darkMode ? "bg-dark-accent" : "bg-light-accent"
            } ${dataClassName}`}
          >
            <p className={`${darkMode ? "text-dark-text" : "text-light-text"}`}>
              Gender: {userData.gender}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Profile;
