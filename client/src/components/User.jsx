import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const User = () => {
    const { userId } = useParams();
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");
    const [image, setImage] = useState(null); // State to store selected image
    const [loading, setLoading] = useState(false); // To track image upload status

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/user/${userId}`);
                if (response.data.success) {
                    setUser(response.data.user);
                } else {
                    setError(response.data.message);
                }
            } catch (err) {
                setError("Error fetching user details: " + err.message);
            }
        };

        fetchUserDetails();
    }, [userId]);

    // Handle the image file input
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
        }
    };

    // Handle the image upload
   // Handle the image upload
   const handleImageUpload = async () => {
    if (!image) {
      setError("Please select an image to upload.");
      return;
    }
  
    const formData = new FormData();
    formData.append('profileImage', image);
    
    // Log FormData contents to check
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }
  
    setLoading(true);
    try {
      const response = await axios.post(`http://localhost:4000/api/user/upload-profile-image/${userId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (response.data.success) {
        // handle success
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError("Error uploading image: " + err.message);
    } finally {
      setLoading(false);
    }
  };
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 py-8">
            <div className="bg-white overflow-hidden shadow rounded-lg border max-w-4xl w-full">
                <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                        User Profile
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                        This is some information about the user.
                    </p>
                </div>
                <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                    {error && (
                        <div className="bg-red-100 text-red-700 p-4 rounded-md mb-6">
                            <span>{error}</span>
                        </div>
                    )}
                    {user ? (
                        <dl className="sm:divide-y sm:divide-gray-200">
                            {/* User Profile Information */}
                            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">
                                    Full name
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {user.name}
                                </dd>
                            </div>

                            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">
                                    Email address
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {user.email}
                                </dd>
                            </div>

                            {/* Add Profile Image Section */}
                            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">
                                    Profile Image
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    <img
                                        src={user.image ? `http://localhost:4000/${user.image}` : 'https://via.placeholder.com/150'}
                                        alt="Profile"
                                        className="w-20 h-20 rounded-full object-cover"
                                    />
                                    <div className="mt-2">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                        />
                                        <button
                                            type="button"
                                            onClick={handleImageUpload}
                                            disabled={loading}
                                            className="ml-4 bg-blue-500 text-white px-4 py-2 rounded"
                                        >
                                            {loading ? 'Uploading...' : 'Upload Image'}
                                        </button>
                                    </div>
                                </dd>
                            </div>

                            {/* Other User Info */}
                            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">
                                    Start Date
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {new Date(user.startDate).toLocaleDateString()}
                                </dd>
                            </div>

                            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">
                                    End Date
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {new Date(user.endDate).toLocaleDateString()}
                                </dd>
                            </div>
                        </dl>
                    ) : (
                        <div className="text-center text-xl text-gray-500">Loading user details...</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default User;
