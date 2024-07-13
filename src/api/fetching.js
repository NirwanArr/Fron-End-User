/* eslint-disable react-hooks/rules-of-hooks */
import {api, apiWithAuth} from "./api";
// eslint-disable-next-line no-unused-vars

const login = async (email, password) => {
  const res = await api.post(`/auth/member/login`, {
    email: email,
    password: password,
  });
  // const token = res.data.data;
  return localStorage.setItem("...", res.data.data.token);
};

const register = async (name, email, phoneNumber, password, country, city) => {
	const res = await api.post("/auth/member/register", {
		name,
		email,
		phoneNumber,
		password,
		country,
		city,
	})

	localStorage.setItem("registeredEmail", email)

	return res.data.data.dataValues
}

const verifyOtp = async (code, userId) => {
	const res = await api.post(`/auth/verify-otp/${userId}`, {
		code: code,
	})
	return res.data
}

const resendOtp = async (email) => {
	const res = await api.post("/auth/new-otp", {
		email: email,
	})
	return res.data.data.message
}

const resetPassword = async (password, confirmPassword, userId) => {
	const res = await api.patch(`/auth/reset-password/${userId}`, {
		password: password,
		confirmPassword: confirmPassword,
	})
	return res.data.message
}

const newPasswordUser = async (
	oldPassword,
	newPassword,
	confirmPassword,
	userId
) => {
	const res = await apiWithAuth.patch(
		`/user/change-password/${userId}`,
		{
			oldPassword: oldPassword,
			newUserPassword: newPassword,
			confirmPassword: confirmPassword,
		},
	)
	return res.data.message
}

const getEmail = async (email) => {
  const res = await api.get(`/user/get?email=${email}`);
  return res.data.data.user.userId;
};

const getCategory = async () => {
	const res = await api.get("/category")
	return res.data.data
}

const createCourse = async (userId, courseId) => {
	const res = await apiWithAuth.post(
		`/course-user/create/${userId}`,
		{
			courseId,
		}
	)
	return res.data.message
}


const getCourse = async (filter) => {
	let category, level, query
	if (filter?.selecCategory) {
		category  = filter.selecCategory 
	}
	if (filter?.selectLevel) {
		level  = filter.selectLevel 
	}

	if (filter) {
		query = `?category=[${category || ""}]&level=${level || ""}`
	}

	const res = await api.get(`/course${query|| ""}`)
	return res.data.data
}


const getCourseByIdFree = async (idCourse) => {
	const res = await apiWithAuth.get(`/course/${idCourse}`)
	return res.data
}

const getCourseById = async (courseUserId) => {
	const res = await apiWithAuth.get(`/course-user/my-course/${courseUserId}`)
	return res.data.course
}

const updateCourseStatus = async (courseUserId, contentId) => {
	const res = await apiWithAuth.patch(
		`/course-user/update-progress/${courseUserId}/progress/${contentId}`	
	)
	return res.data
}

const getCourseUser = async () => {
	const res = await apiWithAuth.get("/course-user/my-course");

	return res.data.courses
}

// TIDAK PENTING
// const updateStatus = async (chapterId, contentId) => {
//   const res = await api.patch(
//     `/content/update-status/${chapterId}/${contentId}`
//   );
//   return res.data;
// };

const getMe = async () => {
	const res = await apiWithAuth.get("/auth/me")
	return res.data.data
}

const updateMe = async (
	image,
	name,
	phoneNumber,
	country,
	city,
	userId,
) => {
	const formData = new FormData()
	formData.append("image", image) // Pastikan "image" sesuai dengan nama field yang diharapkan oleh server
	formData.append("name", name)
	formData.append("phoneNumber", phoneNumber)
	formData.append("country", country)
	formData.append("city", city)
	const res = await apiWithAuth.patch(
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
				"Content-Type": "multipart/form-data",
			},
		}
	)
	return res.data
}

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
//   updateStatus,
  getMe,
  updateMe,
  getCourseByIdFree
};
