import React from 'react';
import UserForm from '../common/userForm/UserForm';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../services/Post/post';
import { toast } from 'react-toastify';
const CreateUser = () => {
  const navigate = useNavigate();

  const handleCreateUser = async (formData) => {
    try {
      const res = await createUser(formData)
      if(res)
        {
          navigate('/');
          toast.success('New User Created Successfully')
        }
    } catch (error) {
      toast.error(error.message)
    }
  };

  return (
    <div>
      <h3 className='text-4xl font-semibold text-center mb-8'>Register Your Details</h3>
      <UserForm user={{}} onSubmit={handleCreateUser} />
    </div>
  );
};

export default CreateUser;
