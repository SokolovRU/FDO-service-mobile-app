const baseURL = "http://195.133.147.31:8000/api/";

export const authAPI = async (login: string, password: string) => {
  let responseJson
  try {
    const response = await fetch(baseURL + "student_auth", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        login: login,
        password: password,
      }),
    });
    responseJson = await response.json()
  } catch (error) {
    console.log(error);
  }
};
