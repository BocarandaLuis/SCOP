export const createStorage = (key) => {
     localStorage.setItem(key, JSON.stringify([]))
}

export const addStorage = (key, data) => {
     let st = getStorage(key)
     st.push(data)
     localStorage.setItem(key, JSON.stringify(st))
}

export const cleanStorage = (key, data) => {
     localStorage.removeItem(key)
}

export const updateStorage = (key, data) => {
     localStorage.setItem(key, JSON.stringify(data))
}

export const getStorage = (key) => {
     return JSON.parse(localStorage.getItem(key))
}
