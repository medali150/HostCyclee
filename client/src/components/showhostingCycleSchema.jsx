import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
            const response = await axios.get('https://host-cycle-ji9x-jc6rrgn9k-aymens-projects-9ad69811.vercel.app/api/auth/getAllHostingCycles', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
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
            const response = await axios.delete(`https://host-cycle-ji9x-jc6rrgn9k-aymens-projects-9ad69811.vercel.app/api/auth/hostingCycles/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
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
        <nav>
                <Aymen />
            </nav>
        <div className="flex flex-col items-center">
            
            <div className="flex flex-row">
                <Sidebar />
                <div className="flex-1 p-4">
                    <h1 className="text-2xl font-bold text-center mb-4">All Hosting Cycles</h1>
                    {loading ? (
                        <p className="text-center">Loading...</p>
                    ) : error ? (
                        <p className="text-center text-red-500">{error}</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white border border-gray-200 rounded-md shadow-md">
                                <thead>
                                    <tr className="bg-gray-200">
                                        <th className="p-2 text-left">Package Name</th>
                                        <th className="p-2 text-left">Start Date</th>
                                        <th className="p-2 text-left">End Date</th>
                                        <th className="p-2 text-left">Cost</th>
                                        <th className="p-2 text-left">Duration</th>
                                        <th className="p-2 text-left">Image</th>
                                        <th className="p-2 text-left">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {hostingCycles.map((cycle) => (
                                        <tr key={cycle._id} className="hover:bg-gray-100">
                                            <td className="p-2">{cycle.namePAckage}</td>
                                            <td className="p-2">{new Date(cycle.startDate).toLocaleDateString()}</td>
                                            <td className="p-2">{new Date(cycle.endDate).toLocaleDateString()}</td>
                                            <td className="p-2">{cycle.cost}</td>
                                            <td className="p-2">{cycle.duration}</td>
                                            <td className="p-2">
                                                {cycle.image ? (
                                                    <img
                                                        src={cycle.image}
                                                        alt="Cycle"
                                                        className="w-12 h-12 object-cover"
                                                    />
                                                ) : (
                                                    'No Image'
                                                )}
                                            </td>
                                            <td className="p-2">
                                                <button
                                                    onClick={() => deleteHostingCycle(cycle._id)}
                                                    className="bg-red-500 text-white py-1 px-2 rounded"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
        </div>
    );
};

export default HostingCycles;