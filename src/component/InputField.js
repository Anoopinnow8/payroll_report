import React from "react";

const InputField = ({ label, type, name, placeholder, onChange, value, error ,image,handleIconClick=()=>{}}) => {
  return (
    <div className="input-box">
      <span className="input-label">{label}</span>
      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        className={`input ${error ? "input-error" : ""}`} 
        onChange={onChange}
      />
      {image && <img src={image} alt="eye" className="eye" onClick={()=> handleIconClick()}/>}
      {error && <span className="error-message">{error}</span>} 
    </div>
  );
};

export default InputField;
