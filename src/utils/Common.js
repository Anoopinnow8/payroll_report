export const debounce = (func, delay) => {
  let timer;
  return function(...args){
    clearTimeout(timer);
    timer=setTimeout(()=>func(...args),delay)
}
}

export const handleSearch = (arr, querys) => {
  if (!querys || querys.length === 0) {
    return arr; 
  }

  const query = querys.toLowerCase(); 
  return arr.filter((row) => {
    return Object.values(row).some((value) => {
      if (value !== null && value !== undefined) {
        return String(value).toLowerCase().includes(query);
      }
      return false;
    });
  });
};