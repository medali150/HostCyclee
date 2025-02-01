import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import { Mail, Globe, ExternalLink, Trash, Loader2 } from "lucide-react"

const UserProfile = () => {
  const { userId } = useParams()
  const [user, setUser] = useState(null)
  const [error, setError] = useState("")
  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(false)

  const API_BASE_URL = "https://host-cycle-ji9x-aymens-projects-9ad69811.vercel.app"

  // Fetch user details
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("token")
        if (!token) {
          setError("Unauthorized: Please login.")
          return
        }

        const response = await axios.get(`https://host-cycle-ji9x-aymens-projects-9ad69811.vercel.app/api/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (response.data.success) {
          setUser(response.data.user)
        } else {
          setError(response.data.message || "Failed to fetch user details.")
        }
      } catch (err) {
        setError("Error fetching user details: " + err.message)
      }
    }

    fetchUserDetails()
  }, [userId])

  // Handle Image Upload
  const handleImageUpload = async () => {
    if (!image) {
      setError("Please select an image to upload.")
      return
    }

    const formData = new FormData()
    formData.append("profileImage", image)

    setLoading(true)
    setError("")

    try {
      const token = localStorage.getItem("token")
      if (!token) {
        setError("Unauthorized: Please login.")
        return
      }

      const response = await axios.post(`https://host-cycle-ji9x-aymens-projects-9ad69811.vercel.app/api/user/upload-profile-image/${userId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.data.success) {
        setUser((prevUser) => ({
          ...prevUser,
          image: response.data.user.image,
        }))
      } else {
        setError(response.data.message || "Image upload failed.")
      }
    } catch (err) {
      setError("Error uploading image: " + err.message)
    } finally {
      setLoading(false)
    }
  }

  // Handle website deletion
  const handleDeleteWebsite = async (websiteId) => {
    try {
      const token = localStorage.getItem("token")
      if (!token) {
        setError("Unauthorized: Please login.")
        return
      }

      const response = await axios.delete(`https://host-cycle-ji9x-aymens-projects-9ad69811.vercel.app/api/auth/delete-website/${user._id}/${websiteId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      if (response.data.success) {
        const updatedWebsites = user.websites.filter((website) => website._id !== websiteId)
        setUser({ ...user, websites: updatedWebsites })
        alert("Website deleted successfully")
      } else {
        alert("Failed to delete website")
      }
    } catch (error) {
      console.error("Error deleting website:", error)
      alert("An error occurred while deleting the website")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-blue-600 px-6 py-4">
          <h3 className="text-2xl font-bold text-white">User Profile</h3>
          <p className="mt-1 text-blue-200">Information about the user.</p>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6">
            <p className="font-bold">Error</p>
            <p>{error}</p>
          </div>
        )}

        {user ? (
          <div className="p-6 space-y-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
              <img
                src={user.image ? `${API_BASE_URL}/${user.image}` : "https://via.placeholder.com/150"}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-blue-200 shadow-md"
              />
              <div className="text-center sm:text-left">
                <h4 className="text-2xl font-semibold text-gray-800 mb-2">{user.name}</h4>
                <p className="text-gray-600 flex items-center justify-center sm:justify-start mb-1">
                  <Mail className="w-5 h-5 mr-2 text-blue-500" /> {user.email}
                </p>
                <p className="text-gray-600 flex items-center justify-center sm:justify-start">
                  <Globe className="w-5 h-5 mr-2 text-blue-500" /> {user.country || "N/A"}
                </p>
              </div>
            </div>

            {/* Websites Section */}
            <div className="mt-8">
              <h5 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">Websites</h5>
              {user.websites && user.websites.length > 0 ? (
                <ul className="space-y-3">
                  {user.websites.map((website, index) => (
                    <li
                      key={index}
                      className="bg-gray-50 p-4 rounded-lg shadow-sm transition duration-300 ease-in-out hover:shadow-md"
                    >
                      <div className="flex justify-between items-center">
                        <a
                          href={website.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 flex items-center font-medium"
                        >
                          {website.name} <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                        <button
                          onClick={() => handleDeleteWebsite(website._id)}
                          className="text-red-500 hover:text-red-700 flex items-center transition duration-300 ease-in-out"
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
            <div className="mt-8 bg-gray-50 p-6 rounded-lg shadow-sm">
              <h5 className="text-lg font-semibold text-gray-700 mb-4">Update Profile Image</h5>
              <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                <button
                  onClick={handleImageUpload}
                  disabled={loading}
                  className={`w-full sm:w-auto px-6 py-2 rounded-md text-white font-medium flex items-center justify-center ${
                    loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                  } transition duration-300 ease-in-out`}
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin mr-2" />
                      Uploading...
                    </>
                  ) : (
                    "Upload Image"
                  )}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
            <p className="ml-2 text-gray-600">Loading user details...</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default UserProfile

