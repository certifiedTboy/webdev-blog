import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../../pages/HomePage";
import Blogs from "../../pages/Blogs";
import Blog from "../../pages/Blog";
import AboutPage from "../../pages/AboutPage";
import NotFoundPage from "../../pages/NotFoundPage";
import LoginPage from "../../pages/LoginPage";
import ProfilePage from "../../pages/ProfilePage";
import AdminPage from "../../pages/AdminPage";
import WriteArticle from "../../pages/WriteArticle";

// const NotFoundPage = React.lazy(() => import("../Errors/NotFoundPage.js"));

const GeneralRoutes = () => {
  //   const { user } = useSelector((state) => state.login);
  return (
    <Routes>
      <Route path="*" element={<NotFoundPage />} />
      <Route path="/" element={<Navigate to="/home" replace={true} />} exact />
      <Route path="/home" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/blogs" element={<Blogs />} />
      <Route path="/w-d/:username" element={<ProfilePage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/write-article" element={<WriteArticle />} />
      <Route
        path="/auth/account/verify/:verificationData"
        element={<LoginPage />}
      />

      <Route path="/blogs/:title" element={<Blog />} />
      <Route path="/blogs/edit/:blogId" element={<WriteArticle />} />
    </Routes>
  );
};

export default GeneralRoutes;
