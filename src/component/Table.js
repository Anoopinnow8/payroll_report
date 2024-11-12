import React, { useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender
} from '@tanstack/react-table';
import cross from "../assets/image/cross.png";

const truncateText = (text) => {
  if (text && text.length > 23) {
    return text.substring(0, 24) + '..'; 
  }
  return text;
};

const Table = ({ data = [] ,name=""}) => {
  const columns = useMemo(() => {
    if (!Array.isArray(data) || data.length === 0) return [];
    
    return Object.keys(data[0]).map((key) => ({
      id: JSON.stringify(key),
      accessorKey: key,
      header: truncateText(key),
      cell: ({ row }) => {
        const cellData = row.original[key];
        return truncateText(cellData); 
      },
    }));
  }, [data]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  console.log(columns, "columns");

  return (
    data.length !== 0 && (
      <div className="table-container">
        {/* <img src={cross} alt="icon" className="cross"/> */}
       
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
  );
};

export default Table;
