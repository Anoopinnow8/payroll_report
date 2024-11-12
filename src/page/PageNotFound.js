import React from 'react'
import { useNavigate } from 'react-router';

const PageNotFound = () => {
  const isUserLoggedIn = localStorage.getItem('access_token');
  const navigate = useNavigate();
  
  const handleback = () => {
    if (isUserLoggedIn){
      navigate("/home");
    }
    else {
      navigate("/login");
    }
  
}

  return (
    <div className="pagenotfound-container">
      <div className="box">
        <span className="text">Page Not Found! </span>
        <button onClick={() => handleback()} className="btn"> Go Home</button>
        </div>
    </div>
  )
}

export default PageNotFound