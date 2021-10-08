import api from '../api/server'


export const getReportWorkerProduction = async () => {
  let storage = JSON.parse(localStorage.getItem('user'))
  const res = await fetch(`${api}reportWorker/`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "x-access-token": `${storage.token}`
    },
    body: JSON.stringify({}),
  });
  return res.json();
}