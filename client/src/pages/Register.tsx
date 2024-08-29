import axios from "axios";
import { useState, ChangeEvent, MouseEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";

const Register = () => {
  interface User {
    username: string;
    email: string;
    password: string;
  }
  const [inputs, setInputs] = useState<User>({
    username: "",
    email: "",
    password: "",
  });

  const url: string = "https://blog-app-api-xiow.onrender.com";

  const [err, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${url}/api/auths/register`, inputs);
      console.log("result:", res.data);
      navigate("/login");
    } catch (err: any) {
      setError(err.response.data);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen	bg-linen w-screen	flex-col">
      <div className="wrapper flex flex-col justify-center bg-white w-420  rounded-xl p-10">
        <h1 className="text-3xl text-orangeColor font-bold mb-7 mx-auto">
          Register
        </h1>
        {/* <div className="imageIcon">
          <BiSolidUserCircle />
        </div> */}
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
              type="email"
              placeholder="email"
              required
              name="email"
              onChange={handleChange}
            />
            <FaEnvelope className={iconStyle} />
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
            Register
          </button>
          {err && (
            <p className="text-sm text-center text-red-500 font-medium">
              {err}
            </p>
          )}
          <span className="text-sm text-center text-gray-800">
            Do you have an account{" "}
            <Link to="/login" className="font-semibold ml-1 hover:underline">
              Login
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

export default Register;
