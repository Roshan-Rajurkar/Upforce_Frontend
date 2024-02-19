import React from 'react';
import SearchInput from '../searchInput/SearchInput';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
const Header = ({onSearch}) => {
  const downloadCsv = async() =>{
    try {
      window.open("https://upforce-backend-n07k.onrender.com/api/export2csv");
        toast.success('Csv file downloaded')
    } catch (error) {
      toast.error('Error in downloading csv File')
    }
  }
  return (
    <div className='flex flex-col sm:flex-row justify-between items-center'>
      <SearchInput onSearch={onSearch} />
      <div className='flex gap-2 mt-2 sm:mt-0'>
        <Link to='/create' className='bg-red-700 text-white text-md rounded p-1 flex items-center hover:bg-red-800'>
          <span className='flex items-center gap-1'> <b className='text-2xl'>+</b> Add User</span>
        </Link>
        <button onClick={downloadCsv} className='bg-red-700 text-white text-md rounded p-2 flex items-center hover:bg-red-800'>
          <span>Export to CSV</span>
        </button>
      </div>
    </div>
  );
};

export default Header;
