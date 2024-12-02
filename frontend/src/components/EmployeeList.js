import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function EmployeeList() {
    const [employees, setEmployees] = useState([]); // State to hold employee data
    const navigate = useNavigate();

    // Fetch employees from the backend when the component loads
    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/employees', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });
                setEmployees(response.data);
            } catch (err) {
                console.error('Error fetching employees:', err);
            }
        };
        fetchEmployees();
    }, []);

    // Delete an employee by ID
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this employee?');
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:5000/api/employees/${id}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });
                setEmployees(employees.filter((emp) => emp._id !== id)); // Update state after deletion
                alert('Employee deleted successfully');
            } catch (err) {
                console.error('Error deleting employee:', err);
            }
        }
    };

    return (
        <div>
            <h2>Employee List</h2>
            <button className="add-btn" onClick={() => navigate('/employees/add')}>
                Add Employee
            </button>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Department</th>
                        <th>Position</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.length > 0 ? (
                        employees.map((employee) => (
                            <tr key={employee._id}>
                                <td>{employee.name}</td>
                                <td>{employee.department}</td>
                                <td>{employee.position}</td>
                                <td>
                                    {/* View Button */}
                                    <button
                                        className="view-btn"
                                        onClick={() => navigate(`/employees/${employee._id}`)}
                                    >
                                        View
                                    </button>

                                    {/* Update Button */}
                                    <button
                                        className="update-btn"
                                        onClick={() => navigate(`/employees/edit/${employee._id}`)}
                                    >
                                        Update
                                    </button>

                                    {/* Delete Button */}
                                    <button
                                        className="delete-btn"
                                        onClick={() => handleDelete(employee._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" style={{ textAlign: 'center' }}>
                                No employees found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default EmployeeList;
