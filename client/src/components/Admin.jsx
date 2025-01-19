import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Admin.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faPlus, faEye, faUsers } from '@fortawesome/free-solid-svg-icons';
import Footer from '../dash/footer';
import Aymen from '../dash/header';
import Sidebar from '../Chat/Chat1';

const Admin = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [packageCount, setPackageCount] = useState(0);
  const [websiteCount, setWebsiteCount] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const toggleSidebar = () => setIsOpen(!isOpen);

  const fetchData = async () => {
    try {
      setLoading(true);

      // Fetch users
      const userResponse = await axios.get('http://localhost:4000/api/user/getAllUsers');
      if (userResponse.data.success) {
        setUsers(userResponse.data.users);
      } else {
        setError(userResponse.data.message);
      }

      // Fetch package count
      const packageResponse = await axios.get('http://localhost:4000/api/package/getPackageCount');
      if (packageResponse.data.success) {
        setPackageCount(packageResponse.data.count);
      }

      // Fetch website count
      const websiteResponse = await axios.get('http://localhost:4000/api/website/getWebsiteCount');
      if (websiteResponse.data.success) {
        setWebsiteCount(websiteResponse.data.count);
      }
    } catch (err) {
      setError(`Error fetching data: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleViewDetails = (userId) => navigate(`/User/${userId}`);

  return (
    <div>
      <Aymen />
      <div>
        <Sidebar />
        <div className="admin-dashboard">
          <div className="dashboard-header">
            <h1>Admin Dashboard</h1>
          </div>

          {loading && <div className="loading-message">Loading...</div>}
          {error && !loading && <div className="error-message">{error}</div>}

          {/* Display statistics */}
          <div className="statistics">
            <div className="stat-item">
              <h2>Total Users</h2>
              <p>{users.length}</p>
            </div>
            <div className="stat-item">
              <h2>Total Packages</h2>
              <p>{packageCount}</p>
            </div>
            <div className="stat-item">
              <h2>Total Websites</h2>
              <p>{websiteCount}</p>
            </div>
          </div>

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
                        <button onClick={() => handleViewDetails(id)} className="details-button">
                          View Details
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
