import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './show.css';
import Sidebar from '../Chat/Chat1';
import Aymen from '../dash/header';

const HostingCycles = () => {
    const [hostingCycles, setHostingCycles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Function to fetch all hosting cycles
    const fetchHostingCycles = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:4000/api/auth/getAllHostingCycles', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            setHostingCycles(response.data.data);
            setLoading(false);
        } catch (error) {
            setError('Failed to fetch hosting cycles');
            setLoading(false);
        }
    };

    // Function to delete a hosting cycle
    const deleteHostingCycle = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:4000/api/auth/hostingCycles/${id}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (response.data.success) {
                // Remove the deleted hosting cycle from the state
                setHostingCycles(hostingCycles.filter((cycle) => cycle._id !== id));
                alert('Hosting cycle deleted successfully');
            }
        } catch (error) {
            alert('Failed to delete hosting cycle');
        }
    };

    useEffect(() => {
        fetchHostingCycles();
    }, []);

    return (
        <div>
            <Aymen />
        <div className="hosting-cycles">
            <Sidebar/>
            <h1>All Hosting Cycles</h1>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Package Name</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Cost</th>
                            <th>Duration</th>
                            <th>Actions</th> {/* Added Actions column */}
                        </tr>
                    </thead>
                    <tbody>
                        {hostingCycles.map((cycle) => (
                            <tr key={cycle._id}>
                                <td>{cycle.namePAckage}</td>
                                <td>{new Date(cycle.startDate).toLocaleDateString()}</td>
                                <td>{new Date(cycle.endDate).toLocaleDateString()}</td>
                                <td>{cycle.cost}</td>
                                <td>{cycle.duration}</td>
                                <td>
                                    <button onClick={() => deleteHostingCycle(cycle._id)}>Delete</button> {/* Delete button */}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
        </div>
    );
};

export default HostingCycles;
