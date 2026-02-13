import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import RootLayout from "../src/components/RootLayout.jsx";
import Home from "./components/common/Home.jsx";
import SignIn from "./components/common/SignIn.jsx";
import SignUp from "./components/common/SignUp.jsx";
import UserProfile from "./components/user/UserProfile.jsx";
import AuthorProfile from "./components/author/AuthorProfile.jsx";
import Articles from "./components/common/Articles.jsx";
import ArticleById from "./components/common/ArticleById.jsx";
import PostArticle from "./components/author/PostArticle.jsx";
import UserAuthorContext from "./contexts/UserAuthorContext.jsx";
import NotFoundTitle from "./components/common/NotFoundTitle.jsx";
import AllUserDash from "./components/admin/AllUserDash.jsx";
import { ColorContext } from "./contexts/ColorContext.jsx";
import AdminDash from "./components/admin/AdminDash.jsx";
import AboutUs from "./components/common/AboutUs.jsx";
import "./index.css";
import App from "./App.jsx";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

const browserRouterObj = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFoundTitle />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "signin",
        element: <SignIn />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path:'about',
        element:<AboutUs/>
      },  
      {
        path: "user-profile/:email",
        element: <UserProfile />,
        children: [
          {
            path: "articles",
            element: <Articles />,
          },
          {
            path: ":articleid",
            element: <ArticleById />,
          },
          {
            path: "",
            element: <Navigate to="articles" />,
          },
        ],
      },
      {
        path:"admin-profile/:email",
        element:<AdminDash/>,
        children:[
          {
            path: "articles",
            element: <Articles />,
          },
          {
            path: ":articleid",
            element: <ArticleById />,
          },
          {
            path:"users",
            element:<AllUserDash/>
          },{
            path:"",
            element:<Navigate to="articles"/>
          }
        ]
      },
      {
        path: "author-profile/:email",
        element: <AuthorProfile />,
        children: [
          {
            path: "articles",
            element: <Articles />,
          },
          {
            path: ":articleid",
            element: <ArticleById />,
          },
          {
            path: "",
            element: <Navigate to="articles" />,
          },
          {
            path: "article",
            element: <PostArticle />,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <App /> */}
    <ColorContext>
      <UserAuthorContext>
        <RouterProvider router={browserRouterObj} />
      </UserAuthorContext>
    </ColorContext>
  </StrictMode>
);
