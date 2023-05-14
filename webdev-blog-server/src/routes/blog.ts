import express from "express";
import BlogControllers from "../controllers/blogControllers";
import BlogAuthorization from "../middlewares/authorization/BlogAuthorization";
import BlogValidator from "../middlewares/validators/BlogValidation";
import Authenticate from "../middlewares/Authenticate";
const router = express.Router();

router.get("/", BlogControllers.getAllBlogs);
router.get("/:title", BlogControllers.getABlog);
router.get(
  "/edit/:blogId",
  Authenticate,
  BlogAuthorization.checkBlogOwnership,
  BlogControllers.getBlogById
);
router.get("/get-blogs-by-user/:username", BlogControllers.getAllBlogsByUser);
router.get(
  "/edit/check-that-blog-exist/:title",
  Authenticate,
  BlogAuthorization.checkBlogOwnershipByTitle,
  BlogControllers.getABlog
);
router.post(
  "/create-blog",
  Authenticate,
  BlogValidator.checkDataValidity,
  BlogControllers.createNewBlog
);
router.post(
  "/react-to-blog/:blogId",
  Authenticate,
  BlogControllers.reactToBlog
);
router.post(
  "/publish-blog/:blogId",
  Authenticate,
  BlogAuthorization.checkBlogOwnership,
  BlogControllers.publishBlog
);
router.put(
  "/update-blog/:blogId",
  Authenticate,
  BlogAuthorization.checkBlogOwnership,
  BlogControllers.updateBlog
);

router.delete(
  "/delete-blog/:blogId",
  Authenticate,
  BlogAuthorization.checkBlogOwnership,
  BlogControllers.deleteBlog
);
export default router;
