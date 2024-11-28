import React, { useEffect, useState } from "react";
import Table from "../../component/Table";
import AddEmployee from "./AddEmployee";
import Skeleton from "react-loading-skeleton";
import { handleSearch } from "../../utils/Common";
import { createEmployee, getEmployee } from "../../api/Function";
import { toast } from "react-toastify";
import Loader from "../../component/Loader";
const Employee = ({showModal,onCloseModal=()=>{}}) => {
  const [isCreating, setIsCreating] = useState(false);
  const [isFetchingEmp, setIsFetchingEmp] = useState(false);
  const [employeeList, setemployeeList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

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
      onCloseModal();
      handleGetEmployees();
    }
  };
  const handleGetEmployees = async () => {
    setIsFetchingEmp(true);
    try {
        const res = await getEmployee();
        if (res.status === 200) {
            const reorderedEmployees = res.data.map(employee => {
                const utcDate = new Date(employee.created_at); 
                const istDate = new Date(utcDate.getTime() + (5.5 * 60 * 60 * 1000)); 

                return {
                    Name: employee.name,
                    EmployeeId: employee.id,
                    Department: employee.department,
                    BilRate: employee.bil_rate,
                    PayRate: employee.pay_rate,
                    ID: employee.id,
                    CreatedTime: istDate.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
                
                };
            });

            setemployeeList(reorderedEmployees);
            console.log("Employee data fetched successfully");
        }
    } catch (error) {
        console.log("Error while fetching employee data:", error);
    } finally {
        setIsFetchingEmp(false);
    }
};


  
  const handleSearchInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
  
  };
  const handleClearQuery = () => {
    setSearchQuery("");
  }
  useEffect(() => {
    handleGetEmployees();
  }, []);
  
  const SearchData = handleSearch(employeeList, searchQuery)
  return (
    <div className="employee-wrapper0">
     
      {isFetchingEmp ? (
       <div className="skeleton">
         
           <Skeleton width={200} height={40}  />
       Loading...
     </div>
      ) : (
        <div className="emp-table-wrapper">
          <Table
            dataToRender={SearchData}
            tableColoum={employeeList}
              isEmployeeTable={true}
              searchQuery={searchQuery}
              handleSearchInput={handleSearchInputChange}
              onSearchClear={handleClearQuery}
          />
        </div>
      )}

      <AddEmployee
        show={showModal}
        onClose={onCloseModal}
        onSubmit={HandleAddEmployee}
        isLoading={isCreating}
      />
      {isCreating && <Loader />}
    </div>
  );
};

export default Employee;
