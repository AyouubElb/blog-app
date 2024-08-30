import axios from "axios";
import moment from "moment";
import { useState, ChangeEvent, MouseEvent, useContext } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const Write = () => {
  const state = useLocation().state;
  const [value, setValue] = useState<string>(state?.desc || "");
  const [title, setTitle] = useState<string>(state?.title || "");
  // const [img, setImg] = useState<string>(state?.img || "");
  const [cat, setCat] = useState<string>(state?.cat || "");
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const url: string = "blog-app-production-f008.up.railway.app";
  // const url: string = "http://localhost:8001";

  const { access_token } = useContext(AuthContext);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setImageUrl(URL.createObjectURL(e.target.files[0]));
    }
  };

  // const upload = async () => {
  //   try {
  //     if (file) {
  //       const formData = new FormData();
  //       formData.append("file", file);
  //       const res = await axios.post(`${url}/api/upload`, formData);
  //       return res.data;
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const handleClick = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const formData = new FormData();
    try {
      formData.append("title", title);
      formData.append("desc", value);
      formData.append("cat", cat);
      if (file) {
        formData.append("file", file);
      }
      state
        ? await axios.put(`${url}/api/posts/update/${state.id}`, formData, {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          })
        : formData.append(
            "date",
            moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
          );
      await axios.post(`${url}/api/posts/create`, formData, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      console.log("request sent");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={writeContainStyle}>
      <div className={contentStyle}>
        <input
          className={inputTitleStyle}
          type="text"
          value={title}
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="editorContainer	">
          <ReactQuill
            className={descStyle}
            theme="snow"
            value={value}
            onChange={setValue}
          />
        </div>
      </div>
      <div className={menuStyle}>
        <div className={itemStyle}>
          <h1 className="text-xl">Publish</h1>
          <span>
            <b>Status: </b>Draft
          </span>
          <span>
            <b>Visibility: </b>Public
          </span>
          <input
            className="hidden"
            type="file"
            id="file"
            onChange={handleFileChange}
          />
          <div className="flex items-center gap-2 py-2.5">
            {imageUrl ? (
              <img className="w-24" src={imageUrl} alt="" />
            ) : (
              state?.img && (
                <img
                  className="w-24"
                  src={`${url}/Images/${state?.img}`}
                  alt=""
                />
              )
            )}
            <label className="underline cursor-pointer" htmlFor="file">
              Upload Image
            </label>
          </div>
          <div className="buttons flex justify-between">
            <button className={saveButton}>Save as as draft</button>
            <button className={publishButton} onClick={handleClick}>
              Publish
            </button>
          </div>
        </div>
        <div className={itemStyle}>
          <h1 className="text-xl">Category</h1>
          {["art", "science", "technology", "cinema", "food", "travel"].map(
            (category: string) => (
              <div key={category} className={categoriesStyle}>
                <input
                  type="radio"
                  name="cat"
                  value={category}
                  id={category}
                  checked={cat === category}
                  onChange={(e) => setCat(e.target.value)}
                />
                <label htmlFor={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </label>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

const writeContainStyle = "w-1024 flex gap-5 mt-5";
const contentStyle = "basis-9/12 flex flex-col gap-5";
const inputTitleStyle = "p-3 border border-solid border-gray-300";
const descStyle =
  "bg-white h-80 overflow-scroll border border-solid border-gray-300";
const menuStyle = " basis-3/12 flex flex-col gap-5";
const saveButton =
  "bg-white border border-solid border-orangeColor text-orangeColor font-medium px-3 py-1.5";
const publishButton =
  "bg-orangeLighter border border-solid border-orangeLighter text-white font-medium px-3 py-1.5";
const itemStyle =
  "p-3 border border-solid border-gray-300 flex flex-col justify-between flex-1 text-sm text-555";
const categoriesStyle = "flex items-center gap-1 text-orangeColor";

export default Write;
