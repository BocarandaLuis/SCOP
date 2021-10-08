import api from '../api/server'

export const getProduct = async () => {
  let storage = JSON.parse(localStorage.getItem('user'))
  const res = await fetch(`${api}product/`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "x-access-token": `${storage.token}`
    },
    body: JSON.stringify({}),
    // body: {},
  });
  return res.json();
}

export const updateProduct = async (data) => {
  let storage = JSON.parse(localStorage.getItem('user'))
  const res = await fetch(`${api}product/updateProduct`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "x-access-token": `${storage.token}`
    },
    body: JSON.stringify(data),
    // body: {},
  });
  return res.json();
}