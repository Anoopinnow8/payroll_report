import React, { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender
} from "@tanstack/react-table";
import Calender from "../assets/image/calendar.png";
import DatePicker from "react-datepicker";

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
  onAutomateClick = () => {}
}) => {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
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
    <div className={`table-container ${isEmployeeTable ? "addemployee" : ""} `}>
      <div className="action-header">
        <div className="sort-action">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchInput}
            className="search-box"
          />
          <div className="date-picker">
            <DatePicker
              selected={startDate}
              onChange={(update) => {
                setDateRange(update);
              }}
              startDate={startDate}
              endDate={endDate}
              showMonthDropdown={true}
              showYearDropdown={true}
              selectsRange={true}
              dateFormat="yyyy-MM-dd"
              placeholderText="Select a date range"
              isClearable
            />
          </div>
        </div>
        <div className="user-action">
          {showDownload && (
            <span className="download" onClick={onDownload}>
              download
            </span>
          )}
          <button className="automate-btn" onClick={onAutomateClick}>
        
            Automate
          </button>
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
    <div>No data</div>
  );
};

export default Table;
