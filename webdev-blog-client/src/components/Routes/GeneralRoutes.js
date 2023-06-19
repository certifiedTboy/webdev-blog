import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ProtectedRoutes, AdminProtectedRoutes } from "./ProtectedRoutes";
import Loader from "../UI/Loader/Loader";
import Hints from "../PostBuilder/Hints";

const NotFoundPage = React.lazy(() => import("../Errors/NotFound.js"));
const HomePage = React.lazy(() => import("../../pages/HomePage.js"));
const AboutPage = React.lazy(() => import("../../pages/AboutPage.js"));
const LoginPage = React.lazy(() => import("../../pages/LoginPage.js"));
const ProfilePage = React.lazy(() => import("../../pages/ProfilePage.js"));
const AdminPage = React.lazy(() => import("../../pages/AdminPage.js"));
const WriteArticle = React.lazy(() => import("../../pages/WriteArticle"));
const Blogs = React.lazy(() => import("../../pages/Blogs.js"));
const Blog = React.lazy(() => import("../../pages/Blog.js"));
const GeneralRoutes = () => {
  const { user } = useSelector((state) => state.login);
  return (
    <Routes>
      <Route
        path="*"
        element={
          <Suspense fallback={<Loader />}>
            <NotFoundPage />
          </Suspense>
        }
      />
      <Route path="/" element={<Navigate to="/home" replace={true} />} exact />
      <Route
        path="/home"
        element={
          <Suspense fallback={<Loader />}>
            <HomePage />
          </Suspense>
        }
      />
      <Route
        path="/login"
        element={
          <Suspense fallback={<Loader />}>
            <LoginPage />
          </Suspense>
        }
      />
      <Route
        path="/about"
        element={
          <Suspense fallback={<Loader />}>
            <AboutPage />
          </Suspense>
        }
      />
      <Route
        path="/blogs"
        element={
          <Suspense fallback={<Loader />}>
            {" "}
            <Blogs />
          </Suspense>
        }
      />
      <Route
        path="/w-d/:username"
        element={
          <Suspense fallback={<Loader />}>
            <ProfilePage />
          </Suspense>
        }
      />
      <Route
        path="/admin"
        element={
          <AdminProtectedRoutes user={user}>
            <Suspense fallback={<Loader />}>
              {" "}
              <AdminPage />{" "}
            </Suspense>
          </AdminProtectedRoutes>
        }
      />

      <Route
        path="/write-article"
        element={
          <ProtectedRoutes user={user}>
            <Suspense fallback={<Loader />}>
              <WriteArticle />{" "}
            </Suspense>
          </ProtectedRoutes>
        }
      />
      <Route
        path="/write-article/hints"
        element={
          <ProtectedRoutes user={user}>
            <Suspense fallback={<Loader />}>
              <Hints />{" "}
            </Suspense>
          </ProtectedRoutes>
        }
      />
      <Route
        path="/auth/account/verify/:verificationData"
        element={
          <Suspense fallback={<Loader />}>
            <LoginPage />
          </Suspense>
        }
      />

      <Route
        path="/blogs/:title"
        element={
          <Suspense fallback={<Loader />}>
            <Blog />
          </Suspense>
        }
      />
      <Route
        path="/blogs/edit/:blogId"
        element={
          <ProtectedRoutes user={user}>
            <Suspense fallback={<Loader />}>
              <WriteArticle />{" "}
            </Suspense>
          </ProtectedRoutes>
        }
      />
    </Routes>
  );
};

export default GeneralRoutes;
