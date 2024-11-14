import React, { useState } from "react";
import { useNavigate } from "react-router";
import InputField from "../component/InputField";
import { toast } from "react-toastify";
import openeye from "../assets/image/eyes.png"
import closeeye from "../assets/image/eye.png"


const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({ username: "", password: "" });
  const [passwordType, setPasswordType] = useState(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    let formValid = true;
    let newErrors = {};

    if (!formData.username) {
      newErrors.username = "* Username is required";
      formValid = false;
    } 

    if (!formData.password) {
      newErrors.password = "* Password is required";
      formValid = false;
    }
    setErrors(newErrors);
    return formValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const response = await fetch(
        "https://n4om1187nj.execute-api.us-east-2.amazonaws.com/dev/users/login/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
           
          },
          body: JSON.stringify({
            username: formData.username, 
            password: formData.password
          })
        }
      );

      const result = await response.json();
      if (response.ok) {
        toast.success("Welcome Back !!");
        navigate("/home");
        localStorage.setItem("access_token", result.access_token);
        localStorage.setItem("refresh_token", result.refresh_token);
   

      } else {
        toast.error(result.error );
      }
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleShowPassword = () => {
    setPasswordType(!passwordType);
  };

  return (
    <div className="signin-wrapper">
      <div className="signin-box">
        <div className="logo">
          {/* <img src={logo} alt="logo" className="image" /> */}
        </div>
        <div className="input-container">
          <span className="title">Hey friend! Welcome back</span>
          <form onSubmit={handleSubmit}>
            <InputField
              label="User Name"
              type="text"
              name="username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleInputChange}
              error={errors.username}
            />
            <InputField
              label="Password"
              type={passwordType ? "password" : "text"}
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleInputChange}
              error={errors.password}
              image={passwordType?closeeye:openeye}
              handleIconClick={handleShowPassword}
            />
            <button className="button" type="submit" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
