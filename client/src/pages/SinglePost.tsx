import React, { useContext, useEffect, useState } from "react";
import Edit from "../assets/edit.png";
import Delete from "../assets/delete.png";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import Menu from "../components/Menu";
import axios from "axios";
import moment from "moment";
import { AuthContext } from "../context/authContext";

const SinglePost = () => {
  interface Post {
    id: number;
    username: string;
    title: string;
    desc: string;
    img: string;
    userImg: string;
    cat: string;
    date: Date;
  }

  const url: string = "https://blog-app-api-xiow.onrender.com";

  const [post, setPost] = useState<Post>();

  const location = useLocation();

  const navigate = useNavigate();

  const postId = location.pathname.split("/")[2];

  const { currentUser } = useContext(AuthContext);
  const { access_token } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${url}/api/posts/${postId}`);
        console.log("post", postId);
        setPost(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [postId]);

  const handleDelete = async () => {
    try {
      await axios.delete(`${url}/api/posts/delete/${postId}`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const getText = (html: string) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  return (
    <div className="single w-1024 flex gap-12 pt-16">
      {post && (
        <>
          <div className="content flex flex-col gap-6 flex-[5_5_0%]">
            <img
              className=" w-full h-600 object-cover rounded-2xl"
              src={`${url}/Images/${post.img}`}
              alt=""
            />
            <div className="user flex items-center gap-3">
              {post.userImg && (
                <img
                  className="w-12 h-12 rounded-full object-cover"
                  src={`${url}/Images/${post.userImg}`}
                  alt=""
                />
              )}
              <div className="info text-sm">
                <span className="font-bold">{post.username}</span>
                <p>Posted {moment(post.date).fromNow()}</p>
              </div>

              {currentUser?.username === post.username && (
                <div className="actions flex gap-2">
                  <Link to={`/write?edit=${postId}`} state={post}>
                    <img className="w-8" src={Edit} alt="" />
                  </Link>
                  <img
                    className="w-8 cursor-pointer"
                    onClick={handleDelete}
                    src={Delete}
                    alt=""
                  />
                </div>
              )}
            </div>
            <h1 className="text-5xl font-medium text-orangeColor mb-2">
              {post.title}
            </h1>
            <div
              className="text-justify leading-7"
              dangerouslySetInnerHTML={{ __html: post.desc }}
            />
          </div>
          <Menu cat={post.cat} id={post.id} />
        </>
      )}
    </div>
  );
};

export default SinglePost;
