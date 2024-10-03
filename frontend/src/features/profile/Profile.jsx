import male from "../../../public/male.svg";
import female from "../../../public/female.svg";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function Profile() {
  const darkMode = useSelector((state) => state.darkMode.darkMode);
  const [userData, setUserData] = useState(null); 

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
      <div className="grid grid-cols-2 mt-9 gap-2">
        <div>
          <img src={userData.gender === "male" ? male : female} alt="profile" />
        </div>
        <div className="mt-7">
          <h2
            className={`${
              darkMode ? "text-dark-text" : "text-light-text"
            } font-semibold text-4xl`}
          >
            Name: {userData.username}
          </h2>
          <p
            className={`${
              darkMode ? "text-dark-text" : "text-light-text"
            } font-semibold text-3xl`}
          >
            Email: {userData.email}
          </p>
          <p
            className={`${
              darkMode ? "text-dark-text" : "text-light-text"
            } font-semibold text-2xl`}
          >
            Gender: {userData.gender}
          </p>
        </div>
      </div>
    </section>
  );
}

export default Profile;
