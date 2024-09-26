/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../Ui/Loader";
import loginImg from "../../../public/login.svg";
import Cookies from "js-cookie";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
      }, 2000);
    } catch (error) {
      setTimeout(() => {
        console.error("Error:", error);
        setError(error.message);
      }, 1000);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  return (
    <section className="bg-base-100 grid grid-cols-1 md:grid-cols-2 h-screen">
      <div className="flex flex-col items-center justify-center h-full px-6 py-8 ">
        <div className="w-full bg-base-200 rounded-lg shadow-md sm:max-w-md">
          <div className="p-6 space-y-4">
            <h1 className="text-xl font-bold leading-tight tracking-tight">
              Sign in to your account
            </h1>
            {error && <p className="text-red-500">{error}</p>}
            <form className="space-y-4" onSubmit={loginUser}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="input input-bordered w-full"
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="input input-bordered w-full"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="checkbox checkbox-primary"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="remember" className="">
                      Remember me
                    </label>
                  </div>
                </div>
                <a
                  href="#"
                  className="text-sm font-medium text-primary hover:underline"
                >
                  Forgot password?
                </a>
              </div>
              <button
                type="submit"
                className="btn btn-primary w-full"
                disabled={loading}
              >
                {loading ? <Loader /> : "Signin"}
              </button>
              <p className="text-sm font-light">
                Don't have account?{" "}
                <a
                  href=""
                  className="font-medium text-primary hover:underline"
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
        className="hidden md:block w-full h-auto"
      />
    </section>
  );
}

export default Login;
