import axios from 'axios'
export const updateUser = async (id, data) => {
    const res = await axios.put(`https://upforce-backend-n07k.onrender.com/api/edit/${id}`, data);
    return res;
}
