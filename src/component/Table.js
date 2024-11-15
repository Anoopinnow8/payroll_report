import React, { useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender
} from '@tanstack/react-table';

const truncateText = (text) => {
  if (text && text.length > 23) {
    return text.substring(0, 24) + '..'; 
  }
  return text;
};

const Table = ({ data = [],dataToRender=[], name = "", isUploadTable = false }) => {


  const columns = useMemo(() => {
    if (!Array.isArray(data) || data.length === 0) return [];

    if (isUploadTable) {
      const firstRow = data[0];  
      return Object.keys(firstRow).map((key) => ({
        id: JSON.stringify(key),
        accessorKey: key,
        header: truncateText(firstRow[key]),
        cell: ({ row }) => {
          const cellData = row.original[key];
          return truncateText(cellData); 
        },
      }));
    }

    return Object.keys(data[0]).map((key) => ({
      id: JSON.stringify(key),
      accessorKey: key,
      header: truncateText(key),
      cell: ({ row }) => {
        const cellData = row.original[key];
        return truncateText(cellData); 
      },
    }));
  }, [data, isUploadTable]);

  const table = useReactTable({
    data: dataToRender, 
    columns,
    getCoreRowModel: getCoreRowModel(),
  });


  return (

    data.length !== 0 ?(
      <div className="table-container">
       
       
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
    )
      : <div>
        No data 
      </div>
  );
};

export default Table;
