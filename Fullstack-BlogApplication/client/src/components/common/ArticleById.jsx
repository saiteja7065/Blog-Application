import React from "react";
import { useLocation } from "react-router-dom";
import {
  Calendar,
  Clock,
  Mail,
  Edit2Icon,
  Trash2Icon,
  ArchiveRestoreIcon,
} from "lucide-react";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { userAuthorContextObj } from "../../contexts/UserAuthorContext";
import { ThemeContext } from "../../contexts/ColorContext";
import { ChevronDownIcon, SendIcon } from "lucide-react";
import Coolanimationtext from "../Coolanimationtext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";

const ArticleById = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let { currentUser } = React.useContext(userAuthorContextObj);
  const { isNightMode } = React.useContext(ThemeContext);
  const location = useLocation();
  const [editArticleStatus, setEditArticleStatus] = React.useState(false);
  const blog = location.state;
  const [currentArticle, setCurrentArticle] = React.useState(blog);
  const [commentStatus, setCommentStatus] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const navigate = useNavigate();
  const { getToken } = useAuth();

  // Check if blog data is available
  React.useEffect(() => {
    if (!blog) {
      setError("Article not found. Please try again.");
    }
  }, [blog]);

  const enableEdit = () => {
    setEditArticleStatus(true);
  };

  const onSubmit = async (articleObj) => {
    console.log(articleObj);
    const articleAfterChanges = { ...blog, ...articleObj };
    const token = await getToken();
    const currentDate = new Date();
    //add date of modification
    articleAfterChanges.dateOfModification =
      currentDate.getDate() +
      "-" +
      currentDate.getMonth() +
      "-" +
      currentDate.getFullYear();

    //make http post req
    let res = await axios.put(
      `http://localhost:3000/author-api/article/${articleAfterChanges.articleId}`,
      articleAfterChanges,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(res);
    if (res.data.message === "article deleted or restored") {
      //change edit article status to false
      setEditArticleStatus(false);
      navigate(`/author-profile/articles/${blog.articleId}`, {
        state: res.data.payload,
      });
    }
  };

  async function addComment(commentObject) {
    commentObject.nameOfUser = currentUser.firstName;
    console.log(commentObject);
    const res = await axios.put(
      `http://localhost:3000/user-api/comment/${currentArticle.articleId}`,
      commentObject
    );
    if (res.data.message == "comment added") {
      setCommentStatus(res.data.message);
    }
  }

  async function deleteArticle() {
    blog.isArticleActive = false;
    let res = await axios.put(
      `http://localhost:3000/author-api/articles/${blog.articleId}`,
      blog
    );
    if (res.data.message === "article deleted or restored") {
      setCurrentArticle(res.data.payload);
    }
  }
  //restore article
  async function restoreArticle() {
    blog.isArticleActive = true;
    let res = await axios.put(
      `http://localhost:3000/author-api/articles/${blog.articleId}`,
      blog
    );
    if (res.data.message === "article deleted or restored") {
      setCurrentArticle(res.data.payload);
    }
  }

  // If blog is null, show an error message
  if (!blog) {
    return (
      <div className={`w-full min-h-screen ${isNightMode ? "bg-gray-900" : "bg-gray-50"}`}>
        <div className="max-w-4xl mx-auto p-6 text-center">
          <div className={`${isNightMode ? "bg-gray-800" : "bg-white"} shadow-lg rounded-lg p-8`}>
            <h2 className={`text-2xl font-bold ${isNightMode ? "text-gray-100" : "text-gray-900"} mb-4`}>
              Article Not Found
            </h2>
            <p className={`${isNightMode ? "text-gray-300" : "text-gray-600"} mb-6`}>
              The article you're looking for could not be found. It may have been removed or you might have followed an invalid link.
            </p>
            <button
              onClick={() => navigate(-1)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`w-full min-h-screen ${
        isNightMode ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      {editArticleStatus == false ? (
        <div
          className={`max-w-4xl mx-auto p-6 ${
            isNightMode ? "bg-gray-900" : "bg-gray-50"
          }`}
        >
          {/* Blog Header */}
          <div
            className={`${
              isNightMode ? "bg-gray-800" : "bg-white"
            } shadow-lg rounded-lg overflow-hidden mb-8`}
          >
            <div className="p-8 border-b border-gray-100">
              <div className="flex items-center justify-around mb-4">
                <span
                  className={`${
                    isNightMode
                      ? "bg-blue-900 text-blue-100"
                      : "bg-blue-100 text-blue-800"
                  } text-lg font-medium px-2.5 py-0.5 rounded-full`}
                >
                  {blog.category}
                </span>
                {currentUser?.role === "author" && (
                  <div>
                    <button
                      className="p-2 rounded bg-blue-500 text-white hover:bg-blue-600 mx-4"
                      onClick={enableEdit}
                    >
                      <Edit2Icon size={20} />
                    </button>
                    {blog.isArticleActive === true ? (
                      <button
                        className="p-2 rounded bg-red-500 text-white hover:bg-red-600"
                        onClick={deleteArticle}
                      >
                        <Trash2Icon size={20} />
                      </button>
                    ) : (
                      <button
                        className="p-2 rounded bg-yellow-300 text-white hover:bg-orange-500"
                        onClick={restoreArticle}
                      >
                        <ArchiveRestoreIcon size={20} />
                      </button>
                    )}
                  </div>
                )}
              </div>
              <h1
                className={`text-4xl font-bold ${
                  isNightMode ? "text-gray-100" : "text-gray-900"
                } mb-4`}
              >
                {blog.title}
              </h1>

              {/* Author Details */}
              <div className="flex items-center">
                <img
                  src={blog.authorData.profileImageUrl}
                  alt={blog.authorData.nameOfAuthor}
                  className="w-12 h-12 rounded-full border-2 border-gray-200 object-cover"
                />
                <div className="ml-4">
                  <p
                    className={`text-lg font-medium ${
                      isNightMode ? "text-gray-100" : "text-gray-900"
                    }`}
                  >
                    {blog.authorData.nameOfAuthor}
                  </p>
                  <div
                    className={`flex items-center ${
                      isNightMode ? "text-gray-400" : "text-gray-500"
                    } text-sm`}
                  >
                    <Mail size={14} className="mr-1" />
                    <span>{blog.authorData.email}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Metadata Bar */}
            <div
              className={`${
                isNightMode ? "bg-gray-700" : "bg-gray-50"
              } px-8 py-4 flex items-center text-sm ${
                isNightMode ? "text-gray-300" : "text-gray-600"
              } flex-wrap`}
            >
              <div className="flex items-center mr-6">
                <Calendar size={16} className="mr-2" />
                <span>Published: {blog.dateOfCreation}</span>
              </div>
              <div className="flex items-center">
                <Clock size={16} className="mr-2" />
                <span>Updated: {blog.dateOfModification}</span>
              </div>
            </div>
          </div>

          {/* Blog Content */}
          <div
            className={`${
              isNightMode ? "bg-gray-800" : "bg-white"
            } p-8 rounded-lg shadow-md mb-8`}
          >
            <div
              className={`prose prose-lg max-w-none ${
                isNightMode ? "text-gray-300" : "text-gray-800"
              }`}
            >
              {blog.content.split("\n\n").map((paragraph, idx) => (
                <p key={idx} className="mb-6 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Comments Section */}
          <div
            className={`${
              isNightMode ? "bg-gray-800" : "bg-white"
            } p-6 rounded-lg shadow-md`}
          >
            <h3
              className={`text-xl font-semibold ${
                isNightMode ? "text-gray-100" : "text-gray-800"
              } mb-4`}
            >
              Comments
            </h3>
            <div
              className={`text-sm ${
                isNightMode ? "text-gray-400" : "text-gray-500"
              } italic`}
            >
              {blog.comments.length === 0 ? (
                <p
                  className={`text-center ${
                    isNightMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  No comments yet
                </p>
              ) : (
                <div className="space-y-4">
                  {blog.comments.map((commentObj) => (
                    <div
                      key={commentObj._id}
                      className={`border ${
                        isNightMode
                          ? "border-gray-700 bg-gray-700"
                          : "border-gray-300 bg-gray-50"
                      } p-2 rounded-lg shadow-sm`}
                    >
                      <p
                        className={`font-semibold text-start mx-3 text-[1.2rem] ${
                          isNightMode ? "text-gray-200" : "text-gray-700"
                        }`}
                      >
                        {commentObj?.nameOfUser}
                      </p>
                      <p
                        className={`text-[0.9rem] ${
                          isNightMode ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        {commentObj?.comments}
                      </p>
                    </div>
                  ))}
                </div>
              )}
              {<h3>{commentStatus}</h3>}
              {currentUser.role == "user" && (
                <>
                  <form onSubmit={handleSubmit(addComment)}>
                    <Input
                      size="lg"
                      placeholder="Add comment"
                      className={`!border-2 ${
                        isNightMode
                          ? "!border-gray-600 !text-gray-200 !bg-gray-700"
                          : "!border-gray-500"
                      } focus:!border-blue-500 mt-1`}
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                      {...register("comments", { required: true })}
                    />
                    <Button type="submit" className="mt-6" fullWidth>
                      Add Comment
                    </Button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div
          className={`w-full ${
            isNightMode ? "bg-gray-900 text-white" : "bg-white text-black"
          }`}
        >
          <div className="flex items-center justify-center p-6">
            <div
              className={`w-full max-w-xl rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.3)] ${
                isNightMode ? "bg-gray-800" : "bg-white"
              }`}
            >
              <div className="p-8">
                <h2
                  className={`text-2xl font-bold mb-6 tracking-tight ${
                    isNightMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Edit Article
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
                      defaultValue={blog.title}
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
                        defaultValue={blog.category || ""}
                      >
                        <option value="" disabled>
                          Select a category
                        </option>
                        <option value="Health">Health</option>
                        <option value="Technology">Technology</option>
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
                      {...register("content", {
                        required: "Content is required",
                      })}
                      rows={6}
                      defaultValue={blog.content}
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
                        ? "from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                        : "from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                    } text-white font-medium flex items-center justify-center space-x-2 focus:ring-2 focus:ring-blue-500/40 focus:outline-none transition-all`}
                  >
                    <span>Publish Article</span>
                    <SendIcon className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArticleById;
