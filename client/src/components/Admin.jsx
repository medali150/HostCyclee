import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'; // Import useNavigate for navigation
import './Admin.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faPlus, faEye, faUsers } from '@fortawesome/free-solid-svg-icons';
import Footer from '../dash/footer';
import Aymen from '../dash/header';
import Sidebar from '../Chat/Chat1';


const Admin = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [users, setUsers] = useState([]); // State to store users
  const [error, setError] = useState(null); // State to store error message
  const [loading, setLoading] = useState(true); // State to manage loading state
  const navigate = useNavigate(); // Instantiate useNavigate for navigation

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Function to fetch users data
  const fetchUsers = async () => {
    try {
      setLoading(true); // Show loading indicator
      const { data } = await axios.get('http://localhost:4000/api/user/getAllUsers');
      
      if (data.success) {
        setUsers(data.users); // Store users on success
      } else {
        setError(data.message); // Set error if API fails
      }
    } catch (err) {
      setError(`Error fetching users: ${err.message}`); // Catch and display error
    } finally {
      setLoading(false); // Hide loading indicator once request completes
    }
  };

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  // Navigate to user details page
  const handleViewDetails = (userId) => {
    navigate(`/User/${userId}`);
  };

  // Function to delete a user
  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const response = await axios.delete(`http://localhost:4000/api/auth/deleteUser/${userId}`);
        if (response.data.success) {
          alert("User deleted successfully");
          // Refresh users after deletion
          fetchUsers();
        } else {
          alert(response.data.message);
        }
      } catch (err) {
        alert("Error deleting user: " + err.message);
      }
    }
  };

  return (
    <div>
      <Aymen/>
    <div>
     <Sidebar/>
      <>
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
      </>
  
      <div className="admin-dashboard">
        <div className="dashboard-header">
          <h1>Admin Dashboard</h1>
        </div>

        {loading && <div className="loading-message">Loading users...</div>}
        {error && !loading && <div className="error-message">{error}</div>}

        <div className="table-container">
          {users.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Admin</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map(({ id, name, email, isAdmin }) => (
                  <tr key={id}>
                    <td>{name}</td>
                    <td>{email}</td>
                    <td>{isAdmin ? 'Yes' : 'No'}</td>
                    <td>
                      <button onClick={() => handleViewDetails(id)} className="details-button ">
                        View Details
                      </button>
                      <button onClick={() => handleDeleteUser(id)} className="button">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            !loading && <div>No users found.</div>
          )}
        </div>
      </div>
    </div>
    </div>
  );
};

export default Admin;