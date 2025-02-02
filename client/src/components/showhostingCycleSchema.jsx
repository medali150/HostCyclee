import React, { useState, useEffect } from "react"
import axios from "axios"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBox, faSearch } from "@fortawesome/free-solid-svg-icons"
import Sidebar from "../Chat/Chat1"
import Aymen from "../dash/header"

const HostingCycles = () => {
  const [hostingCycles, setHostingCycles] = useState([])
  const [filteredCycles, setFilteredCycles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  // Function to fetch all hosting cycles
  const fetchHostingCycles = async () => {
    try {
      setLoading(true)
      const response = await axios.get("https://host-cycle-ji9x-aymens-projects-9ad69811.vercel.app/api/auth/getAllHostingCycles", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      setHostingCycles(response.data.data)
      setFilteredCycles(response.data.data)
      setLoading(false)
    } catch (error) {
      setError("Failed to fetch hosting cycles")
      setLoading(false)
    }
  }

  // Function to delete a hosting cycle
  const deleteHostingCycle = async (id) => {
    if (window.confirm("Are you sure you want to delete this hosting cycle?")) {
      try {
        const response = await axios.delete(`https://host-cycle-ji9x-aymens-projects-9ad69811.vercel.app/api/auth/hostingCycles/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })

        if (response.data.success) {
          // Remove the deleted hosting cycle from the state
          setHostingCycles(hostingCycles.filter((cycle) => cycle._id !== id))
          setFilteredCycles(filteredCycles.filter((cycle) => cycle._id !== id))
          alert("Hosting cycle deleted successfully")
        }
      } catch (error) {
        alert("Failed to delete hosting cycle")
      }
    }
  }

  useEffect(() => {
    fetchHostingCycles()
  }, [])

  useEffect(() => {
    const filtered = hostingCycles.filter((cycle) => cycle.namePAckage.toLowerCase().includes(searchTerm.toLowerCase()))
    setFilteredCycles(filtered)
  }, [searchTerm, hostingCycles])

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

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
            <h1 className="text-3xl font-bold text-gray-800">All hosting cycles</h1>
            <div className="mt-4 bg-white rounded-lg shadow p-4 inline-block">
              <div className="flex items-center space-x-4">
                <FontAwesomeIcon icon={faBox} className="text-blue-500 text-3xl" />
                <div>
                  <h2 className="text-xl font-semibold text-gray-700">Total Packages</h2>
                  <p className="text-2xl font-bold text-blue-600">{loading ? "Loading..." : hostingCycles.length}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-4 relative">
            <input
              type="text"
              placeholder="Search packages by name"
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full px-4 py-2 pl-10 pr-4 text-gray-700 bg-white border rounded-lg focus:border-blue-500 focus:outline-none focus:ring"
            />
            <FontAwesomeIcon
              icon={faSearch}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
          </div>

          {loading ? (
            <div className="text-center text-gray-600">Loading...</div>
          ) : error ? (
            <div className="text-center text-red-500 mb-4">{error}</div>
          ) : (
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Package Name
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Start Date
                      </th>
                      <th scope="col" className="px-6 py-3">
                        End Date
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Cost
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Duration
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Image
                      </th>
                      <th scope="col" className="px-6 py-3">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCycles.map((cycle) => (
                      <tr key={cycle._id} className="bg-white border-b hover:bg-gray-50">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                          {cycle.namePAckage}
                        </th>
                        <td className="px-6 py-4">{new Date(cycle.startDate).toLocaleDateString()}</td>
                        <td className="px-6 py-4">{new Date(cycle.endDate).toLocaleDateString()}</td>
                        <td className="px-6 py-4">{cycle.cost}</td>
                        <td className="px-6 py-4">{cycle.duration}</td>
                        <td className="px-6 py-4">
                          {cycle.image ? (
                            <img
                              src={cycle.image || "/placeholder.svg"}
                              alt="Cycle"
                              className="w-12 h-12 object-cover rounded"
                            />
                          ) : (
                            "No Image"
                          )}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => deleteHostingCycle(cycle._id)}
                            className="font-medium text-red-600 hover:underline"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default HostingCycles

