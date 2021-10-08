import api from '../api/server'


export const getWorkerProduction = async (data) => {
  let storage = JSON.parse(localStorage.getItem('user'))
  const res = await fetch(`${api}worker/getWorkerProduction`, {
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

export const producedUnitsCounter = async (data) => {
  let storage = JSON.parse(localStorage.getItem('user'))
  const res = await fetch(`${api}worker/producedUnitsCounter`, {
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

export const signupWorker = async (data) => {
  let storage = JSON.parse(localStorage.getItem('user'))
  const res = await fetch(`${api}worker/signup`, {
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

export const getWorker = async (data) => {
  let storage = JSON.parse(localStorage.getItem('user'))
  const res = await fetch(`${api}worker/getWorker`, {
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