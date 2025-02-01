import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Mail, Globe, ExternalLink, Trash } from "lucide-react";

const UserProfile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showDescription, setShowDescription] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Unauthorized: Please login.");
          return;
        }

        const response = await axios.get(
          `https://host-cycle-ji9x-aymens-projects-9ad69811.vercel.app/api/user/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {
          setUser(response.data.user);
        } else {
          setError(response.data.message || "Failed to fetch user details.");
        }
      } catch (err) {
        setError("Error fetching user details: " + err.message);
      }
    };
    
    fetchUserDetails();
  }, [userId]);

  const handleDeleteWebsite = async (websiteId) => {
    try {
      const response = await fetch(
        `https://host-cycle-ji9x-aymens-projects-9ad69811.vercel.app/api/auth/delete-website/${user._id}/${websiteId}`,
        { method: 'DELETE' }
      );
      const data = await response.json();
      if (data.success) {
        setUser({ ...user, websites: user.websites.filter(website => website._id !== websiteId) });
        alert('Website deleted successfully');
      } else {
        alert('Failed to delete website');
      }
    } catch (error) {
      console.error("Error deleting website:", error);
      alert('An error occurred while deleting the website');
    }
  };

  const toggleDescription = (index) => {
    setShowDescription(prevIndex => (prevIndex === index ? null : index));
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="bg-blue-600 px-6 py-4">
          <h3 className="text-2xl font-bold text-white">User Profile</h3>
        </div>
        {error && <div className="bg-red-100 p-4 text-red-700">{error}</div>}
        {user ? (
          <div className="p-6">
            <div className="flex items-center space-x-4">
              <img
                src={user.image ? `https://host-cycle-ji9x-aymens-projects-9ad69811.vercel.app/${user.image}` : "https://via.placeholder.com/150"}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-4 border-blue-200"
              />
              <div>
                <h4 className="text-xl font-semibold text-gray-800">{user.name}</h4>
                <p className="text-gray-600 flex items-center"><Mail className="w-4 h-4 mr-2" /> {user.email}</p>
                <p className="text-gray-600 flex items-center"><Globe className="w-4 h-4 mr-2" /> {user.country || "N/A"}</p>
              </div>
            </div>
            <div className="mt-8">
              <h5 className="text-xl font-semibold text-gray-700 mb-4">Websites</h5>
              {user.websites && user.websites.length > 0 ? (
                <ul>
                  {user.websites.map((website, index) => (
                    <li key={index} className="bg-gray-50 p-4 mb-2 rounded-lg shadow">
                      <div className="flex justify-between items-center">
                        <a href={website.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-900 flex items-center">
                          {website.name} <ExternalLink className="ml-1 h-4 w-4" />
                        </a>
                        <button onClick={() => handleDeleteWebsite(website._id)} className="text-red-600 hover:text-red-900">
                          <Trash className="h-4 w-4" /> Delete
                        </button>
                      </div>
                      <button onClick={() => toggleDescription(index)} className="text-sm text-blue-500">
                        {showDescription === index ? "Hide" : "Show"} Description
                      </button>
                      {showDescription === index && <p className="mt-2 text-sm text-gray-600">{website.description}</p>}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 italic">No websites added.</p>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-xl text-gray-600">Loading user details...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
