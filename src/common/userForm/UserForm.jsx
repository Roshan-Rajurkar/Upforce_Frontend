import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useParams } from 'react-router-dom';

const schema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  mobile: yup.string().required('Mobile number is required'),
  gender: yup.string().required('Gender is required'),
  status: yup.string().required('Status is required'),
  location: yup.string().required('Location is required'),
});

const UserForm = ({ defaultValues, onSubmit }) => {

const {id} = useParams();

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: defaultValues || {}
  });

  useEffect(() => {
    reset(defaultValues || {});
  }, [defaultValues, reset]);

  const [file, setFile] = useState(defaultValues?.profileImage | '');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const submitHandler = async (data) => {
    if(!id)
    {
      const formData = new FormData();
      formData.append('file', file);
      Object.entries(data).forEach(([key, value]) => {
       formData.append(key, value);
      });  
      onSubmit(formData);
    }
    else{
      onSubmit(data)
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(submitHandler)} className="flex flex-col gap-2 py-4 px-2 shadow-md lg:grid lg:grid-cols-2 lg:gap-4">
        <div className='flex flex-col'>
          <label className='text-md' htmlFor="firstName">First Name</label>
          <input type='text' {...register('firstName')} id='firstName' className='w-full p-1 border-2 outline-none rounded' placeholder='Enter First Name...' />
          {errors.firstName && <p className='text-red-800'>{errors.firstName.message}</p>}
        </div>
        <div className='flex flex-col'>
          <label className='text-md' htmlFor="lastName">Last Name</label>
          <input type='text' {...register('lastName')} id='lastName' className='w-full p-1 border-2 outline-none rounded' placeholder='Enter Last Name...' />
          {errors.lastName && <p className='text-red-800'>{errors.lastName.message}</p>}
        </div>
        <div className='flex flex-col'>
          <label className='text-md' htmlFor="email">Email</label>
          <input type='email' {...register('email')} id='email' className='w-full p-1 border-2 outline-none rounded' placeholder='Enter Email...' />
          {errors.email && <p className='text-red-800'>{errors.email.message}</p>}
        </div>
        <div className='flex flex-col'>
          <label className='text-md' htmlFor="mobile">Mobile</label>
          <input type='text' {...register('mobile')} id='mobile' className='w-full p-1 border-2 outline-none rounded' placeholder='Enter Mobile...' />
          {errors.mobile && <p className='text-red-800'>{errors.mobile.message}</p>}
        </div>
        <div className='flex flex-col'>
          <span className='text-md'>Gender</span>
          <div className='flex gap-2 flex-col'>
            <label className='inline-flex items-center'>
              <input type='radio' {...register('gender')} value='male' className='form-radio' />
              <span className='ml-2'>Male</span>
            </label>
            <label className='inline-flex items-center'>
              <input type='radio' {...register('gender')} value='female' className='form-radio' />
              <span className='ml-2'>Female</span>
            </label>
          </div>
          {errors.gender && <p className='text-red-800'>{errors.gender.message}</p>}
        </div>
        <div className='flex flex-col'>
          <label className='text-md' htmlFor="status">Status</label>
          <select {...register('status')} className='w-full p-1 border-2 outline-none rounded'>
            <option value=''>Status...</option>
            <option value='active'>Active</option>
            <option value='inactive'>Inactive</option>
          </select>
          {errors.status && <p className='text-red-800'>{errors.status.message}</p>}
        </div>
        <div className='flex flex-col '>
          <label className='text-md' htmlFor="location">Enter Your Location</label>
          <input type='text' {...register('location')} id='location' className='w-full p-1 border-2 outline-none rounded' placeholder='Enter Your Location...' />
          {errors.location && <p className='text-red-800'>{errors.location.message}</p>}
        </div>
        <div className='flex flex-col '>
        <label className='text-md' htmlFor="profileImage">Set Your Profile</label>
          <input
            type='file'
            accept='image/*'
            id='profileImage'
            onChange={handleFileChange}
            className='w-full p-1 border-2 outline-none rounded'
          />
          {errors.profileImage && <p className='text-red-800'>{errors.profileImage.message}</p>}
        </div>
        <div className='flex justify-center col-span-2'>
          <button type='submit' className='w-full bg-red-700 p-2 px-3 text-white text-md rounded hover:bg-red-800'>{defaultValues ? 'Update' : 'Submit'}</button>
        </div>
      </form>
    </>
  );
};

export default UserForm;
