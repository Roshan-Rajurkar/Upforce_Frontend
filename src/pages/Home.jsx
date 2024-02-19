import React, { useEffect, useState } from 'react';
import Header from '../components/header/Header';
import Pagination from '../components/pagination/Pagination';
import { getAllUsers } from '../services/Get/get';
import { getSearchUsers } from '../services/Get/get';

const Home = () => {
  const [userData, setUserData] = useState([]);

  const fetchUserData = async () => {
    const userData = await getAllUsers();
    setUserData(userData.data);
  };


  const onSearch = async(text) => {
    if (text === '') {
      setUserData(userData); 
    }
    else{
      const res = await getSearchUsers(text);
      setUserData(res.data);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div>
      <Header onSearch={onSearch} />
      <Pagination userList={userData} />
    </div>
  );
};

export default Home;
