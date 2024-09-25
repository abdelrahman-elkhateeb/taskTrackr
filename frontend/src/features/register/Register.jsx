import { useState } from 'react';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
});
const [error, setError] = useState('');

const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
        ...prevData,
        [name]: value,
    }));
    console.log(formData);
    
};

const registerUser = async (e) => {
    e.preventDefault();

    const { username, email, password, confirmPassword, gender } = formData;
    console.log(formData);

    if (!username || !email || !password || !gender) {
        setError("All fields are required.");
        return;
    }
    if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
    }

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
        console.log("Registration successful:", data);
        alert("Registration successful!");

        setFormData({
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            gender: '',
        });
    } catch (error) {
        console.error("Error:", error);
        setError("An error occurred. Please try again.");
    }
};

    return (
        <section className="bg-base-100 h-screen">
            <div className="flex flex-col items-center justify-center h-full px-6 py-8 mx-auto">
                <a
                    href="#"
                    className="flex items-center mb-6 text-2xl font-semibold text-neutral uppercase"
                >
                    Register
                </a>
                <div className="w-full bg-base-200 rounded-lg shadow-md sm:max-w-md">
                    <div className="p-6 space-y-4">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-neutral">
                            Create your account
                        </h1>
                        {error && <p className="text-red-500">{error}</p>}
                        <form className="space-y-4" onSubmit={registerUser}>
                            <div>
                                <label htmlFor="username" className="block mb-2 text-sm font-medium text-neutral">
                                    Your Name
                                </label>
                                <input
                                    type="text"
                                    name="username"
                                    id="username"
                                    className="input input-bordered w-full"
                                    placeholder="John Doe"
                                    value={formData.username}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-neutral">
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
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-neutral">
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
                            <div>
                                <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-neutral">
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    id="confirmPassword"
                                    placeholder="••••••••"
                                    className="input input-bordered w-full"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            {/* Gender Selection */}
                            <div>
                                <label className="block mb-2 text-sm font-medium text-neutral">
                                    Gender
                                </label>
                                <div className="flex space-x-4">
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="gender"
                                            value="male"
                                            className="radio radio-primary"
                                            onChange={handleChange}
                                            required
                                        />
                                        <span className="ml-2 text-neutral">Male</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="gender"
                                            value="female"
                                            className="radio radio-primary"
                                            onChange={handleChange}
                                            required
                                        />
                                        <span className="ml-2 text-neutral">Female</span>
                                    </label>
                                </div>
                            </div>

                            <button type="submit" className="btn btn-primary w-full">
                                Register
                            </button>
                            <p className="text-sm font-light text-neutral">
                                Already have an account?{" "}
                                <a
                                    href="#"
                                    className="font-medium text-primary hover:underline"
                                >
                                    Sign in
                                </a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Register;
