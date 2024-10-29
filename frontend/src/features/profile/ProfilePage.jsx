import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loader from "../Ui/Loader";
import { domain } from "../../../../api/api";
import ProfileDataForm from "./ProfileDataForm";
import ProfileImage from "./ProfileImage";
import ChangePasswordForm from "./ChangePasswordForm";

function Profile() {
  const darkMode = useSelector((state) => state.darkMode.darkMode);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const userId = Cookies.get("userId");

    if (userId) {
      fetch(`${domain}/api/Users/${userId}`)
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
    return <Loader />;
  }
  console.log(userData);
  return (
    <>
      <>
        <section className="px-4 mt-2">
          <div className="flex justify-center items-center">
            <div
              className={`w-full max-w-sm shadow-lg rounded-2xl p-4 ${
                darkMode ? "bg-gray-700" : ""
              }`}
            >
              <main className="w-full">
                <div className="p-2">
                  <div className="w-full px-2 pb-8 sm:rounded-lg">
                    <h2 className="text-center text-2xl font-bold sm:text-xl mb-3">
                      Update Profile
                    </h2>

                    <div className="grid mx-auto">
                      {/* Profile Picture Section */}
                      <ProfileImage gender={userData?.gender} />
                      {/* Form Data Section */}
                      <ProfileDataForm
                        username={userData?.username}
                        email={userData?.email}
                        gender={userData?.gender}
                      />
                      {/* Change Password */}
                      <ChangePasswordForm password={userData?.password} />
                    </div>
                  </div>
                </div>
              </main>
            </div>
          </div>
        </section>
      </>
    </>
  );
}

export default Profile;
