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
  const [currency, setCurrency] = useState("USD"); // Default currency
  const [exchangeRate, setExchangeRate] = useState(1); // Default exchange rate
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    namewebsite: "",
    github: "",
    description: "",
  });

  const { userData, setIsLogin, setUserData } = useContext(AppContent);

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [searchTerm, setSearchTerm] = useState("");
  const [sliderValue, setSliderValue] = useState(0);

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

  useEffect(() => {
    // Manually set exchange rate based on user's country
    if (userData && userData.Contry) {
      let targetCurrency = "USD";
      let newExchangeRate = 1;

      switch (userData.Contry) {
        case "Tunisia":
          targetCurrency = "TND";
          newExchangeRate = 3.1; // Example rate - UPDATE THIS!
          break;
        case "Morocco":
          targetCurrency = "MAD";
          newExchangeRate = 10.1; // Example rate - UPDATE THIS!
          break;
        case "Algeria":
          targetCurrency = "DZD";
          newExchangeRate = 135.5; // Example rate - UPDATE THIS!
          break;
        case "Egypt":
          targetCurrency = "EGP";
          newExchangeRate = 30.9; // Example rate - UPDATE THIS!
          break;
        case "Libya":
          targetCurrency = "LYD";
          newExchangeRate = 4.8; // Example rate - UPDATE THIS!
          break;
        default:
          targetCurrency = "USD";
          newExchangeRate = 1;
          break;
      }

      setCurrency(targetCurrency);
      setExchangeRate(newExchangeRate);
      setError(""); // Clear any previous errors
    } else {
      // No user data, default to USD
      setCurrency("USD");
      setExchangeRate(1);
    }
  }, [userData]);

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

  const filteredHostingCycles = hostingCycles.filter((cycle) => {
    const price = parseFloat(cycle.cost);

    const minPriceFilter = price >= minPrice;
    const maxPriceFilter = price <= maxPrice;

    const searchTermFilter =
      searchTerm === "" ||
      cycle.namePAckage.toLowerCase().includes(searchTerm.toLowerCase());

    return minPriceFilter && maxPriceFilter && searchTermFilter;
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
        Our offers
      </h1>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-4">
          <label htmlFor="searchTerm">Search Package Name:</label>
          <input
            type="text"
            id="searchTerm"
            placeholder="Enter package name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border rounded py-2 px-3"
          />
        </div>
        <div className="mb-4">
          <input
            type="range"
            min={0}
            max={10000}
            value={sliderValue}
            onChange={(e) => setSliderValue(e.target.value)}
            className="w-full border rounded py-2 px-3"
          />
          <p>
            Price range: ${sliderValue} - ${10000}
          </p>
        </div>

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
                    ${parseFloat(cycle.cost).toFixed(2)}
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
                    {cartLoading ? "Adding..." : "If you want more information, subscribe with us"}
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
                    htmlFor=""
                  >
                    Description
                  </label>
                  <textarea
                    id=""
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-blue-600 text-white text-lg font-semibold rounded-md hover:bg-blue-700 transition duration-300 ease-in-out disabled:bg-blue-400"
                >
                  Register Website
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Commerce;