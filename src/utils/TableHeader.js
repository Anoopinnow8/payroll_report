export const employeeColumns = (tableColumns) => {
  return Object.keys(tableColumns[0]).map((key) => ({
    id: key,
    accessorKey: key,
    header: ({ column }) => (
      <span
        onClick={() => column.toggleSorting()}
        style={{ cursor: 'pointer' }}
      >
        {truncateText(key)} 
      </span>
    ),
    cell: ({ row }) => {
      const cellData = row.original[key];
      return <span>{truncateText(cellData)}</span>; 
    },
  }));
};

const truncateText = (text, maxLength = 20) => {
  if (typeof text === 'string' && text.length > maxLength) {
    return text.substring(0, maxLength) + '...';
  }
  return text;
};
