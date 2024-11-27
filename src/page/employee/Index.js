import React, { useEffect, useState } from "react";
import Table from "../../component/Table";
import AddEmployee from "./AddEmployee";
import Skeleton from "react-loading-skeleton";
import { employeeColumns } from "../../utils/TableHeader";
import { createEmployee, getEmployee } from "../../api/Function";
import { toast } from "react-toastify";
import Loader from "../../component/Loader";
const Employee = ({ tableColoum, dataToRender }) => {
  const [addEmployee, setaddEmployee] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isFetchingEmp, setIsFetchingEmp] = useState(false);
  const [employeeList, setemployeeList] = useState([]);
  const handleEmployeeModal = () => {
    setaddEmployee(!addEmployee);
  };
  const HandleAddEmployee = async (data) => {
    setIsCreating(true);
    try {
      const payload = {
        name: data?.employee,
        bil_rate: data?.billrate,
        pay_rate: data?.payrate,
        emp_id: data?.id,
        department: data?.department
      };
      const res = await createEmployee(payload);
      if ((res.status = 200)) {
        toast.success("Employee added Successfully");
      }
    } catch (error) {
      console.log("error", error);
      toast.error("oops! something went wrong");
    } finally {
      setIsCreating(false);
      handleEmployeeModal();
      handleGetEmployees();
    }
  };
  const handleGetEmployees = async () => {
    setIsFetchingEmp(true);
    try {
      const res = await getEmployee();
      if (res.status === 200) {
        setemployeeList(res.data);
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsFetchingEmp(false);
    }
  };

  useEffect(() => {
    handleGetEmployees();
  }, []);
  console.log(isFetchingEmp, "isFetchingEmp");

  return (
    <div className="employee-wrapper">
      <div className="button-wrapper">
        <button className="addemployee" onClick={handleEmployeeModal}>
          Add
        </button>
      </div>

      {isFetchingEmp ? (
       <div className="skeleton">
         
           <Skeleton width={200} height={40}  />
       Loading...
     </div>
      ) : (
        <div className="emp-table-wrapper">
          <Table
            dataToRender={employeeList}
            tableColoum={employeeList}
            isEmployeeTable={true}
          />
        </div>
      )}

      <AddEmployee
        show={addEmployee}
        onClose={handleEmployeeModal}
        onSubmit={HandleAddEmployee}
        isLoading={isCreating}
      />
      {isCreating && <Loader />}
    </div>
  );
};

export default Employee;
