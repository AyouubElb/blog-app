import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Menu from "../components/Menu";
import axios from "axios";
import moment from "moment";
import { AuthContext } from "../context/authContext";
import { FaPen } from "react-icons/fa6";
import { FaTrashAlt } from "react-icons/fa";

const SinglePost = () => {
  interface Post {
    id: number;
    username: string;
    title: string;
    description: string;
    img: string;
    userImg: string;
    cat: string;
    date: Date;
  }

  // const url: string = "https://blog-app-api-xiow.onrender.com";
  // const url: string = "http://localhost:8001";
  const url: string = "blog-app-three-ruby.vercel.app";

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
        console.log("post", res.data);
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
                    <p className="border-solid border-2 border-orangeLighter text-orangeLighter w-8 h-8 rounded-full flex hover:bg-orangeLighter hover:text-white">
                      <FaPen className="text-lg m-auto" />
                    </p>
                  </Link>
                  <p
                    className="border-solid border-2 border-orangeLighter text-orangeLighter w-8 h-8 rounded-full flex cursor-pointer hover:bg-orangeLighter hover:text-white"
                    onClick={handleDelete}
                  >
                    <FaTrashAlt className="text-xl m-auto" />
                  </p>
                </div>
              )}
            </div>
            <h1 className="text-5xl font-medium text-orangeColor mb-2">
              {post.title}
            </h1>
            <div
              className="text-justify leading-7"
              dangerouslySetInnerHTML={{ __html: post.description }}
            />
          </div>
          <Menu cat={post.cat} id={post.id} />
        </>
      )}
    </div>
  );
};

export default SinglePost;
