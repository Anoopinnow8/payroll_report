import React, { useState } from "react";
import Logo from "../assets/image/payrolllogo.png";
import User from "../assets/image/user.png";
import Upload from "../assets/image/upload.png";
import Convert from "../assets/image/convert.png";
import DropDown from "../assets/image/dropdown.png";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { Automate, DownArrow } from "../assets/image";
const Navbar = ({
  onUploadClick = () => {},
  handleFileUpload = () => {},
  fileInputRef,
  isAutomatate, automateDisable,
  
  onConvertClick = () => {},
  uploadDisable,
  convertDisable,
  onLogout = () => {},
  onAutomate = () => {},
  onDateSelect = () => {},
  onShowCalandar = () => {},
  showCalendar,
  dateRange,
  startDate,
  endDate,lastAutofetchTime
}) => {
  const [showModal, setshowModal] = useState(false);

  const handleShowUserBox = () => {
    setshowModal(!showModal);
  };

  const handleDateChange = (ranges) => {
    onDateSelect([ranges.selection]);
  };
  return (
    <div className="navbar-container">
      <div className="navbar-wrapper">
        <img src={Logo} alt="logo" lazy="loading" className="logo" />
        <div className="automate-box">
          <div className="date-box">
            <span className="date">
              {startDate} - {endDate}
            </span>
            <img
              src={DropDown}
              alt="drop_icon"
              className="drop-icon"
              onClick={onShowCalandar}
            />
            <div className="calandar-wrapper">
              {showCalendar && (
                <DateRangePicker
                  ranges={dateRange}
                  onChange={handleDateChange}
                  showSelectionPreview={true}
                  moveRangeOnFirstSelection={false}
                  editableDateInputs={true}
                  months={1}
                  direction="horizontal"
                  className="date-range-picker"
                  
                />
              )}
            </div>
          </div>
          <button
            className="automate-btn"
            disabled={automateDisable}
            onClick={onAutomate}
          >
            <img src={Automate} alt="upload" className="icon" lazy="loading" />
            {isAutomatate ? "Automating..." : "Automate"}
          </button>
        { automateDisable && <span className="last-fetched"> Last fetched <span className="time">{lastAutofetchTime} </span></span>}
        </div>
        <div className="user-profile">
          <div className="action">
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
        </div>
      </div>
      <div className="user-info-wrapper">
        <div className="rod"> </div>
        <div className="user-box">
          <span className="text">
            welecome, <span className="name">username </span>
          </span>
          <img
            src={DownArrow}
            alt="down"
            lazy="loading"
            className="aroow"
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
            
              Logout
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
