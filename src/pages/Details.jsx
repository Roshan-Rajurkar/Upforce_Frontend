import React, { useEffect, useState } from 'react';
import { getUserById } from '../services/Get/get';
import { useParams } from 'react-router-dom';

const Details = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUserById(id); 
        setUser(userData.data); 
      } catch (error) {
        console.error('Error fetching user details:', error.message);
      }
    };

    fetchUser();
  }, [id]);

  if(!user) return <p>Loading...</p>

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-4">
        <img
          src={user?.profileImage} 
          alt="user"
          className="w-12 h-12 rounded-full mr-4 object-cover" 
        />
        <div>
          <h2 className="text-lg font-semibold">{`${user?.firstName} ${user?.lastName}`}</h2> 
          <p className="text-gray-600">{user?.email}</p> 
          <p className="text-gray-600">{user?.mobile}</p> 
        </div>
      </div>

      <div className="flex justify-between">
        <div className="flex flex-col">
          <span className="font-semibold">Gender</span>
          <span>{user.gender === 'male' ? 'M' : 'F'}</span>
        </div>
        <div className="flex flex-col">
          <span className="font-semibold">Location</span>
          <span>{user.location}</span> 
        </div>
        <div className="flex flex-col">
          <span className="font-semibold">Status</span>
          <span className={user.status === 'active' ? 'text-green-600' : 'text-red-600'}>{user.status}</span> {/* Display user's status with appropriate color */}
        </div>
      </div>
    </div>
  );
};

export default Details;
