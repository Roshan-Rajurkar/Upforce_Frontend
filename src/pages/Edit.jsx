import React, { useEffect, useState } from 'react';
import UserForm from '../common/userForm/UserForm';
import { getUserById } from '../services/Get/get';
import { useParams } from 'react-router-dom';
import { updateUser } from '../services/Edit/edit';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const EditUser = () => {
  const navigate = useNavigate()
  const { id } = useParams();
  const [existingUser, setExistingUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getUserById(id);
        setExistingUser(res.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    fetchUser();
  }, [id]);

  const handleEditUser = async (formData) => {
    try {
      const res = await updateUser(id, formData)
      if(res.status === 200)
      {
        navigate('/')
        toast.success('User Updated')
      }
      else{
        toast.error(res.message);
      }
      console.log(res)
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      <h3 className='text-4xl font-semibold text-center mb-8'>Edit Your Details</h3>
      {existingUser && <UserForm defaultValues={existingUser} onSubmit={handleEditUser} />}
    </div>
  );
};

export default EditUser;
