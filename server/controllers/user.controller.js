import createError from "http-errors";
import { fetchUserById, fetchUsers } from "../services/user.service.js";
//Subject for deletion
// export const getIssues = async (req, res, next) => {
//   const issues = await fetchIssues();

//   if (issues.length === 0) return next(createError(404, "Issues empty"));
//   res.status(200).json(issues);
// };

// export const getIssue = async (req, res, next) => {
//   const { id } = req.params;

//   const issue = await fetchIssueById(id);
//   if (!issue) return next(createError(404, "Issue not found"));

//   res.status(200).json(issue);
// };

// export const createIssue = async (req, res, next) => {
//   res.send("createIssue");
// };

// export const updateIssue = async (req, res, next) => {
//   const { id } = req.params;

//   const result = updateIssueById(id, req.body);
//   if (!result) return next(createError(404, "Issue not found"));
//   res.send(`updateIssue ${id}`);
// };

// export const deleteIssue = async (req, res, next) => {
//   const { id } = req.params;

//   const result = deleteIssueById(id);
//   if (!result) return next(createError(404, "Issue not found"));
//   res.send(`deleteIssue ${id}`);
// };

export const getUsers = async (req, res, next) => {
  const users = await fetchUsers();

  res.status(200).json(users);
};

export const getUser = async (req, res, next) => {
  const { id } = req.params;

  const user = await fetchUserById(id);
  if (!user) return next(createError(404, "User not found"));

  res.status(200).json(user);
};

export const suspendUser = async (req, res, next) => {
  const { id } = req.params;
  res.send(`Suspend User ${id}`);
};
