import React, { useState } from "react";
import Logo11 from "../assets/image/payrolllogo.png";
import {
  Upload,
  Convert,
  DropDown,
  Automate,
  DownArrow,
  Logo,
  UploadDisable,
  ConvertDisable,
  UserIcon,Logout
} from "../assets/image";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
const Navbar = ({
  onUploadClick = () => {},
  handleFileUpload = () => {},
  fileInputRef,
  isAutomatate,
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
  endDate,
  lastAutofetchTime,
  lastFileConverted
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
          <div className="action-box">
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
              disabled={isAutomatate}
              onClick={onAutomate}
            >
              <img
                src={Automate}
                alt="upload"
                className="icon"
                lazy="loading"
              />
              {isAutomatate ? "Automating..." : "Automate"}
            </button>
          </div>

          {isAutomatate ? (
          lastAutofetchTime &&  <span className="last-fetched">
            
              Intiated At : <span className="time">{lastAutofetchTime} </span>
            </span>
          ) : (
            lastFileConverted !=="" && <span className="last-fetched">
            
              Last Converted  : <span className="time">{lastFileConverted} </span>
            </span>
          )}

        
        </div>
        <div className="user-profile">
          <div className="action">
            <button
              className="button"
              disabled={uploadDisable}
              onClick={onUploadClick}
            >
              <img
                src={uploadDisable ? UploadDisable : Upload}
                alt="upload"
                className="icon"
                lazy="loading"
              />
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
              <img
                src={convertDisable ? ConvertDisable : Convert}
                alt="upload"
                className="icon"
                lazy="loading"
              />
              Convert File
            </button>
          </div>
        </div>
      </div>
      <div className="user-info-wrapper">
        <div className="rod"> </div>
        <div className="user-box">
          {/* <span className="text">
            Welecome, <span className="name">UserName </span>
          </span>
          <img
            src={UserIcon}
            alt="user-icon"
            lazy="loading"
            className="user-icon"
            onClick={handleShowUserBox}
          />
          <img
            src={DownArrow}
            alt="down"
            lazy="loading"
            className="aroow"
            onClick={handleShowUserBox}
          /> */}
          <button className="logoutbutton" onClick={onLogout}>
          <img
                src={Logout}
                alt="logout"
                className="icon"
                lazy="loading"
              />
              Logout
            </button>
        </div>
      </div>
      {/* {showModal && (
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
      )} */}
    </div>
  );
};

export default Navbar;
