import React, { useState } from 'react';
import axios from 'axios';
import './package.css';

import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faPlus, faEye, faUserPlus, faUsers } from '@fortawesome/free-solid-svg-icons';
import Aymen from '../dash/header';

const Package = () => {
    const [formData, setFormData] = useState({
        namePAckage: '',
        startDate: '',
        endDate: '',
        cost: '',
        duration: '',
        image: '', // Added field for image URL
        description: '' // Added field for description
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('https://host-cycle-ji9x.vercel.app/api/auth/registerHostingCycle', formData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (response.data.success) {
                alert('Hosting cycle added successfully');
            } else {
                alert(`Error: ${response.data.message}`);
            }
        } catch (error) {
            alert('Server error: Unable to register hosting cycle');
        }
    };

    return (
        <><Aymen />
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-xl bg-white p-6 rounded-lg shadow-lg">
                
                <button
                    onClick={toggleSidebar}
                    aria-controls="default-sidebar"
                    type="button"
                    className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                >
                    <span className="sr-only">Open sidebar</span>
                    <svg
                        className="w-6 h-6"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            clipRule="evenodd"
                            fillRule="evenodd"
                            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                        />
                    </svg>
                </button>

                <aside
                    id="default-sidebar"
                    className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} sm:translate-x-0`}
                    aria-label="Sidebar"
                >
                    <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                        <ul className="space-y-2 font-medium">
                            <li>
                                <Link to="/Admin" className="flex items-center p-2 text-gray-900 rounded-lg">
                                    <FontAwesomeIcon icon={faTachometerAlt} className="me-2" />
                                    Dashboard
                                </Link>
                            </li>
                            <li>
                                <Link to="/Package" className="flex items-center p-2 text-gray-900 rounded-lg">
                                    <FontAwesomeIcon icon={faPlus} className="me-2" />
                                    Add package
                                </Link>
                            </li>
                            <li>
                                <Link to="/showhostingCycleSchema" className="flex items-center p-2 text-gray-900 rounded-lg">
                                    <FontAwesomeIcon icon={faEye} className="me-2" />
                                    See package
                                </Link>
                            </li>
                            <li>
                                <Link to="/Admin" className="flex items-center p-2 text-gray-900 rounded-lg">
                                    <FontAwesomeIcon icon={faUsers} className="me-2" />
                                    See Users
                                </Link>
                            </li>
                        </ul>
                    </div>
                </aside>

                <div className="admin-dashboard">
                    <h1 className="text-center text-3xl font-bold mb-6">Add Hosting Cycle</h1>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="form-group">
                            <label className="block text-lg font-semibold mb-2">Package Name</label>
                            <input
                                type="text"
                                name="namePAckage"
                                value={formData.namePAckage}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                        <div className="form-group">
                            <label className="block text-lg font-semibold mb-2">Start Date</label>
                            <input
                                type="date"
                                name="startDate"
                                value={formData.startDate}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                        <div className="form-group">
                            <label className="block text-lg font-semibold mb-2">End Date</label>
                            <input
                                type="date"
                                name="endDate"
                                value={formData.endDate}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                        <div className="form-group">
                            <label className="block text-lg font-semibold mb-2">Cost</label>
                            <input
                                type="number"
                                name="cost"
                                value={formData.cost}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                        <div className="form-group">
                            <label className="block text-lg font-semibold mb-2">Duration</label>
                            <select
                                name="duration"
                                value={formData.duration}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            >
                                <option value="">Select Duration</option>
                                <option value="6 months">6 months</option>
                                <option value="1 year">1 year</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="block text-lg font-semibold mb-2">Image URL</label>
                            <input
                                type="text"
                                name="image"
                                value={formData.image}
                                onChange={handleChange}
                                placeholder="Enter image URL"
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                        <div className="form-group">
                            <label className="block text-lg font-semibold mb-2">Description</label>
                            <input
                                type="text"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Enter your description"
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full py-3 mt-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            Add Hosting Cycle
                        </button>
                    </form>
                </div>
            </div>
        </div>
        </>
    );
};

export default Package;
