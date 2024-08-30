import React, { useContext, useState } from "react";
import axios from "axios";
import Logo from "../assets/O-removebg-preview.png";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { BiSolidUserCircle } from "react-icons/bi";
import { IoIosArrowDown } from "react-icons/io";
import { GoUpload } from "react-icons/go";

const Navbar = () => {
  const { currentUser, logout, access_token } = useContext(AuthContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  // const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const url: string = "https://blog-app-api-xiow.onrender.com";
  // const url: string = "http://localhost:8001";

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      // setSelectedFile(file);
      sendFileToServer(file);
    }
  };

  const sendFileToServer = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.put(`${url}/api/users/update`, formData, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      console.log("User updated successfully!", res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-between w-1024 py-2.5 ">
      <Link to="/">
        <img className="w-28" src={Logo} alt="" />
      </Link>
      <ul className="flex items-center gap-4">
        {!currentUser && (
          <li className="my-auto cursor-pointer font-medium hover:text-orangeColor">
            <Link to="/login">
              <span className={loginStyle}>Login</span>
            </Link>
          </li>
        )}

        {currentUser && (
          <li>
            <div className="relative inline-block text-left">
              <div
                className="imageIcon my-auto flex cursor-pointer gap-1.5 border border-solid border-gray-400 rounded-full py-1 px-2.5 hover:bg-zinc-200"
                id="menu-button"
                aria-expanded="true"
                aria-haspopup="true"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                {currentUser.img ? (
                  <img
                    className="w-12 h-12 rounded-full object-cover"
                    src={`${url}/Images/${currentUser?.img}`}
                    alt=""
                  />
                ) : (
                  <BiSolidUserCircle className="text-4xl text-gray-900 my-auto" />
                )}
                <p className="font-medium text-gray-900 my-auto">
                  {currentUser?.username}
                </p>
                <p className="my-auto">
                  <IoIosArrowDown />
                </p>
              </div>
              {isDropdownOpen && (
                <div
                  className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="menu-button"
                  tabIndex={-1}
                >
                  <div className="py-1" role="none">
                    {/* <div className="flex items-center gap-1 block px-4 py-2 text-sm text-gray-700 cursor-pointer">
                      <GoUpload className="text-base" />
                      <span>Upload Image</span>
                    </div> */}
                    {!currentUser.img ? (
                      <div className="flex items-center gap-1 block px-4 py-2 text-sm text-gray-700 cursor-pointer">
                        <GoUpload className="text-base" />
                        <span>
                          <label
                            htmlFor="file-upload"
                            className="cursor-pointer"
                          >
                            Upload Image
                          </label>
                          <input
                            id="file-upload"
                            type="file"
                            className="hidden"
                            onChange={handleFileUpload}
                          />
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 block px-4 py-2 text-sm text-gray-700 cursor-pointer">
                        <GoUpload className="text-base" />
                        <span>
                          <label
                            htmlFor="file-upload"
                            className="cursor-pointer"
                          >
                            Edit Image
                          </label>
                          <input
                            id="file-upload"
                            type="file"
                            className="hidden"
                            onChange={handleFileUpload}
                          />
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="py-1" role="none">
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                      tabIndex={-1}
                      id="menu-item-4"
                    >
                      Share
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                      tabIndex={-1}
                      id="menu-item-5"
                    >
                      Add to favorites
                    </a>
                  </div>
                  <div className="py-1.5 px-3" onClick={logout}>
                    <button className="border border-solid border-gray-400 rounded-full py-1 px-2.5 w-full">
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </li>
        )}
        {currentUser && (
          <li className={writeStyle}>
            <Link to="/write">Write</Link>
          </li>
        )}
      </ul>
    </div>
  );
};

const writeStyle =
  "flex items-center justify-center my-auto bg-orangeLighter text-white w-12 h-12 rounded-full  hover:text-orangeColor hover:bg-white";
const loginStyle = "bg-orangeColor text-white py-3 rounded-full px-6";

export default Navbar;
