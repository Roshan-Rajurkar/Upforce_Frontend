import axios from "axios";

export const createUser = async (formData) => {
    try {
        const res = await axios.post('https://upforce-backend-n07k.onrender.com/api/createUser', formData);
        return res;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
}