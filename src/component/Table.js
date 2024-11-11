import React, { useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender
} from '@tanstack/react-table';

const Table = ({ data = [] }) => {
  

  const columns = useMemo(() => {
    if (!Array.isArray(data) || data.length === 0) return [];

    // return Object.keys(data[0]).map((key) => ({
   
    //   accessorKey: key,  
    //   header: JSON.stringify(key),
    //   // header: 0,
    //   cell: ({ row }) => row.original[key],  
    // }));

    return Object.keys(data[0]).map((key) => ({
      id: JSON.stringify(key),   
      accessorKey: key, 
      header: key,       
      cell: ({ row }) => row.original[key],
    }));


  }, [data]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  console.log(columns, "columns"); 

  return (
    data.length!==0 &&  <div className="table-container">
      <table className="data-table">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
