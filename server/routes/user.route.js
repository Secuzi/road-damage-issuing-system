import express from "express";
import catchAsync from "../utils/catchAsync.js";
import {
  getUser,
  getUsers,
  suspendUser,
} from "../controllers/user.controller.js";
import userAuth from "../middlewares/auth.middleware.js";

const router = express.Router();
// http://localhost:3000/api/user
// router
//   .route("/issues")
//   .get(catchAsync(getIssues))
//   .post(catchAsync(createIssue));
// router
//   .route("/issues/:id")
//   .get(catchAsync(getIssue))
//   .put(catchAsync(updateIssue))
//   .delete(catchAsync(deleteIssue));
router.get("/get-user", userAuth, catchAsync(getUsers));
router.route("/:id").get(catchAsync(getUser)).get(catchAsync(suspendUser));
// router.route("/get-user").get(userAuth, catchAsync(getUser));
export default router;
