import React, { useMemo, useState } from "react";
import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";

const truncateText = (text, maxLength = 23) => {
  if (text && text.length > maxLength) {
    return text.substring(0, maxLength) + "..";
  }
  return text;
};

const Table = ({
  tableColoum = [],
  dataToRender = [],
  rowsPerPage = 10,
  isEmployeeTable = false,
  searchQuery = "",
  handleSearchInput,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalRows = dataToRender.length;
  const totalPages = Math.ceil(totalRows / rowsPerPage);
  const paginatedData = useMemo(() => {
    const start = (currentPage-1) * rowsPerPage;
    const end = start + rowsPerPage;
    return dataToRender.slice(start, end);
  }, [dataToRender, currentPage, rowsPerPage]);

  const columns = useMemo(() => {
    if (!Array.isArray(tableColoum) || tableColoum.length === 0) return [];
    return Object.keys(tableColoum[0] || {}).map((key) => ({
      id: JSON.stringify(key),
      accessorKey: key,
      header: truncateText(key),
      cell: ({ row }) => {
        const cellData = row.original[key];
        return truncateText(cellData);
      },
    }));
  }, [tableColoum]);

  const table = useReactTable({
    data: paginatedData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage); 
    }
  };
console.log(dataToRender,"dataToRender");
  return tableColoum.length !== 0 ? (
    <div className={`table-container ${isEmployeeTable ? "addemployee" : ""}`}>
      <div className="action-header">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchInput}
          className="search-box"
        />
      </div>

      <div className="table-wrapper">
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

      <div className="pagination-wrapper">
        <button
          className="pagination-button"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="pagination-button"
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  ) : (
    <div>No data</div>
  );
};

export default Table;

