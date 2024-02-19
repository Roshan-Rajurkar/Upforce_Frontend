import React, { useState } from 'react'

const SearchInput = ({onSearch}) => {
    const [search, setSearch] = useState('');

    const SearchUsers = () => {
      if(search !== '')
        onSearch(search.trim().toLowerCase())
      else window.location.reload();
    }

  return (
    <div className='flex gap-2'>
      <input className='border-2 border-slate-300 px-3 rounded w-64 outline-none' placeholder='Search...' type='text' value={search} onChange={(e) => setSearch(e.target.value) }/>
      <button onClick={SearchUsers} className='bg-red-700 p-2 px-3 text-white text-md rounded hover:bg-red-800'>Search</button>
    </div>
  )
}

export default SearchInput
