import { useState, useEffect } from "react";
import signUp from "../../../public/signUp.svg";
import { useNavigate } from "react-router-dom";
import Loader from "../Ui/Loader";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux"; // Import useSelector
import DarkModeToggle from "../Ui/DarkModeToggle"; // Import DarkModeToggle

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const darkMode = useSelector((state) => state.darkMode.darkMode); // Get dark mode state

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const registerUser = async (e) => {
    e.preventDefault();
    const { username, email, password, confirmPassword, gender } = formData;

    if (!username || !email || !password || !gender) {
      setError("All fields are required.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/Users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
          gender,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "An error occurred");
      }

      const data = await response.json();
      console.log(data);

      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        gender: "",
      });
      setError("");

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSigninClick = () => {
    navigate("/login");
  };

  return (
    <section
      className={`bg-base-100 grid grid-cols-1 md:grid-cols-2 items-center w-full p-6 md:p-12 min-h-screen ${
        darkMode ? "bg-gray-900" : "bg-white"
      }`}
    >
      <div className={`flex flex-col items-center justify-center h-full px-6 py-8 w-full ${darkMode ? "text-white" : "text-black"}`}>
        <div className={`w-full bg-base-200 rounded-lg shadow-md sm:max-w-md ${darkMode ? "bg-gray-700" : ""}`}>
          <div className="p-6 space-y-4">
            <div className="absolute top-3 right-3">
              <DarkModeToggle />
            </div>
            <h1 className="text-xl font-bold leading-tight tracking-tight">
              Create your account
            </h1>
            {error && <p className="text-red-500">{error}</p>}
            {loading ? (
              <div className="flex justify-center items-center h-24">
                <div className="loader">
                  <Loader />
                </div>
              </div>
            ) : (
              <form className="space-y-4" onSubmit={handleSubmit(registerUser)}>
                <div>
                  <label htmlFor="username" className="block mb-2 text-sm font-medium">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    className={`input input-bordered w-full ${darkMode ? "bg-gray-800 text-white" : "bg-white text-black"}`}
                    placeholder="John Doe"
                    onChange={handleChange}
                    {...register("username", { required: true })}
                  />
                  {errors.username && <span className="text-red-500">This field is required</span>}
                </div>
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium">
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className={`input input-bordered w-full ${darkMode ? "bg-gray-800 text-white" : "bg-white text-black"}`}
                    placeholder="name@company.com"
                    onChange={handleChange}
                    {...register("email", { required: true })}
                  />
                  {errors.email && <span className="text-red-500">This field is required</span>}
                </div>
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className={`input input-bordered w-full ${darkMode ? "bg-gray-800 text-white" : "bg-white text-black"}`}
                    onChange={handleChange}
                    {...register("password", { required: true })}
                  />
                  {errors.password && <span className="text-red-500">This field is required</span>}
                </div>
                <div>
                  <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder="••••••••"
                    className={`input input-bordered w-full ${darkMode ? "bg-gray-800 text-white" : "bg-white text-black"}`}
                    onChange={handleChange}
                    {...register("confirmPassword", { required: true })}
                  />
                  {errors.confirmPassword && <span className="text-red-500">This field is required</span>}
                </div>

                {/* Gender Selection */}
                <div>
                  <label className="block mb-2 text-sm font-medium">Gender</label>
                  <div className="flex space-x-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="gender"
                        value="male"
                        className="radio radio-primary"
                        onChange={handleChange}
                        {...register("gender", { required: true })}
                      />
                      <span className="ml-2">Male</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="gender"
                        value="female"
                        className="radio radio-primary"
                        onChange={handleChange}
                        {...register("gender", { required: true })}
                      />
                      <span className="ml-2">Female</span>
                    </label>
                  </div>
                </div>

                <button type="submit" className={`btn btn-primary w-full ${darkMode ? "bg-blue-600" : "bg-blue-500"}`}>
                  Register
                </button>
                <p className="text-sm font-light">
                  Already have an account?{" "}
                  <a href="#" className="font-medium text-primary hover:underline" onClick={handleSigninClick}>
                    Sign in
                  </a>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
      <img
        src={signUp}
        alt="Sign Up Illustration"
        className="hidden md:block w-full h-auto"
      />
    </section>
  );
}

export default Register;
