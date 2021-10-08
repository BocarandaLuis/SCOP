import api from '../api/server'


export const insertDataWeighing = async (data) => {
  let storage = JSON.parse(localStorage.getItem('user'))
  const res = await fetch(`${api}weighing/insertDataWeighing`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "x-access-token": `${storage.token}`
    },
    body: JSON.stringify(data),
  });
  return res.json();
}

export const getDataWeighing = async (data) => {
  let storage = JSON.parse(localStorage.getItem('user'))
  const res = await fetch(`${api}weighing/`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "x-access-token": `${storage.token}`
    },
    body: JSON.stringify(data),
  });
  return res.json();
}