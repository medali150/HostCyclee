import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const User = () => {
    const { userId } = useParams();  // Extract userId from the URL
    const [user, setUser] = useState(null);  // State to hold user data
    const [error, setError] = useState("");  // Error state for displaying errors
    const [image, setImage] = useState(null);  // Image state for the profile image
    const [loading, setLoading] = useState(false);  // Loading state for image upload

    useEffect(() => {
        // Fetch user details from the backend when the component mounts
        const fetchUserDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/user/${userId}`);
                if (response.data.success) {
                    setUser(response.data.user);  // Set user data in state
                } else {
                    setError(response.data.message);  // Set error message if any
                }
            } catch (err) {
                setError("Error fetching user details: " + err.message);  // Set error if the API request fails
            }
        };

        fetchUserDetails();  // Call the function to fetch user data
    }, [userId]);  // Dependency on userId, will re-run when userId changes

    // Handle image file selection
    const handleImageChange = (e) => {
        const file = e.target.files[0];  // Get the selected file
        if (file) {
            setImage(file);  // Set the image state
        }
    };

    // Upload the profile image to the backend
    const handleImageUpload = async () => {
        if (!image) {
            setError("Please select an image to upload.");
            return;
        }

        const formData = new FormData();
        formData.append('profileImage', image);

        setLoading(true);  // Set loading state to true
        try {
            const response = await axios.post(
                `http://localhost:4000/api/user/upload-profile-image/${userId}`,
                formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                }
            );

            if (response.data.success) {
                setUser((prevUser) => ({
                    ...prevUser,
                    image: response.data.user.image,  // Update the user state with the new image URL
                }));
            } else {
                setError(response.data.message);  // Set error if the upload fails
            }
        } catch (err) {
            setError("Error uploading image: " + err.message);  // Set error if API request fails
        } finally {
            setLoading(false);  // Set loading state to false
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
                        Information about the user and their cart.
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
                            {/* User Information */}
                            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">
                                    Full Name
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {user.name}
                                </dd>
                            </div>
                            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">
                                    Email Address
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {user.email}
                                </dd>
                            </div>

                            {/* Profile Image */}
                            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">
                                    Profile Image
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    <img
                                        src={user.image ? `https://host-cycle-ji9x.vercel.app/${user.image}` : 'https://via.placeholder.com/150'}
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

                            {/* Cart Details */}
                            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">
                                    Cart Items
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {user.cart && user.cart.length > 0 ? (
                                        <ul className="list-disc pl-5">
                                            {user.cart.map((item, index) => (
                                                <li key={index}>
                                                    {item.packageName} - ${item.cost}
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <span>No items in the cart.</span>
                                    )}
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
