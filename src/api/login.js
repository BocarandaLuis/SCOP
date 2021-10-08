import api from '../api/server'


export const loginAPI = async (data) => {
    const res = await fetch(`${api}auth/signin`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      return res.json();
}