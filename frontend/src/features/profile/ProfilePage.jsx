/* eslint-disable react-hooks/exhaustive-deps */
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loader from "../Ui/Loader";
import { domain } from "../../../../api/api";
import ProfileDataForm from "./ProfileDataForm";
import ProfileImage from "./ProfileImage";
import ChangePasswordForm from "./ChangePasswordForm";
import axios from "axios";
import toast from "react-hot-toast";

function Profile() {
  const darkMode = useSelector((state) => state.darkMode.darkMode);
  const [userData, setUserData] = useState(null);
  const userId = Cookies.get("userId");

  useEffect(() => {
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
  const ConfirmUpdate = async () => {
    try {
      const res = await axios.put(`${domain}/api/Users/${userId}`, {
        ...userData,
      });
     setUserData(res.data.user)
      toast.success("Profile updated successfully")
    } catch (error) {
      toast.error(`${error?.response?.data.message} Please try again`)
    }
  };

  if (!userData) {
    return <Loader />;
  }
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
                        userData={userData}
                        setUserData={setUserData}
                        submitUpdate={ConfirmUpdate}
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
