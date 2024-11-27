import React, { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender
} from "@tanstack/react-table";
import Calender from "../assets/image/calendar.png";

const truncateText = (text) => {
  if (text && text.length > 23) {
    return text.substring(0, 24) + "..";
  }
  return text;
};

const Table = ({
  tableColoum = [],
  dataToRender = [],
  name = "",
  isUploadTable = false,
  isEmployeeTable = false,
  searchQuery = "",
  setSearchQuery = () => {},
  onDownload = () => {},
  showDownload = false,
  handleSearchInput,
  onAutomateClick = () => {},
  lastFileConverted
}) => {
  const columns = useMemo(() => {
    if (!Array.isArray(tableColoum) || tableColoum.length === 0) return [];

    if (isUploadTable) {
      const firstRow = tableColoum[0];
      return Object.keys(firstRow).map((key) => ({
        id: JSON.stringify(key),
        accessorKey: key,
        header: truncateText(firstRow[key]),
        cell: ({ row }) => {
          const cellData = row.original[key];
          return truncateText(cellData);
        }
      }));
    }

    return Object.keys(tableColoum[0]).map((key) => ({
      id: JSON.stringify(key),
      accessorKey: key,
      header: truncateText(key),
      cell: ({ row }) => {
        const cellData = row.original[key];
        return truncateText(cellData);
      }
    }));
  }, [tableColoum, isUploadTable]);

  const table = useReactTable({
    data: dataToRender,
    columns,
    getCoreRowModel: getCoreRowModel()
  });

  return tableColoum.length !== 0 ? (
    <div className='table-container'>
      <div className="action-header">
        <div className="sort-action">
        
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchInput}
            className="search-box"
          />
        </div>
        <div className="user-action">

           {lastFileConverted && (
            <div className="converted-info">
              <span className="heading">Last Converted  </span>
              <span className="info"> {lastFileConverted}</span>
            </div>
          )}
        </div>
      </div>
      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
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
    </div>
  ) : (
      <div className='table-container' >
        <div className="no-data">    No data </div>
     
      </div>
  );
};

export default Table;
