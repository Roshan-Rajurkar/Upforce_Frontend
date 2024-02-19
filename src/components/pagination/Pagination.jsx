import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import { deleteUser } from '../../services/Delete/delete';
import { toast } from 'react-toastify';
const Pagination = ({ userList }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 6;
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = userList.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(userList.length / usersPerPage);

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const [statusList, setStatusList] = useState(userList.map(user => user.Status));

  const handleDeleteuser = (id) => {
    try {
      const res = deleteUser(id);
      if(res){
        toast.success('User Deleted')
        window.location.reload();
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const renderUserRows = () => {
    return currentUsers.map((user, index) => (
      <tr key={user._id}>
        <td className="px-4 py-4">{indexOfFirstUser + index + 1}</td>
        <td className="px-4 py-2">{user.firstName} {user.lastName}</td>
        <td className="px-4 py-2">{user.email}</td>
        <td className="px-4 py-2">{user.gender === 'male' ? 'M' : 'F'}</td>
        <td className="px-4 py-2">
          <select
            value={statusList[indexOfFirstUser + index]}
            onChange={(e) => handleStatusChange(indexOfFirstUser + index, e.target.value)}
            className='bg-red-700 text-white rounded'
          >
            <option value='Active'>Active</option>
            <option value='Inactive'>Inactive</option>
          </select>
        </td>
        
        <td className="px-4 py-2">
        <img src={user?.profileImage} alt='User' className='w-12 h-12 rounded-full object-cover'/>
        </td>
        <td className="px-4 py-2" onClick={() => toggleTooltip(indexOfFirstUser + index)}>
          <span className='text-xl font-bold hover:cursor-pointer'><PiDotsThreeOutlineVerticalFill/></span>
          {tooltipStates[indexOfFirstUser + index] && <div className="absolute bg-white border border-gray-300 p-2 rounded shadow-md flex flex-col w-28 gap-2">
            <Link to={`/details/${user._id}`} className='flex gap-1 items-center text-red-800'>
              <span  className='text-md text-green-600'><FaEye/></span>
              <span>View</span>
            </Link>
            <Link to={`/edit/${user._id}`} className='flex gap-1 items-center text-red-800'>
              <span className='text-md text-blue-600'><FaEdit/></span>
              <span>Edit</span>
            </Link>
            <Link to={''} onClick={()=> handleDeleteuser(user._id)} className='flex gap-1 items-center'>
              <span className='text-md text-red-600'> <MdDelete/></span>
              <span>Delete</span>
            </Link>
          </div>}
        </td>
      </tr>
    ));
  };

  const handleStatusChange = (index, value) => {
    setStatusList((prevStatusList) => {
      const updatedStatusList = [...prevStatusList];
      updatedStatusList[index] = value;
      return updatedStatusList;
    });
  };

  const [tooltipStates, setTooltipStates] = useState(Array(userList.length).fill(false));
  const toggleTooltip = (index) => {
    const newTooltipStates = [...tooltipStates];
    newTooltipStates[index] = !newTooltipStates[index];
    setTooltipStates(newTooltipStates);
  };


  return (
    <div className="overflow-x-auto mt-8">
      <table className="mx-auto w-full shadow-md">
        <thead className="bg-black text-white">
          <tr>
            <th className="px-4 py-2 text-start">ID</th>
            <th className="px-4 py-2 text-start">FullName</th>
            <th className="px-4 py-2 text-start">Email</th>
            <th className="px-4 py-2 text-start">Gender</th>
            <th className="px-4 py-2 text-start">Status</th>
            <th className="px-4 py-2 text-start">Profile</th>
            <th className="px-4 py-2 text-start">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {userList.length > 0 ? renderUserRows() : <tr className="px-4 py-2 flex grow">
            <td>No user available</td>
            </tr>}
        </tbody>
      </table>

      {
        userList.length > 0 ? <div className="flex justify-end mt-4">
        <button onClick={handlePrevPage} disabled={currentPage === 1} className={`p-2 border-2 border-red text-sm text-red-800 ${currentPage===1 && 'text-slate-300'}`} ><FaChevronLeft/></button>
        <span  className='bg-red-100 py-2 px-4' >{currentPage} </span>
        <button className={`p-2 border-2 border-red text-sm text-red-800 ${currentPage===totalPages && 'text-slate-300'}`}  onClick={handleNextPage} disabled={currentPage === totalPages}><FaChevronRight/></button>
      </div> : ""
      }
    </div>
  );
};

export default Pagination;
