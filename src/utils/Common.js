

export const handleSearch = (arr, querys) => {
  if (!querys || typeof querys !== 'string' || querys.trim().length === 0) {
    return arr; 
  }
  const query = querys?.toLowerCase(); 

  return arr.filter((row) => {
    return Object.values(row).some((value) => {
      if (value !== null && value !== undefined) {
        return String(value).toLowerCase().includes(query);
      }
      return false;
    });
  });
};
