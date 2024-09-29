/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../Ui/Loader";
import loginImg from "../../../public/login.svg";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import DarkModeToggle from "../Ui/DarkModeToggle";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const darkMode = useSelector((state) => state.darkMode.darkMode);

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

  const loginUser = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { email, password } = formData;

    if (!email || !password) {
      setError("Both email and password are required.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/Users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed. Please try again.");
      }

      const data = await response.json();
      Cookies.set("userId", data.user._id, { expires: 1 });
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      console.error("Error:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  return (
    <section
      className={`h-screen flex items-center justify-center ${
        darkMode ? "bg-dark-bg" : "bg-light-bg"
      }`}
    >
      <div
        className={`flex flex-col items-center justify-center h-full px-6 py-8 
          ${darkMode ? " text-dark-text" : " text-light-text"}
        `}
      >
        <div className="absolute top-3 right-3">
          <DarkModeToggle />
        </div>
        <div
          className={`w-full md:w-96 rounded-lg shadow-md border-2 ${darkMode ? "border-dark-primary" : "border-dark-primary"}`} //  bg-dark-bg == bg-dark-primary
        >
          <div className="p-6 space-y-4">
            <h1 className={`text-xl font-bold leading-tight tracking-tight ${darkMode? "text-dark-text" : " text-light-text "}`}>
              Sign in to your account
            </h1>
            {error && <p className="text-red-500">{error}</p>}
            <form className="space-y-4" onSubmit={handleSubmit(loginUser)}>
              <div>
                <label
                  htmlFor="email"
                  className={`block mb-2 text-sm font-medium ${darkMode ? " text-dark-text " : " text-light-text"}`}
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className={`input input-bordered w-full border-[1px] ${
                    darkMode ? "bg-dark-bg text-dark-text border-dark-primary" : "bg-light-bg text-light-text"
                  }`}
                  placeholder="name@company.com"
                  onChange={handleChange}
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className={`block mb-2 text-sm font-medium ${darkMode ? " text-dark-text" : " text-light-text"}`}
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className={`input input-bordered w-full border-[1px] ${
                    darkMode ? "bg-dark-bg text-dark-text border-dark-primary" : "bg-light-bg text-light-text"
                  }`}
                  onChange={handleChange}
                  {...register("password", { required: true })}
                />
                {errors.password && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className={`checkbox checkbox-primary border-dark-primary hover:`}
                    />
                  </div>
                  <div className={`ml-3 text-sm ${darkMode ? " text-dark-primary" : " text-light-primary"}`}>
                    <label htmlFor="remember">Remember me</label>
                  </div>
                </div>
                <a
                  href=""
                  className={`text-sm font-medium hover:underline ${darkMode ? "text-dark-primary" : "text-light-primary"}`}
                >
                  Forgot password?
                </a>
              </div>
              <button
                type="submit"
                className={`btn btn-primary w-full ${darkMode ? "bg-dark-primary text-dark-text" : "bg-light-primary text-light-text"}`}
                disabled={loading}
              >
                {loading ? <Loader /> : "Sign In"}
              </button >
              <p className="text-sm font-light">
                Don't have an account?{" "}
                <a
                  href=""
                  className={`font-medium text-primary hover:underline ${darkMode ? " text-dark-accent" : " text-light-accent"}`}
                  onClick={handleRegisterClick}
                >
                  Register
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
      <img
        src={loginImg}
        alt="login"
        className="hidden md:block w-1/3 min-w-[500px] h-auto"
      />
    </section>
  );
}

export default Login;
