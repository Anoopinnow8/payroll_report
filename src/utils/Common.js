import moment from "moment-timezone";


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
  console.log(data,"ghghgh")
  if (data) {
   const result= moment.utc(data).local().format("hh:mm A, DD MMM, YYYY");
    return result ;
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

