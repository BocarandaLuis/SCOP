import api from '../api/server'

// obtiene la solo el registro de produccion del obrero 
// para la fecha actual, solo si aun no a sido cancelado
export const getProductionAmount = async (data) => {
  let storage = JSON.parse(localStorage.getItem('user'))
  const res = await fetch(`${api}payment/`, {
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

// obtiene todos los registros de produccion de los obreros,
// que no hallan sido cancelados
export const getAllProductionAmount = async (data) => {
  let storage = JSON.parse(localStorage.getItem('user'))
  const res = await fetch(`${api}payment/getList`, {
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

// se registra la ejecucion de el(los) pagos de la produccion que 
export const paymentExecution = async (data) => {
  let storage = JSON.parse(localStorage.getItem('user'))

  const res = await fetch(`${api}payment/paymentExecution`, {
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

export const getPayment = async (data) => {
  let storage = JSON.parse(localStorage.getItem('user'))

  const res = await fetch(`${api}payment/getPayment`, {
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