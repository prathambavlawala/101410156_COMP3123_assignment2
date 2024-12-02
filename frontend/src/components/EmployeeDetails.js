import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function EmployeeDetails() {
    const [employee, setEmployee] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchEmployeeDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/employees/${id}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });
                setEmployee(response.data);
            } catch (error) {
                console.error('Error fetching employee details:', error);
            }
        };

        fetchEmployeeDetails();
    }, [id]);

    if (!employee) {
        return <div>Loading...</div>;
    }

    return (
        <div className="employee-details-container">
            <h2>Employee Details</h2>
            <table className="employee-details-table">
                <thead>
                    <tr>
                        <th>Field</th>
                        <th>Details</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Name</td>
                        <td>{employee.name}</td>
                    </tr>
                    <tr>
                        <td>Department</td>
                        <td>{employee.department}</td>
                    </tr>
                    <tr>
                        <td>Position</td>
                        <td>{employee.position}</td>
                    </tr>
                    <tr>
                        <td>Salary</td>
                        <td>{employee.salary}</td>
                    </tr>
                    
                    
                </tbody>
            </table>
        </div>
    );
}

export default EmployeeDetails;
