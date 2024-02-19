import axios from 'axios'
export const deleteUser = async (id) => {
    const res = await axios.delete(`https://upforce-backend-n07k.onrender.com/api/delete/${id}`);
    return res;
}
