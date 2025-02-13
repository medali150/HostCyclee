import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AppContent } from "../context/Appcontext";
import Footer from "../dash/footer";
import Header from "../dash/header";

const Commerce = () => {
  const [hostingCycles, setHostingCycles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cartLoading, setCartLoading] = useState(false);
  const [cartError, setCartError] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    namewebsite: "",
    github: "",
    description: "",
  });

  const { userData } = useContext(AppContent);

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // State to handle checkbox filters
  const [selectedCategories, setSelectedCategories] = useState([]);

  // Define your custom categories here
  const categories = [
    { name: "Shared Hosting", count: 45 },
    { name: "VPS Hosting", count: 60 },
    { name: "Dedicated Hosting", count: 30 },
    { name: "Cloud Hosting", count: 50 },
    { name: "WordPress Hosting", count: 70 },
  ];

  useEffect(() => {
    const fetchHostingCycles = async () => {
      try {
        const response = await axios.get(
          "https://host-cycle-ji9x-aymens-projects-9ad69811.vercel.app/api/auth/getAllHostingCycles",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setHostingCycles(response.data.data);
      } catch (error) {
        setError("Failed to fetch hosting cycles");
        console.error("Error fetching hosting cycles:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHostingCycles();
  }, []);

  const handleAddToCart = (hostingCycleId) => {
    if (!userData || !userData._id) {
      setCartError("User is not logged in or user ID is missing.");
      return;
    }
    setShowForm(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!formData.namewebsite || !formData.github) {
      setCartError("Please fill out all fields.");
      return;
    }

    setCartLoading(true);
    setCartError("");

    try {
      const response = await axios.post(
        `https://host-cycle-ji9x-aymens-projects-9ad69811.vercel.app/api/auth/registerWebsite`,
        {
          name: formData.namewebsite,
          url: formData.github,
          description: formData.description || "",
          ownerId: userData._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        alert("Website registered successfully!");
        setShowForm(false);
        setFormData({ namewebsite: "", github: "", description: "" });
      } else {
        setCartError(response.data.message);
      }
    } catch (error) {
      console.error(
        "Error registering website:",
        error.response?.data || error.message
      );
      setCartError("Error registering website. Please try again.");
    } finally {
      setCartLoading(false);
    }
  };

  // Filter function
  const filteredHostingCycles = hostingCycles.filter((cycle) => {
    const price = parseFloat(cycle.cost);

    const minPriceFilter = minPrice === "" || price >= parseFloat(minPrice);
    const maxPriceFilter = maxPrice === "" || price <= parseFloat(maxPrice);
    const searchTermFilter =
      searchTerm === "" ||
      cycle.namePAckage.toLowerCase().includes(searchTerm.toLowerCase());
    const categoryFilter =
      selectedCategories.length === 0 ||
      selectedCategories.includes(cycle.category); // Assuming each cycle has a `category` attribute

    return minPriceFilter && maxPriceFilter && searchTermFilter && categoryFilter;
  });

  const handleCheckboxChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
        Our offers
      </h1>

      <div className="flex items-center justify-center p-4">
        <button
          id="dropdownDefault"
          onClick={() => document.getElementById("dropdown").classList.toggle("hidden")}
          className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center"
          type="button"
        >
          Filter by category
          <svg
            className="w-4 h-4 ml-2"
            aria-hidden="true"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </button>

        {/* Dropdown menu */}
        <div
          id="dropdown"
          className="z-10 hidden w-56 p-3 bg-white rounded-lg shadow"
        >
          <h6 className="mb-3 text-sm font-medium text-gray-900">
            Category
          </h6>
          <ul className="space-y-2 text-sm">
            {categories.map((category) => (
              <li className="flex items-center" key={category.name}>
                <input
                  type="checkbox"
                  id={category.name}
                  value={category.name}
                  checked={selectedCategories.includes(category.name)}
                  onChange={() => handleCheckboxChange(category.name)}
                  className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />

                <label htmlFor={category.name} className="ml-2 text-sm font-medium text-gray-900">
                  {category.name} ({category.count})
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {loading && (
          <div className="text-center text-xl text-gray-600">Loading...</div>
        )}
        {error && (
          <div className="text-center text-xl text-red-600">{error}</div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredHostingCycles.map((cycle) => (
            <div
              key={cycle._id}
              className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105"
            >
              <div className="p-6">
                <img
                  src={cycle.image || "/placeholder.svg"}
                  alt={cycle.namePAckage}
                  className="w-full h-48 object-contain mb-4"
                />
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  {cycle.namePAckage}
                </h3>
                <p className="text-gray-600 mb-4">{cycle.description}</p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-3xl font-bold text-green-600">
                    ${cycle.cost}
                  </span>
                  <span className="text-xl text-gray-500 line-through">
                    ${cycle.originalCost}
                  </span>
                </div>
                {userData ? (
                  <button
                    type="button"
                    onClick={() => handleAddToCart(cycle._id)}
                    className="w-full py-3 bg-blue-600 text-white text-lg font-semibold rounded-md hover:bg-blue-700 transition duration-300 ease-in-out disabled:bg-blue-400"
                    disabled={cartLoading}
                  >
                    {cartLoading ? "Adding..." : "Host your site"}
                  </button>
                ) : (
                  <button
                    type="button"
                    className="w-full py-3 bg-blue-600 text-white text-lg font-semibold rounded-md hover:bg-blue-700 transition duration-300 ease-in-out disabled:bg-blue-400"
                    disabled={cartLoading}
                  >
                    {cartLoading
                      ? "Adding..."
                      : "If you want more information, subscribe with us"}
                  </button>
                )}
                {cartError && (
                  <div className="text-red-600 mt-2 text-center">{cartError}</div>
                )}
              </div>
            </div>
          ))}
        </div>

        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-8 max-w-md w-full">
              <h3 className="text-2xl font-bold mb-4">Enter Website Details</h3>
              <form onSubmit={handleFormSubmit}>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="namewebsite"
                  >
                    Website Name
                  </label>
                  <input
                    id="namewebsite"
                    type="text"
                    value={formData.namewebsite}
                    onChange={(e) =>
                      setFormData({ ...formData, namewebsite: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="github"
                  >
                    GitHub Account
                  </label>
                  <input
                    id="github"
                    type="text"
                    value={formData.github}
                    onChange={(e) =>
                      setFormData({ ...formData, github: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="description"
                  >
                    Description (Optional)
                  </label>
                  <textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="mr-2 px-4 py-2 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300 transition duration-300 ease-in-out"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 ease-in-out disabled:bg-blue-400"
                    disabled={cartLoading}
                  >
                    {cartLoading ? "Saving..." : "Save and Register Website"}
                  </button>
                </div>
              </form>
              {cartError && (
                <div className="text-red-600 mt-2 text-center">{cartError}</div>
              )}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Commerce;