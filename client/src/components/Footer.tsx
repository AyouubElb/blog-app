import React, { useContext } from "react";
import Logo from "../assets/O-removebg-preview.png";
import { AuthContext } from "../context/authContext";

const Footer = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <footer className="flex items-center justify-between w-1024 mt-24 p-5 bg-orangeLighter text-sm">
      <img className="w-14" src={Logo} alt="" />
      {!currentUser && (
        <button className="bg-white text-orangeColor hover:bg-transparent hover:text-white text-base rounded-full px-6 py-3.5">
          Become a subscriber
        </button>
      )}
    </footer>
  );
};

export default Footer;
