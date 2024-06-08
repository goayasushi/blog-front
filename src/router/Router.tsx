import { Navigate, createBrowserRouter } from "react-router-dom";
import { ArticleList } from "../components/pages/ArticleList";
import { Article } from "../components/pages/Article";
import { CategoryList } from "../components/pages/CategoryList";
import { Contact } from "../components/pages/Contact";
import { PrivacyPolicy } from "../components/pages/PrivacyPolicy";
import { Profile } from "../components/pages/Profile";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/articles" replace />,
  },
  {
    path: "/articles",
    element: <ArticleList />,
  },
  {
    path: "/article/:id",
    element: <Article />,
  },
  {
    path: "/categories",
    element: <CategoryList />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/privacy-policy",
    element: <PrivacyPolicy />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
]);
