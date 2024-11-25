import React, { useState } from "react";
import Logo from "../assets/image/payrolllogo.png";
import User from "../assets/image/user.png";
import Upload from "../assets/image/upload.png";
import Convert from "../assets/image/convert.png";
import DatePicker from "react-datepicker";

const Navbar = ({
  onUploadClick = () => {},
  handleFileUpload = () => {},
  fileInputRef,
  onConvertClick = () => {},
  uploadDisable,
  convertDisable,
  onLogout = () => {},
  onAutomate = () => {}
}) => {
  const [showModal, setshowModal] = useState(false);
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const handleShowUserBox = () => {
    setshowModal(!showModal);
  };
  return (
    <div className="navbar-container">
      <div className="navbar-wrapper">
        <img src={Logo} alt="logo" lazy="loading" className="logo" />
        <div className="user-profile">
          <div className="action">
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
            <button className="button" disabled={false} onClick={onAutomate}>
              <img src={Convert} alt="upload" className="icon" lazy="loading" />
              Automate
            </button>
            <button
              className="button"
              disabled={uploadDisable}
              onClick={onUploadClick}
            >
              <img src={Upload} alt="upload" className="icon" lazy="loading" />
              Upload File
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                accept=".csv, .xlsx"
                onChange={handleFileUpload}
              />
            </button>

            <button
              className="button"
              disabled={convertDisable}
              onClick={onConvertClick}
            >
              <img src={Convert} alt="upload" className="icon" lazy="loading" />
              Convert File
            </button>
          </div>
          <img
            src={User}
            alt="user"
            lazy="loading"
            className="user"
            onClick={handleShowUserBox}
          />
        </div>
      </div>
      {showModal && (
        <div className="user-modal-container">
          <div className="header">
            <span className="name-text">User Name</span>
            <span className="email-text">user@gmail.com</span>
          </div>
          <div className="seprator"> </div>

          <div className="footer">
            <span className="text" onClick={onLogout}>
              {" "}
              Logout
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
