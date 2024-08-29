import { useState, ChangeEvent, MouseEvent, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { FaUser, FaLock } from "react-icons/fa";

const Login = () => {
  interface User {
    username: string;
    password: string;
    img: string;
  }
  const [inputs, setInputs] = useState<User>({
    username: "",
    password: "",
    img: "",
  });

  const [err, setError] = useState(null);

  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await login(inputs);
      navigate("/");
    } catch (err: any) {
      setError(err.response.data);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen	bg-linen w-screen	flex-col">
      <div className="wrapper flex flex-col justify-center bg-white w-420  rounded-xl p-10">
        <h1 className="text-3xl text-orangeColor font-bold mb-7 mx-auto">
          Login
        </h1>
        <form className="flex flex-col gap-5">
          <div className={inputBox}>
            <input
              className={inputStyle}
              type="text"
              placeholder="username"
              required
              name="username"
              onChange={handleChange}
            />
            <FaUser className={iconStyle} />
          </div>
          <div className={inputBox}>
            <input
              className={inputStyle}
              type="password"
              placeholder="password"
              required
              name="password"
              onChange={handleChange}
            />
            <FaLock className={iconStyle} />
          </div>
          <button
            className="text-white cursor-pointer bg-orangeColor w-full h-11 outline-none rounded-full shadow-md font-bold border-none p-2.5"
            onClick={handleSubmit}
          >
            Login
          </button>

          {err && (
            <p className="text-sm text-center text-red-500 font-medium">
              {err}
            </p>
          )}
          <span className="text-sm text-center text-gray-800">
            Don't you have an account{" "}
            <Link to="/register">
              <span className="font-semibold ml-1 hover:underline">
                Register
              </span>
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

const inputBox = "relative w-full h-12 mb-4";

const inputStyle =
  "w-full h-full bg-transparent  outline-none  border-2 border-solid border-rgba-255 rounded-full pt-5 pr-11 pb-5 pl-5 placeholder-gray-800";

const iconStyle = "absolute top-1/2 -translate-y-1/2 right-5";

export default Login;
