import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function EmployeeForm() {
    const [employee, setEmployee] = useState({
        name: '',
        department: '',
        position: '',
        salary: '',
    });
    const { id } = useParams(); // for editing, gets the employee ID from the URL
    const navigate = useNavigate();

    useEffect(() => {
        // If ID is provided, fetch the employee data for editing
        if (id) {
            axios
                .get(`http://localhost:5000/api/employees/${id}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                })
                .then((response) => setEmployee(response.data))
                .catch((error) => console.error('Error fetching employee:', error));
        }
    }, [id]);

    const handleChange = (e) => {
        setEmployee({
            ...employee,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const request = id
            ? axios.put(`http://localhost:5000/api/employees/${id}`, employee, {
                  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
              })
            : axios.post('http://localhost:5000/api/employees', employee, {
                  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
              });

        request
            .then(() => {
                alert(`Employee ${id ? 'updated' : 'added'} successfully`);
                navigate('/employees');
            })
            .catch((error) => console.error('Error saving employee:', error));
    };

    return (
        <div>
            <h2>{id ? 'Edit Employee' : 'Add Employee'}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    value={employee.name}
                    onChange={handleChange}
                    placeholder="Name"
                    required
                />
                <input
                    type="text"
                    name="department"
                    value={employee.department}
                    onChange={handleChange}
                    placeholder="Department"
                    required
                />
                <input
                    type="text"
                    name="position"
                    value={employee.position}
                    onChange={handleChange}
                    placeholder="Position"
                    required
                />
                <input
                    type="number"
                    name="salary"
                    value={employee.salary}
                    onChange={handleChange}
                    placeholder="Salary"
                    required
                />
                <button type="submit">{id ? 'Update Employee' : 'Add Employee'}</button>
            </form>
        </div>
    );
}

export default EmployeeForm;
