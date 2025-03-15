// import React from "react";
// import CoolanimationText from "../Coolanimationtext";
// import axios from "axios";

// function Articles() {
//   const [articles, setArticles] = React.useState([]);
//   const [Error, setError] = React.useState();

//   async function getArticles() {
//     let res = await axios.get("http://localhost:3000/author-api/articles");
//     if (res.data.message == "article List") {
//       setArticles(res.data.payload);
//     } else {
//       setError(res.data.message);
//     }
//   }

//   React.useEffect(() => {
//     getArticles();
//   }, []);

//   console.log(articles);
//   return (
//     <div>
//       <div>
//         <CoolanimationText text="Articles" className="text-2xl" />
//       </div>
//       <div className="my-5">
//         {articles.map((article) => (
//           <div className="flex flex-col items-center border h-[13rem] my-2.5">
//             <img
//               src={article.authorData.profileImageUrl}
//               alt='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQq6gaTf6N93kzolH98ominWZELW881HqCgw&s'
//               className="w-[2.5rem] rounded-3xl self-end m-3"

//             />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Articles;

// import React from "react";
// import CoolanimationText from "../Coolanimationtext";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import {ThemeContext} from '../../contexts/ColorContext'

// function Articles() {
//   const { isNightMode } = React.useContext(ThemeContext);
//   const [articles, setArticles] = React.useState([]);
//   const [error, setError] = React.useState();
//   const navigate = useNavigate();
//   const onReadMore = (articleObj) => {
//     navigate(`../${articleObj.articleId}`,{state:articleObj} );
//   };

//   async function getArticles() {
//     try {
//       let res = await axios.get("http://localhost:3000/author-api/articles");
//       if (res.data.message === "article List") {
//         setArticles(res.data.payload);
//       } else {
//         setError(res.data.message);
//       }
//     } catch (err) {
//       setError("Failed to fetch articles");
//     }
//   }

//   React.useEffect(() => {
//     getArticles();
//   }, []);

//   return (
//     <div className={isNightMode ? "bg-gray-800 text-white" : "bg-white text-black"}>

//     <div className="min-h-screen bg-white py-10 flex flex-col items-center">
//       <div className="text-center mb-5">
//         <CoolanimationText
//           text="Articles"
//           className="text-3xl font-semibold text-gray-900"
//         />
//       </div>
//       {error && <p className="text-red-500 text-center">{error}</p>}

//       {/* Scrollable Article List */}
//       <div className="w-full max-w-5xl  overflow-y-auto space-y-6 px-4">
//         {articles.map((article) => (
//           <div
//             key={article._id}
//             className="bg-black text-white rounded-xl shadow-lg p-5 flex gap-4 transition-transform transform hover:scale-101"
//           >
//             {/* Author Image */}
//             <img
//               src={
//                 article.authorData.profileImageUrl ||
//                 "https://images.unsplash.com/photo-1511367461989-f85a21fda167?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D"
//               }
//               alt="Author"
//               className="w-14 h-14 rounded-full border-2 border-gray-600"
//             />

//             <div className="flex flex-col justify-between flex-1">
//               {/* Title */}
//               <h2 className="text-xl font-semibold">{article.title}</h2>

//               {/* Content Preview */}
//               <p className="text-gray-400 text-sm">
//                 {article.content.length > 100
//                   ? `${article.content.substring(0, 100)}...`
//                   : article.content}
//               </p>

//               {/* Read More Button */}
//               <button
//                 className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-gray-600 transition-all"
//                 onClick={() => onReadMore(article)}
//               >
//                 Read More
//               </button>

//               {/* Last Updated */}
//               <p className="text-xs text-gray-500 mt-2">
//                 Last updated on:{"  "}
//                 {article.dateOfModification}
//               </p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//     </div>
//   );
// }

// export default Articles;

// import React from "react";
// import '../../font.css'
// import CoolanimationText from "../Coolanimationtext";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { ThemeContext } from '../../contexts/ColorContext'; // Import ThemeContext
// import { useAuth } from "@clerk/clerk-react";

// function Articles() {
//   const { isNightMode } = React.useContext(ThemeContext); // Access theme context
//   const [articles, setArticles] = React.useState([]);
//   const [error, setError] = React.useState();
//   const navigate = useNavigate();
//   const {getToken}=useAuth()

//   const onReadMore = (articleObj) => {
//     navigate(`../${articleObj.articleId}`, { state: articleObj });
//   };

//   async function getArticles() {
//     try {
//       const token=await getToken();
//       let res = await axios.get("http://localhost:3000/author-api/articles",{
//         headers:{
//           Authorization:`Bearer ${token}`
//         }
//       });
//       if (res.data.message === "article List") {
//         setArticles(res.data.payload);
//       } else {
//         setError(res.data.message);
//       }
//     } catch (err) {
//       setError("Failed to fetch articles");
//     }
//   }

//   React.useEffect(() => {
//     getArticles();
//   }, []);

//   return (

//     <div className={`min-h-screen ${isNightMode ? "bg-gray-900 text-white" : "bg-white text-black fontly"}`}>
//       <div className="text-center mb-5 pt-10">
//         <CoolanimationText
//           text="Articles"
//           className={`text-3xl font-semibold ${isNightMode ? "text-white" : "text-gray-900"}`}
//         />
//       </div>
//       {error && <p className="text-red-500 text-center">{error}</p>}

//       {/* Scrollable Article List */}
//       <div className="w-full max-w-5xl mx-auto px-4">
//         <div className="space-y-6">
//           {
//             articles?.length==0 && <p className="text-center text-gray-500 text-2xl">No articles found</p>
//           }
//           {articles.map((article) => (
//             <div
//               key={article._id}
//               className={`${isNightMode ? "bg-gray-800 text-white" : "bg-white text-black"} rounded-xl shadow-lg p-5 flex gap-4 transition-transform transform hover:scale-101`}
//             >
//               {/* Author Image */}
//               <img
//                 src={
//                   article.authorData.profileImageUrl ||
//                   "https://images.unsplash.com/photo-1511367461989-f85a21fda167?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D"
//                 }
//                 alt="Author"
//                 className="w-14 h-14 rounded-full border-2 border-gray-600"
//               />

//               <div className="flex flex-col justify-between flex-1">
//                 {/* Title */}
//                 <h2 className="text-xl font-semibold">{article.title}</h2>

//                 {/* Content Preview */}
//                 <p className={`${isNightMode ? "text-gray-300" : "text-gray-600"} text-sm`}>
//                   {article.content.length > 100
//                     ? `${article.content.substring(0, 100)}...`
//                     : article.content}
//                 </p>

//                 {/* Read More Button */}
//                 <button
//                   className={`mt-2 px-4 py-2 ${
//                     isNightMode ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-500 hover:bg-blue-600"
//                   } text-white rounded-md transition-all`}
//                   onClick={() => onReadMore(article)}
//                 >
//                   Read More
//                 </button>

//                 {/* Last Updated */}
//                 <p className={`${isNightMode ? "text-gray-400" : "text-gray-500"} text-xs mt-2`}>
//                   Last updated on:{"  "}
//                   {article.dateOfModification}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Articles;

import React, { useState, useEffect, useContext } from "react";
import "../../font.css";
import CoolanimationText from "../Coolanimationtext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ThemeContext } from "../../contexts/ColorContext";
import { useAuth } from "@clerk/clerk-react";

function Articles() {
  const { isNightMode } = useContext(ThemeContext);
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [error, setError] = useState();
  const navigate = useNavigate();
  const { getToken } = useAuth();

  const onReadMore = (articleObj) => {
    navigate(`../${articleObj.articleId}`, { state: articleObj });
  };

  async function getArticles() {
    try {
      const token = await getToken();
      let res = await axios.get("http://localhost:3000/author-api/articles", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data.message === "article List") {
        setArticles(res.data.payload);
        setFilteredArticles(res.data.payload);
        extractCategories(res.data.payload);
      } else {
        setError(res.data.message);
      }
    } catch (err) {
      setError("Failed to fetch articles");
    }
  }

  function extractCategories(articles) {
    const uniqueCategories = [
      "All",
      ...new Set(articles.map((article) => article.category)),
    ];
    setCategories(uniqueCategories);
  }

  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
    if (event.target.value === "All") {
      setFilteredArticles(articles);
    } else {
      setFilteredArticles(
        articles.filter((article) => article.category === event.target.value)
      );
    }
  }

  useEffect(() => {
    getArticles();
  }, []);

  return (
    <div
      className={`min-h-screen ${
        isNightMode ? "bg-gray-900 text-white" : "bg-white text-black fontly"
      }`}
    >
      <div className="text-center mb-5 pt-10">
        <CoolanimationText
          text="Articles"
          className={`text-3xl font-semibold ${
            isNightMode ? "text-white" : "text-gray-900"
          }`}
        />
      </div>
      {error && <p className="text-red-500 text-center">{error}</p>}

      {/* Category Dropdown */}
      <div className="text-center mb-4">
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className={`${
            isNightMode
              ? "bg-gray-800 text-white border-gray-600"
              : "bg-white text-black border-gray-300"
          } p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
        >
          {categories.map((category) => (
            <option
              key={category}
              value={category}
              className={`${
                isNightMode ? "bg-gray-800 text-white" : "bg-white text-black"
              }`}
            >
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Article List */}
      <div className="w-full max-w-5xl mx-auto px-4">
        <div className="space-y-6">
          {filteredArticles.length === 0 && (
            <p className="text-center text-gray-500 text-2xl">
              No articles found
            </p>
          )}
          {filteredArticles.map((article) => (
            <div
              key={article._id}
              className={`${
                isNightMode ? "bg-gray-800 text-white" : "bg-white text-black"
              } rounded-xl shadow-lg p-5 flex gap-4 transition-transform transform hover:scale-101`}
            >
              <img
                src={
                  article.authorData.profileImageUrl ||
                  "https://images.unsplash.com/photo-1511367461989-f85a21fda167?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D"
                }
                alt="Author"
                className="w-14 h-14 rounded-full border-2 border-gray-600"
              />
              <div className="flex flex-col justify-between flex-1">
                <h2 className="text-xl font-semibold">{article.title}</h2>
                <p
                  className={`${
                    isNightMode ? "text-gray-300" : "text-gray-600"
                  } text-sm`}
                >
                  {article.content.length > 100
                    ? `${article.content.substring(0, 100)}...`
                    : article.content}
                </p>
                <button
                  className={`mt-2 px-4 py-2 ${
                    isNightMode
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-blue-500 hover:bg-blue-600"
                  } text-white rounded-md transition-all`}
                  onClick={() => onReadMore(article)}
                >
                  Read More
                </button>
                <p
                  className={`${
                    isNightMode ? "text-gray-400" : "text-gray-500"
                  } text-xs mt-2`}
                >
                  Last updated on: {article.dateOfModification}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Articles;
