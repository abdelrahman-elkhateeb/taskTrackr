function Register() {
  return (
    <section className="bg-base-100 h-screen">
      <div className="flex flex-col items-center justify-center h-full px-6 py-8 mx-auto">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-neutral uppercase"
        >
          register
        </a>
        <div className="w-full bg-base-200 rounded-lg shadow-md sm:max-w-md">
          <div className="p-6 space-y-4">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-neutral">
              Create your account
            </h1>
            <form className="space-y-4" action="#">
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-neutral"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="input input-bordered w-full"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-neutral"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="input input-bordered w-full"
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-neutral"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="confirm-password"
                  className="block mb-2 text-sm font-medium text-neutral"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirm-password"
                  id="confirm-password"
                  placeholder="••••••••"
                  className="input input-bordered w-full"
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
