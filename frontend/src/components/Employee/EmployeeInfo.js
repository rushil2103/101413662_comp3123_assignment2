import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const EmployeeInfo = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState();

  useEffect(() => {
    axios
      .get(`http://localhost:8090/api/v1/emp/employee/${id}`)
      .then((res) => setEmployee(res.data))
      .catch((err) => alert(err.response?.data?.message || 'Error fetching employee details'));
  }, [id]);

  if (!employee) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Employee Information</h2>
      <div>
        <p><strong>First Name:</strong> {employee.first_name}</p>
        <p><strong>Last Name:</strong> {employee.last_name}</p>
        <p><strong>Email:</strong> {employee.email}</p>
        <p><strong>Position:</strong> {employee.position}</p>
        <p><strong>Salary:</strong> {employee.salary}</p>
        <p><strong>Date of Joining:</strong> {employee.date_of_joining}</p>
        <p><strong>Department:</strong> {employee.department}</p>
      </div>
    </div>
  );
};

export default EmployeeInfo;
