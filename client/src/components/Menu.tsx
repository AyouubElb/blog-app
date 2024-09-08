import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface MenuProps {
  cat: string;
  id: number;
}

const Menu: React.FC<MenuProps> = ({ cat, id }) => {
  interface Posts {
    id: number;
    title: string;
    desc: string;
    img: string;
  }

  const [posts, setPosts] = useState<Posts[]>();

  // const url: string = "https://blog-app-api-xiow.onrender.com";
  // const url: string = "http://localhost:8001";
  const url: string = "blog-app-three-ruby.vercel.app";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${url}/api/posts/?cat=${cat}&id=${id}`);
        setPosts(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [cat, id]);

  return (
    <div className={menuStyle}>
      <h1 className={menuTitleStyle}>Other posts you may like</h1>
      {posts?.map((post) => (
        <Link to={`post/${post.id}`} className={postsStyle} key={post.id}>
          <img
            className={imgStyle}
            src={`${url}/Images/${post.img}`}
            alt={post.title}
          />
          <h2 className={postTitleStyle}>{post.title}</h2>
          {/* <button className="more-btn py-1.5 px-3">Read More</button> */}
        </Link>
      ))}
    </div>
  );
};

const menuStyle = "flex flex-col gap-7 flex-[2_2_0%]";
const menuTitleStyle = "text-xl text-555 font-bold";
const postsStyle = "flex flex-col gap-3";
const imgStyle = "h-200 object-cover";
const postTitleStyle = "text-2xl font-medium text-orangeColor";

export default Menu;
