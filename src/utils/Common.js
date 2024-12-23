

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


export const handleLastConvertedTime = (data) => {
  if (data) {
    const dateObj = new Date(data);

    // IST Offset
    const IST_OFFSET = 5.5 * 60 * 60 * 1000;
    const istDateObj = new Date(dateObj.getTime() + IST_OFFSET);

    const day = istDateObj.getDate().toString().padStart(2, "0");
    const month = istDateObj.toLocaleString('default', { month: 'short' }); // Get abbreviated month name
    const year = istDateObj.getFullYear();

    let hours = istDateObj.getHours();
    const minutes = istDateObj.getMinutes().toString().padStart(2, "0");
    const amPm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;

    // Ensure two-digit hour formatting
    const formattedHours = hours.toString().padStart(2, "0");

    // Format in the desired way
    const formattedTime = `${formattedHours}:${minutes} ${amPm}`;
    const formattedDate = `${day} ${month} ${year}`;

    return `${formattedTime} , ${formattedDate}`;
  } else {
    return " ";
  }
};



export   const formatDate = (date) => {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
};

