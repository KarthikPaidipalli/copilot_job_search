import { axiosInstances } from "./networkInstance";

// export const login = async (body: any) => {
//   try {
//     const response = await axiosInstances.post("/auth/login", body);

//     return {
//       success: true,
//       data: response.data?.data,
//     };
//   } catch (error: any) {
//     return {
//       success: false,
//       message:
//       error?.response?.data?.detail ||      
//         error?.response?.data?.message ||
//         error?.message ||
//         "Something went wrong",
//     };
//   }
// };

export const login = async (body: { username: string; password: string }) => {
  try {
    const formData = new URLSearchParams();
    formData.append("username", body.username);
    formData.append("password", body.password);

    const response = await axiosInstances.post(
      "/auth/login",
      formData,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return {
      success: true,
      data: response?.data,
    };
  } catch (error: any) {
    return {
      success: false,
      message:
        error?.response?.data?.detail ||
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong",
    };
  }
};

export const signUpUser = async(body:any) =>{
   try {
    const response = await axiosInstances.post("/auth/register", body);

    return {
      success: true,
      data: response.data,
    };
  } catch (error: any) {
    return {
      success: false,
      message:
      error?.response?.data?.detail ||      
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong",
    };
  }
}