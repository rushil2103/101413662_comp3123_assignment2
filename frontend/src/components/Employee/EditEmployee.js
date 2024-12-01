import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({
    first_name: '',
    last_name: '',
    email: '',
    position: '',
    salary: '',
    date_of_joining: '',
    department: '',
  });

  useEffect(() => {
    axios
      .get(`http://localhost:8090/api/v1/emp/employee/${id}`)
      .then((res) => {
        const data = res.data;
        setEmployee({
          ...data,
          date_of_joining: data.date_of_joining.split('T')[0],
        });
      })
      .catch((err) =>
        alert(err.response?.data?.message || 'Error fetching employee details')
      );
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8090/api/v1/emp/employee/${id}`, employee)
      .then(() => {
        alert('Employee updated successfully');
        navigate('/');
      })
      .catch((err) =>
        alert(err.response?.data?.message || 'Error updating employee')
      );
  };

  return (
    <div>
      <h2>Edit Employee</h2>
      <form onSubmit={handleSubmit}>
        {['first_name', 'last_name', 'email', 'position', 'salary', 'date_of_joining', 'department'].map((field) => (
          <div key={field}>
            <input
              type={field === 'email' ? 'email' : field === 'date_of_joining' ? 'date' : 'text'}
              name={field}
              placeholder={field.replace('_', ' ').toUpperCase()}
              value={employee[field]}
              onChange={handleChange}
              required
            />
          </div>
        ))}
        <button type="submit">Update Employee</button>
      </form>
    </div>
  );
};

export default EditEmployee;
