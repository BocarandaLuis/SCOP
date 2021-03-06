import api from '../api/server'


export const logoutAPI = async () => {
    let storage = JSON.parse(localStorage.getItem('user'))
    const res = await fetch(`${api}auth/logout`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "x-access-token": `${storage.token}`
        },
        body: JSON.stringify({id_us: storage.id_us}),
    });
    return res.json();
}