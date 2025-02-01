import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Mail,
  Globe,
  ExternalLink,
  Trash,
} from "lucide-react";

const User = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showDescription, setShowDescription] = useState(null);

  const API_BASE_URL = "https://host-cycle-ji9x-aymens-projects-9ad69811.vercel.app";

  // Fetch user details
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

  // Handle Image Upload
  const handleImageUpload = async () => {
    if (!image) {
      setError("Please select an image to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("profileImage", image);

    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Unauthorized: Please login.");
        return;
      }

      const response = await axios.post(
        `https://host-cycle-ji9x-aymens-projects-9ad69811.vercel.app/api/user/upload-profile-image/${userId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setUser((prevUser) => ({
          ...prevUser,
          image: response.data.user.image,
        }));
      } else {
        setError(response.data.message || "Image upload failed.");
      }
    } catch (err) {
      setError("Error uploading image: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle website deletion
  const handleDeleteWebsite = async (websiteId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Unauthorized: Please login.");
        return;
      }

      const response = await axios.delete(
        `https://host-cycle-ji9x-aymens-projects-9ad69811.vercel.app/api/auth/delete-website/${user._id}/${websiteId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        const updatedWebsites = user.websites.filter(
          (website) => website._id !== websiteId
        );
        setUser({ ...user, websites: updatedWebsites });
        alert("Website deleted successfully");
      } else {
        alert("Failed to delete website");
      }
    } catch (error) {
      console.error("Error deleting website:", error);
      alert("An error occurred while deleting the website");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="bg-blue-600 px-6 py-4">
          <h3 className="text-2xl font-bold text-white">User Profile</h3>
          <p className="mt-1 text-blue-200">Information about the user.</p>
        </div>

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
            <p className="font-bold">Error</p>
            <p>{error}</p>
          </div>
        )}

        {user ? (
          <div className="p-6">
            <div className="flex items-center space-x-4">
              <img
                src={
                  user.image
                    ? `${API_BASE_URL}/${user.image}`
                    : "https://via.placeholder.com/150"
                }
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-4 border-blue-200"
              />
              <div>
                <h4 className="text-xl font-semibold text-gray-800">
                  {user.name}
                </h4>
                <p className="text-gray-600 flex items-center">
                  <Mail className="w-4 h-4 mr-2" /> {user.email}
                </p>
                <p className="text-gray-600 flex items-center">
                  <Globe className="w-4 h-4 mr-2" /> {user.country || "N/A"}
                </p>
              </div>
            </div>

            {/* Websites Section */}
            <div className="mt-8">
              <h5 className="text-xl font-semibold text-gray-700 mb-4">
                Websites
              </h5>
              {user.websites && user.websites.length > 0 ? (
                <ul>
                  {user.websites.map((website, index) => (
                    <li key={index} className="bg-white p-3 rounded shadow-sm mb-2">
                      <div className="flex justify-between items-center">
                        <a
                          href={website.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-900 flex items-center"
                        >
                          {website.name} <ExternalLink className="ml-1 h-4 w-4" />
                        </a>
                        <button
                          onClick={() => handleDeleteWebsite(website._id)}
                          className="text-red-600 hover:text-red-900 flex items-center"
                        >
                          <Trash className="mr-1 h-4 w-4" />
                          Delete
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 italic">No websites added.</p>
              )}
            </div>

            {/* Image Upload Section */}
            <div className="mt-8">
              <h5 className="text-lg font-semibold text-gray-700 mb-2">
                Update Profile Image
              </h5>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                className="w-full text-sm text-gray-500"
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
        ) : (
          <p className="text-center py-12 text-gray-600">Loading user details...</p>
        )}
      </div>
    </div>
  );
};

export default User;
