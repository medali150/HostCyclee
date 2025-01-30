import React, { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUsers, faSearch } from "@fortawesome/free-solid-svg-icons"
import Aymen from "../dash/header"
import Sidebar from "../Chat/Chat1"

const Admin = () => {
  const [users, setUsers] = useState([])
  const [filteredUsers, setFilteredUsers] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const navigate = useNavigate()

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get("http://localhost:4000/api/user/getAllUsers")

      if (data.success) {
        setUsers(data.users)
        setFilteredUsers(data.users)
      } else {
        setError(data.message)
      }
    } catch (err) {
      setError(`Error fetching users: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  useEffect(() => {
    const filtered = users.filter((user) => user.name.toLowerCase().includes(searchTerm.toLowerCase()))
    setFilteredUsers(filtered)
  }, [searchTerm, users])

  const handleViewDetails = (userId) => {
    navigate(`/User/${userId}`)
  }

  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const response = await axios.delete(`http://localhost:4000/api/auth/deleteUser/${userId}`)
        if (response.data.success) {
          alert("User deleted successfully")
          fetchUsers()
        } else {
          alert(response.data.message)
        }
      } catch (err) {
        alert("Error deleting user: " + err.message)
      }
    }
  }

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }
  const handleMakeAdmin = async (userId) => {
    if (window.confirm("Are you sure you want to promote this user to admin?")) {
      try {
        const response = await axios.put(`http://localhost:4000/api/auth/makeAdmin/${userId}`);
        if (response.data.success) {
          alert("User promoted to admin successfully!");
          fetchUsers(); // Refresh user list
        } else {
          alert(response.data.message);
        }
      } catch (err) {
        alert("Error promoting user to admin: " + err.message);
      }
    }
  };
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Aymen />
      <div className="flex flex-1">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div className="flex-1 p-4 md:p-8 sm:ml-64">
          <button
            onClick={toggleSidebar}
            className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          >
            <span className="sr-only">Toggle Sidebar</span>
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

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
            <div className="mt-4 bg-white rounded-lg shadow p-4 inline-block">
              <div className="flex items-center space-x-4">
                <FontAwesomeIcon icon={faUsers} className="text-blue-500 text-3xl" />
                <div>
                  <h2 className="text-xl font-semibold text-gray-700">Nombre total d'utilisateurs</h2>
                  <p className="text-2xl font-bold text-blue-600">{loading ? "Loading..." : users.length}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-4 relative">
            <input
              type="text"
              placeholder="Rechercher des utilisateurs par nom"
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full px-4 py-2 pl-10 pr-4 text-gray-700 bg-white border rounded-lg focus:border-blue-500 focus:outline-none focus:ring"
            />
            <FontAwesomeIcon
              icon={faSearch}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
          </div>

          {loading && <div className="text-center text-gray-600">Loading users...</div>}
          {error && !loading && <div className="text-center text-red-500 mb-4">{error}</div>}

          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                    Nom
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Admin
                    </th>
                    <th scope="col" className="px-6 py-3">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map(({ id, name, email, isAdmin }) => (
                    <tr key={id} className="bg-white border-b hover:bg-gray-50">
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                        {name}
                      </th>
                      <td className="px-6 py-4">{email}</td>
                      <td className="px-6 py-4">{isAdmin ? "Yes" : "No"}</td>
                      <td className="px-6 py-4 text-right">
  <button
    onClick={() => handleViewDetails(id)}
    className="font-medium text-blue-600 hover:underline mr-2"
  >
    Voir les détails
  </button>
  {!isAdmin && (
    <button
      onClick={() => handleMakeAdmin(id)}
      className="font-medium text-black hover:underline mr-2"

  >
      transformer en administrateur
    </button>
  )}
  <button
    onClick={() => handleDeleteUser(id)}
    className="font-medium text-red-600 hover:underline"
  >
    Supprimer
  </button>
</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Admin

