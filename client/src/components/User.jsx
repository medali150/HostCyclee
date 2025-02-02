import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Mail, Calendar, DollarSign, Clock, Pencil, Globe, ExternalLink, Trash } from "lucide-react";

const UserProfile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showDescription, setShowDescription] = useState(null);

  const handleDeleteWebsite = async (websiteId) => {
    try {
      const response = await fetch(
        `https://host-cycle-ji9x-aymens-projects-9ad69811.vercel.app/api/auth/delete-website/${user._id}/${websiteId}`,
        { method: 'DELETE' }
      );
      const data = await response.json();
      if (data.success) {
        const updatedWebsites = user.websites.filter(website => website._id !== websiteId);
        setUser({ ...user, websites: updatedWebsites });
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

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`https://host-cycle-ji9x-aymens-projects-9ad69811.vercel.app/api/user/${userId}`);
        if (response.data.success) {
          setUser(response.data.user);
        } else {
          setError(response.data.message || 'Failed to fetch user details.');
        }
      } catch (err) {
        setError('Error fetching user details: ' + err.message);
      }
    };

    fetchUserDetails();
  }, [userId]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleImageUpload = async () => {
    if (!image) {
      setError('Please select an image to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('profileImage', image);

    setLoading(true);
    setError('');
    try {
      const response = await axios.post(
        `http://localhost:4000/api/user/upload-profile-image/${userId}`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      if (response.data.success) {
        setUser(prevUser => ({
          ...prevUser,
          image: response.data.user.image,
        }));
      } else {
        setError(response.data.message || 'Image upload failed.');
      }
    } catch (err) {
      setError('Error uploading image: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="bg-blue-600 px-6 py-4">
          <h3 className="text-2xl font-bold text-white">User Profile</h3>
          <p className="mt-1 text-blue-200">Information about the user and their activities.</p>
        </div>

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
            <p className="font-bold">Error</p>
            <p>{error}</p>
          </div>
        )}

        {user ? (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* User Details */}
              <div className="md:col-span-2 space-y-6">
                <div className="flex items-center space-x-4">
                  <img
                    src={
                      user.image
                        ? `https://host-cycle-ji9x-aymens-projects-9ad69811.vercel.app/${user.image}`
                        : "https://via.placeholder.com/150"
                    }
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover border-4 border-blue-200"
                  />
                  <div>
                    <h4 className="text-xl font-semibold text-gray-800">{user.name}</h4>
                    <p className="text-gray-600 flex items-center">
                      <Mail className="w-4 h-4 mr-2" /> {user.email}
                    </p>
                    <p className="text-gray-600 flex items-center">
                      <Globe className="w-4 h-4 mr-2" /> {user.Contry || "N/A"}
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h5 className="text-lg font-semibold text-gray-700 mb-2">Cart Items</h5>
                  {user.cart && user.cart.length > 0 ? (
                    <ul className="space-y-2">
                      {user.cart.map((item, index) => (
                        <li key={index} className="bg-white p-3 rounded shadow-sm">
                          <div className="flex justify-between items-center">
                            <span className="font-medium text-blue-600">{item.packageName}</span>
                            <span className="text-gray-600">${item.cost} for {item.duration} days</span>
                          </div>
                          <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500 italic">No items in the cart.</p>
                  )}
                </div>
              </div>

              {/* Profile Image Upload */}
              <div className="md:col-span-1">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h5 className="text-lg font-semibold text-gray-700 mb-2">Update Profile Image</h5>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                  <button
                    onClick={handleImageUpload}
                    disabled={loading}
                    className={`mt-4 w-full px-4 py-2 rounded-md text-white font-medium ${
                      loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
                    } transition duration-300 ease-in-out`}
                  >
                    {loading ? "Uploading..." : "Upload Image"}
                  </button>
                </div>
              </div>
            </div>

            {/* Websites */}
            <div className="mt-8">
              <h5 className="text-xl font-semibold text-gray-700 mb-4">Websites</h5>
              {user.websites && user.websites.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          URL
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {user.websites.map((website, index) => (
                        <React.Fragment key={index}>
                          <tr className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{website.name}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <a
                                href={website.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-900 flex items-center"
                              >
                                {website.url}
                                <ExternalLink className="ml-1 h-4 w-4" />
                              </a>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <button
                                onClick={() => toggleDescription(index)}
                                className="text-blue-600 hover:text-blue-900 mr-4"
                              >
                                {showDescription === index ? "Hide" : "Show"} Description
                              </button>
                              <button
                                onClick={() => handleDeleteWebsite(website._id)}
                                className="text-red-600 hover:text-red-900 flex items-center"
                              >
                                <Trash className="mr-1 h-4 w-4" />
                                Delete
                              </button>
                            </td>
                          </tr>
                          {showDescription === index && (
                            <tr>
                              <td colSpan={3} className="px-6 py-4 whitespace-normal">
                                <p className="text-sm text-gray-500">{website.description}</p>
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      ))}
                    </tbody>
                  </table>
                </div>
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