import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddEmployee = () => {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const handleChange = ({ target: { name, value } }) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8090/api/v1/emp/employee', formData);
      alert('Employee added successfully');
      navigate('/employee');
    } catch (error) {
      alert(error.response?.data?.message || 'Error adding employee');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      <h2>Add New Employee</h2>
      <form onSubmit={handleSubmit}>
        {['first_name', 'last_name', 'email', 'position', 'salary', 'date_of_joining', 'department'].map((field) => (
          <div key={field} style={{ marginBottom: '10px' }}>
            <input
              type={field === 'email' ? 'email' : field === 'date_of_joining' ? 'date' : 'text'}
              name={field}
              placeholder={field.replace('_', ' ').toUpperCase()}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            />
          </div>
        ))}
        <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer' }}>Add Employee</button>
      </form>
    </div>
  );
};

export default AddEmployee;
