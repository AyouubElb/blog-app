import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Home = () => {
  interface Post {
    id: number;
    date: string;
    title: string;
    desc: string;
    img: string;
    cat: string;
  }

  const [posts, setPosts] = useState<Post[]>();

  const [activeCategory, setActiveCategory] = useState<string>("all");

  const cat = useLocation().search;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`https://realtime-chat-app-api-1xcb.onrender.com/api/posts${cat}`);
        setPosts(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [cat]);

  const getText = (html: string) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
  };

  return (
    <div className="home w-792">
      <div className={heroStyle}>
        <h1 className="text-5xl mb-3 text-orangeColor">Discover our blog</h1>
        <ul className={categoriesStyle}>
          <li
            className={`category-item ${
              activeCategory === "all"
                ? "bg-orangeColor text-white"
                : "bg-white text-orangeColor hover:bg-orangeColor hover:text-white"
            }`}
            onClick={() => handleCategoryClick("all")}
          >
            <Link to="/">
              <h6>All</h6>
            </Link>
          </li>
          <li
            className={`category-item ${
              activeCategory === "art"
                ? "bg-orangeColor text-white"
                : "bg-white text-orangeColor hover:bg-orangeColor hover:text-white"
            }`}
            onClick={() => handleCategoryClick("art")}
          >
            <Link to="/?cat=art">
              <h6>Art</h6>
            </Link>
          </li>
          <li
            className={`category-item ${
              activeCategory === "science"
                ? "bg-orangeColor text-white"
                : "bg-white text-orangeColor hover:bg-orangeColor hover:text-white"
            }`}
            onClick={() => handleCategoryClick("science")}
          >
            <Link to="/?cat=science">
              <h6>Science</h6>
            </Link>
          </li>
          <li
            className={`category-item ${
              activeCategory === "technolgy"
                ? "bg-orangeColor text-white"
                : "bg-white text-orangeColor hover:bg-orangeColor hover:text-white"
            }`}
            onClick={() => handleCategoryClick("technology")}
          >
            <Link to="/?cat=technology">
              <h6>Technology</h6>
            </Link>
          </li>
          <li
            className={`category-item ${
              activeCategory === "cinema"
                ? "bg-orangeColor text-white"
                : "bg-white text-orangeColor hover:bg-orangeColor hover:text-white"
            }`}
            onClick={() => handleCategoryClick("cinema")}
          >
            <Link to="/?cat=cinema">
              <h6>Cinema</h6>
            </Link>
          </li>
          <li
            className={`category-item ${
              activeCategory === "design"
                ? "bg-orangeColor text-white"
                : "bg-white text-orangeColor hover:bg-orangeColor hover:text-white"
            }`}
            onClick={() => handleCategoryClick("design")}
          >
            <Link to="/?cat=design">
              <h6>Design</h6>
            </Link>
          </li>
          <li
            className={`category-item ${
              activeCategory === "food"
                ? "bg-orangeColor text-white"
                : "bg-white text-orangeColor hover:bg-orangeColor hover:text-white"
            }`}
            onClick={() => handleCategoryClick("food")}
          >
            <Link to="/?cat=food">
              <h6>Food</h6>
            </Link>
          </li>
        </ul>
      </div>
      <div className={postsStyle}>
        {posts?.map((post, index) => (
          <Link
            to={`post/${post.id}`}
            className={`post flex flex-col gap-4   ${
              index % 2 === 0 ? "flex-row-reverse" : ""
            }`}
            key={post.id}
          >
            <div className="post-image relative ">
              <img
                className="object-cover max-h-400 w-full rounded-2xl"
                src={"https://realtime-chat-app-api-1xcb.onrender.com/Images/" + post.img}
                alt=""
              />
              <div className="absolute top-auto bottom-5 left-5 bg-white text-orangeColor w-min rounded-full px-2.5 py-0.5 capitalize">
                {post.cat}
              </div>
            </div>
            <div className="post-text">
              <div>
                <p className="text-orangeColor">
                  {moment(post.date).format("MMMM D, YYYY")}
                </p>
                <h1 className="text-2xl text-orangeColor mb-2">{post.title}</h1>
                {/* <p className="text-lg line-clamp-2 mb-1">
                  {getText(post.desc)}
                </p>
                <button className="more-btn py-1.5 px-3">Read More</button> */}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

const heroStyle = "flex flex-col items-center py-12";
const categoriesStyle = "flex gap-5 mt-5";
const postsStyle = "grid grid-cols-2 gap-8 mt-12";

export default Home;
