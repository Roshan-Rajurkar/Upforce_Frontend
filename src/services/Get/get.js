import axios from 'axios'

export const getAllUsers = async () => {
    const res = await axios.get('https://upforce-backend-n07k.onrender.com/api/allUsers')
    return res.data;
}

export const getUserById = async (id) => {
    const res = await axios.get(`https://upforce-backend-n07k.onrender.com/api/getUser/${id}`)
    return res.data;
}

export const getSearchUsers = async (text) => {
    const res = await axios.get(`https://upforce-backend-n07k.onrender.com/api/getSearchUsers/${text}`)
    return res.data;
}

