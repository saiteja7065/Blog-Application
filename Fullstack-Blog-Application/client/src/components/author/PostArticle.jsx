import React from "react";
import "./post.css";
import Coolanimationtext from "../Coolanimationtext";
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import axios from "axios";
import { userAuthorContextObj } from "../../contexts/UserAuthorContext";
import { useNavigate } from "react-router-dom";
import { ChevronDownIcon, SendIcon } from "lucide-react";
import { ThemeContext } from "../../contexts/ColorContext"; // Import ThemeContext
import "../../font.css";

function PostArticle() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { currentUser } = useContext(userAuthorContextObj);
  const navigate = useNavigate();
  const { isNightMode } = useContext(ThemeContext);
  // Access theme context
  const [error, setError] = useState("");

  const onSubmit = async (articleObj) => {
    console.log(currentUser);
    console.log(articleObj);
    const authorData = {
      nameOfAuthor: currentUser.firstName,
      email: currentUser.email,
      profileImageUrl: currentUser.profileImageUrl,
    };
    articleObj.authorData = authorData;

    //article id(timestamp)
    articleObj.articleId = Date.now();

    //add date of creation & date of modification
    let currentDate = new Date();
    articleObj.dateOfCreation =
      currentDate.getDate() +
      "-" +
      currentDate.getMonth() +
      "-" +
      currentDate.getFullYear() +
      " " +
      currentDate.toLocaleTimeString("en-US", { hour12: true });

    articleObj.dateOfModification =
      currentDate.getDate() +
      "-" +
      currentDate.getMonth() +
      "-" +
      currentDate.getFullYear() +
      " " +
      currentDate.toLocaleTimeString("en-US", { hour12: true });
    //add comments array
    articleObj.comments = [];
    //add article active state
    articleObj.isArticleActive = true;
    //console.log(articleObj)
    //make HTTP POST req to create new article in backend
    let res = await axios.post(
      "http://localhost:3000/author-api/article",
      articleObj
    );
    if (res.status === 201) {
      //navigate to articles component
      navigate(`/author-profile/${currentUser.email}/articles`);
    } else {
      //set error
      setError(res.data.message);
    }
  };

  return (
    <div
      className={`${
        isNightMode ? "bg-gray-900 fontly text-white" : "bg-white text-black"
      }`}
    >
      <div className="text-center mb-5 pt-10">
        <Coolanimationtext
          text="New Article"
          className={`text-3xl font-semibold ${
            isNightMode ? "text-white" : "text-gray-900"
          }`}
        />
      </div>
      <div className="flex items-center justify-center p-6">
        <div
          className={`w-full max-w-xl rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.3)] ${
            isNightMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <div className="p-8">
            {error.length != 0 && (
              <p className="text-red-400 text-center">{error}</p>
            )}
            <h2
              className={`text-2xl font-bold mb-6 tracking-tight ${
                isNightMode ? "text-white" : "text-gray-900"
              }`}
            >
              Create New Article
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Title Input */}
              <div className="space-y-2">
                <label
                  className={`text-sm font-medium ${
                    isNightMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Title
                </label>
                <input
                  type="text"
                  {...register("title", { required: "Title is required" })}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    isNightMode
                      ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500/40 focus:border-blue-500"
                      : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500/40 focus:border-blue-500"
                  } transition-all`}
                  placeholder="Enter a captivating title..."
                />
                {errors.title && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.title.message}
                  </p>
                )}
              </div>

              {/* Category Dropdown */}
              <div className="space-y-2">
                <label
                  className={`text-sm font-medium ${
                    isNightMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Category
                </label>
                <div className="relative">
                  <select
                    {...register("category", {
                      required: "Category is required",
                    })}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      isNightMode
                        ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500/40 focus:border-blue-500"
                        : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500/40 focus:border-blue-500"
                    } transition-all appearance-none`}
                  >
                    <option value="">Select a category</option>
                    <option value="Technology">Technology</option>
                    <option value="Health">Health</option>
                    <option value="Sports">Sports</option>
                    <option value="Finance">Finance</option>
                    <option value="Education">Education</option>
                    <option value="Travel">Travel</option>
                    <option value="Food">Food</option>
                    <option value="Lifestyle">Lifestyle</option>
                    <option value="Business">Business</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Personal Development">
                      Personal Development
                    </option>
                    <option value="Science">Science</option>
                    <option value="Art & Culture">Art & Culture</option>
                    <option value="Politics">Politics</option>
                    <option value="Gaming">Gaming</option>
                    <option value="Parenting">Parenting</option>
                    <option value="Environment">Environment</option>
                    <option value="History">History</option>
                    <option value="DIY & Crafts">DIY & Crafts</option>
                    <option value="Fashion">Fashion</option>
                    <option value="Motivation">Motivation</option>
                    <option value="Relationships">Relationships</option>
                    <option value="Productivity">Productivity</option>
                    <option value="Books & Literature">
                      Books & Literature
                    </option>
                  </select>
                  <ChevronDownIcon
                    className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                      isNightMode ? "text-gray-400" : "text-gray-500"
                    } w-5 h-5 pointer-events-none`}
                  />
                </div>
                {errors.category && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.category.message}
                  </p>
                )}
              </div>

              {/* Content Textarea */}
              <div className="space-y-2">
                <label
                  className={`text-sm font-medium ${
                    isNightMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Content
                </label>
                <textarea
                  {...register("content", { required: "Content is required" })}
                  rows={6}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    isNightMode
                      ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500/40 focus:border-blue-500"
                      : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500/40 focus:border-blue-500"
                  } transition-all resize-none`}
                  placeholder="Share your thoughts..."
                />
                {errors.content && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.content.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className={`w-full px-6 py-3 rounded-lg bg-gradient-to-r ${
                  isNightMode
                    ? "from-blue-600 to-blue-700"
                    : "from-blue-500 to-blue-600"
                } text-white font-medium flex items-center justify-center space-x-2 focus:ring-2 focus:ring-blue-500/40 focus:outline-none transition-all timepass`}
              >
                <span>Publish Article</span>
                <SendIcon className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostArticle;
