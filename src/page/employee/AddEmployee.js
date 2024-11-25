import React, { useState } from "react";
import InputField from "../../component/InputField";
import Cross from "../../assets/image/cross.png";

const AddEmployee = ({
  show = false,
  onClose = () => {},
  onSubmit = () => {},
  isLoading = false
}) => {
  const [formData, setFormData] = useState({
    employee: "",
    billrate: "",
    department: "",
    payrate: "",
    id: ""
  });
  const [errors, setErrors] = useState({
    employee: "",
    billrate: "",
    department: "",
    payrate: "",
    id: ""
  });
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.employee.trim())
      newErrors.employee = "* Employee name is required.";
    if (!formData.id.trim()) newErrors.id = "* Employee Id is required.";
    if (
      !formData.billrate.trim() ||
      isNaN(formData.billrate) ||
      formData.billrate <= 0
    )
      newErrors.billrate = "* Rate must be a positive number.";
    if (
      !formData.payrate.trim() ||
      isNaN(formData.payrate) ||
      formData.payrate <= 0
    )
      newErrors.payrate = "* Rate must be a positive number.";
    if (!formData.department.trim())
      newErrors.department = "* Department is required.";
    return newErrors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSubmit = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    onSubmit(formData);
    setLoading(false);
    onClose();
  };

  const handleOutsideClick = (e) => {
    if (e.target.classList.contains("addemployee-container")) {
      setErrors({
        employee: "",
        billrate: "",
        department: "",
        payrate: "",
        id: ""
      })
      onClose();
    }
  };

  if (!show) {
    return null;
  }

  return (
    <div className="addemployee-container" onClick={handleOutsideClick}>
      <div className="modal-box-container">
        <img src={Cross} alt="close" className="cross-icon" onClick={onClose} />
        <div className="modal-box">
          <span className="heading">Add Employee</span>
          <div className="input-wrapper">
            <div className="input-field">
              <InputField
                label="Employee Name *"
                type="text"
                name="employee"
                placeholder="Enter Employee Name"
                value={formData.employee}
                onChange={handleInputChange}
                error={errors.employee}
              />
            </div>
            <div className="input-field">
              <InputField
                label="Employee Id *"
                type="text"
                name="id"
                placeholder="Enter Employee Id "
                value={formData.id}
                onChange={handleInputChange}
                error={errors.id}
              />
            </div>

            <div className="input-field">
              <InputField
                label="Bill Rate/Hour *"
                type="number"
                name="billrate"
                placeholder="Enter Rate/Hour"
                value={formData.billrate}
                onChange={handleInputChange}
                error={errors.billrate}
              />
            </div>

            <div className="input-field">
              <InputField
                label="Pay Rate/Hour *"
                type="number"
                name="payrate"
                placeholder="Enter Rate/Hour"
                value={formData.payrate}
                onChange={handleInputChange}
                error={errors.payrate}
              />
            </div>

            <div className="input-field">
              <InputField
                label="Department *"
                type="text"
                name="department"
                placeholder="Enter Department"
                value={formData.department}
                onChange={handleInputChange}
                error={errors.department}
              />
            </div>
          </div>
          <button
            className="submit-button"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? "Creating..." : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddEmployee;
