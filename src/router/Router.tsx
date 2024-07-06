import { Navigate, createBrowserRouter } from "react-router-dom";

import { Articles } from "../components/pages/Articles";
import { ArticleDetail } from "../components/pages/Article";
import { CategoryList } from "../components/pages/CategoryList";
import { Contact } from "../components/pages/Contact";
import { PrivacyPolicy } from "../components/pages/PrivacyPolicy";
import { Profile } from "../components/pages/Profile";
import { Page404 } from "../components/pages/Page404";
import { PageLayout } from "../components/templates/PageLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/articles" replace />,
  },
  {
    path: "/",
    element: <PageLayout />,
    children: [
      {
        path: "/articles",
        element: <Articles />,
      },
      {
        path: "/article/:id",
        element: <ArticleDetail />,
      },
      {
        path: "/category/:id",
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
    ],
  },
  {
    path: "*",
    element: <Page404 />,
  },
]);
