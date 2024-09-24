import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Singup = () => {
  const navgite = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    navgite("/login");
  };

  return (
    <>
      <div className="flex font-poppins items-center justify-center">
        <div className="h-screen w-screen flex justify-center items-center dark:bg-gray-900">
          <div className="grid gap-8">
            <div
              id="back-div"
              className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-[26px] m-4"
            >
              <div className="border-[20px] border-transparent rounded-[20px] dark:bg-gray-900 bg-white shadow-lg xl:p-10 2xl:p-10 lg:p-10 md:p-10 sm:p-2 m-2">
                <h1 className="pt-8 pb-6 font-bold dark:text-gray-400 text-5xl text-center cursor-default">
                  Singup
                </h1>
                <form
                  action="#"
                  method="post"
                  className="space-y-4"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div>
                    <label
                      htmlFor="text"
                      className="mb-2  dark:text-gray-400 text-lg"
                    >
                      First Name
                    </label>
                    <input
                      id="Text"
                      className="border p-3 dark:bg-indigo-700 dark:text-gray-300  dark:border-gray-700 shadow-md placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
                      type="Text"
                      placeholder="Text"
                      {...register("firstname", { required: true })}
                    />
                    {errors.firstname && <span>This field is required</span>}
                  </div>

                  <div>
                    <label
                      htmlFor="text"
                      className="mb-2  dark:text-gray-400 text-lg"
                    >
                      Last Name
                    </label>
                    <input
                      id="Text"
                      className="border p-3 dark:bg-indigo-700 dark:text-gray-300  dark:border-gray-700 shadow-md placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
                      type="Text"
                      placeholder="Text"
                      {...register("lastname", { required: true })}
                    />
                    {errors.lastname && <span>This field is required</span>}
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2  dark:text-gray-400 text-lg"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      className="border p-3 dark:bg-indigo-700 dark:text-gray-300  dark:border-gray-700 shadow-md placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
                      type="email"
                      placeholder="Email"
                      {...register("email", { required: true })}
                    />
                    {errors.email && <span>This field is required</span>}
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="mb-2 dark:text-gray-400 text-lg"
                    >
                      Password
                    </label>
                    <input
                      id="password"
                      className="border p-3 shadow-md dark:bg-indigo-700 dark:text-gray-300  dark:border-gray-700 placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
                      type="password"
                      placeholder="Password"
                      {...register("password", { required: true })}
                    />
                    {errors.password && <span>This field is required</span>}
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="mb-2 dark:text-gray-400 text-lg"
                    >
                      Confirm Password
                    </label>
                    <input
                      id="password"
                      className="border p-3 shadow-md dark:bg-indigo-700 dark:text-gray-300  dark:border-gray-700 placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
                      type="password"
                      placeholder="Password"
                      {...register("password", { required: true })}
                    />
                    {errors.password && <span>This field is required</span>}
                  </div>

                  <button
                    className="bg-gradient-to-r dark:text-gray-300 from-blue-500 to-purple-500 shadow-lg mt-6 p-2 text-white rounded-lg w-full hover:scale-105 hover:from-purple-500 hover:to-blue-500 transition duration-300 ease-in-out block text-center"
                    type="submit"
                  >
                    Singup
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Singup;
