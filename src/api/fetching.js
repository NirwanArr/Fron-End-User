/* eslint-disable react-hooks/rules-of-hooks */
import api from "./api";
// eslint-disable-next-line no-unused-vars
import { decodeToken } from "./payload";

const login = async (email, password) => {
  const res = await api.post(`/auth/member/login`, {
    email: email,
    password: password,
  });
  // const token = res.data.data;
  // // console.log(token)
  return localStorage.setItem("...", res.data.data.token);
};

const register = async (name, email, phoneNumber, password) => {
  const res = await api.post("/auth/member/register", {
    name: name,
    email: email,
    phoneNumber: phoneNumber,
    password: password,
  });

  localStorage.setItem("registeredEmail", email);

  return res.data.data.dataValues;
};

const verifyOtp = async (code, userId) => {
  const res = await api.post(`/auth/verify-otp/${userId}`, {
    code: code,
  });
  return res.data;
};

const resendOtp = async (email) => {
  const res = await api.post("/auth/new-otp", {
    email: email,
  });
  return res.data.data.message;
};

const resetPassword = async (password, confirmPassword, userId) => {
  const res = await api.patch(`/auth/reset-password/${userId}`, {
    password: password,
    confirmPassword: confirmPassword,
  });
  return res.data.message;
};

const newPasswordUser = async (
  oldPassword,
  newPassword,
  confirmPassword,
  userId
) => {
  const res = await api.patch(`/auth/update-password/${userId}`, {
    oldPassword: oldPassword,
    newPassword: newPassword,
    confirmPassword: confirmPassword,
  });
  return res.data.message;
};

const getEmail = async (email) => {
  const res = await api.get(`/user/get?email=${email}`);
  return res.data.data.user.userId;
};

const getCategory = async () => {
  const res = await api.get("/category");
  return res.data.data;
};

const createCourse = async (userId, courseId, token) => {
  const res = await api.post(
    `/course-user/create/${userId}`,
    {
      courseId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data.message;
};

const getCourse = async () => {
  const res = await api.get("/course");
  return res.data.data;
};

const getCourseById = async (userId, courseId) => {
  const res = await api.get(`/course-user/getData/${userId}/${courseId}`);
  return res.data.data;
};

const updateCourseStatus = async (userId, courseId) => {
  const res = await api.patch(
    `/course-user/update-status/${userId}/${courseId}`
  );
  return res.data;
};

const getCourseUser = async (userId) => {
  const res = await api.get(`/course-user/getData/${userId}`);
  return res.data.data;
};

const updateStatus = async (chapterId, contentId) => {
  const res = await api.patch(
    `/content/update-status/${chapterId}/${contentId}`
  );
  return res.data;
};

const getMe = async (token) => {
  const res = await api.get("/auth/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data.data;
};

const updateMe = async (
  image,
  name,
  phoneNumber,
  country,
  city,
  userId,
  token
) => {
  const formData = new FormData();
  formData.append("image", image); // Pastikan "image" sesuai dengan nama field yang diharapkan oleh server
  formData.append("name", name);
  formData.append("phoneNumber", phoneNumber);
  formData.append("country", country);
  formData.append("city", city);
  const res = await api.patch(
    `/user/update/${userId}`,
    {
      image,
      name,
      phoneNumber,
      country,
      city,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return res.data;
};

export {
  login,
  register,
  resendOtp,
  verifyOtp,
  resetPassword,
  newPasswordUser,
  getEmail,
  getCategory,
  createCourse,
  updateCourseStatus,
  getCourse,
  getCourseUser,
  getCourseById,
  updateStatus,
  getMe,
  updateMe,
};
