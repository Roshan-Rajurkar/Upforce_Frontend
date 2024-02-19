import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Paginator } from 'primereact/paginator';

const userData = [
  {
    'ID' : 1,
    'FullName' : "Test",
    'Email' : "test@gmail.com",
    'Gender' : "F",
    'Status' : 'Active',
    'Profile' : '',
    'Action' : ''
  },
  {
    'ID' : 1,
    'FullName' : "Test",
    'Email' : "test@gmail.com",
    'Gender' : "F",
    'Status' : 'Inactive',
    'Profile' : '',
    'Action' : ''
  },
  {
    'ID' : 1,
    'FullName' : "Test",
    'Email' : "test@gmail.com",
    'Gender' : "F",
    'Status' : 'Active',
    'Profile' : '',
    'Action' : ''
  },
];

const UserTable = () => {
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(5);

  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
  };

  const onRowsChange = (event) => {
    setRows(event.target.value);
  };

  // Custom component to render status dropdown
  const statusBodyTemplate = (rowData) => {
    return (
      <select value={rowData.Status} onChange={(e) => handleStatusChange(e.target.value)}>
        <option value='Active'>Active</option>
        <option value='Inactive'>Inactive</option>
      </select>
    );
  };

  // Custom action template
  const actionBodyTemplate = () => {
    return (
      <div className="tooltip">
        <span className="tooltip-text">
          <a href="#">View</a>
          <br />
          <a href="#">Edit</a>
          <br />
          <a href="#">Delete</a>
        </span>
        <span className='text-xl font-bold hover:cursor-pointer'>:</span>
      </div>
    );
  };

  const handleStatusChange = (value) => {
    // Handle status change logic here
    console.log('Status changed:', value);
  };

  return (
    <div>
      <DataTable value={userData} first={first} rows={rows} totalRecords={userData.length}
                 onPage={onPageChange} paginator>
        <Column field="ID" header="ID" />
        <Column field="FullName" header="Full Name" />
        <Column field="Email" header="Email" />
        <Column field="Gender" header="Gender" />
        <Column field="Status" header="Status" body={statusBodyTemplate} />
        <Column field="Profile" header="Profile" />
        <Column field="Action" header="Action" body={actionBodyTemplate} />
      </DataTable>
    
    </div>
  );
};

export default UserTable;
