import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Employee.css';

const Employee = () => {
  const [employees, setEmployees] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [searchCriteria, setSearchCriteria] = useState('department');
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:8090/api/v1/emp/employee')
      .then((res) => setEmployees(res.data))
      .catch((err) => alert(err.response?.data?.message || 'Error fetching employees'));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8090/api/v1/emp/employee/${id}`)
      .then(() => {
        alert('Employee deleted successfully');
        setEmployees((prev) => prev.filter((emp) => emp._id !== id));
      })
      .catch((err) => alert(err.response?.data?.message || 'Error deleting employee'));
  };

  const filteredEmployees = employees.filter((emp) => {
    const value = searchValue.toLowerCase();
    if (searchCriteria === 'id') return emp._id.toLowerCase().includes(value);
    if (searchCriteria === 'department') return emp.department?.toLowerCase().includes(value);
    if (searchCriteria === 'position') return emp.position?.toLowerCase().includes(value);
    return true;
  });

  return (
    <div>
      <h2>Employee Management</h2>
      <button className="add-button" onClick={() => navigate('/employee/add')}>
        Add Employee
      </button>

      <div className="search-container">
        <select
          value={searchCriteria}
          onChange={(e) => setSearchCriteria(e.target.value)}
          className="search-select"
        >
          <option value="department">Department</option>
          <option value="position">Position</option>
          <option value="id">ID</option>
        </select>
        <input
          type="text"
          placeholder={`Search by ${searchCriteria}`}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="search-input"
        />
      </div>

      <h3>Employee List</h3>
      <ul>
        {filteredEmployees.map((emp) => (
          <li key={emp._id}>
            {emp.first_name} {emp.last_name} - {emp.email}
            <button onClick={() => navigate(`/employee/${emp._id}`)}>Info</button>
            <button onClick={() => navigate(`/employee/edit/${emp._id}`)}>Edit</button>
            <button onClick={() => handleDelete(emp._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Employee;
