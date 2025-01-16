import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Header from "../dash/header";
import Footer from "../dash/footer";
import { AppContent } from "../context/Appcontext";

const Commerce = () => {
  const [hostingCycles, setHostingCycles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cartLoading, setCartLoading] = useState(false);
  const [cartError, setCartError] = useState("");
  
  const [showForm, setShowForm] = useState(false);  // Show the form when clicked
  const [formData, setFormData] = useState({
    namewebsite: "",
    github: "",
  });

  const { userData, setIsLogin, setUserData } = useContext(AppContent);

  // Fetch hosting cycles
  useEffect(() => {
    const fetchHostingCycles = async () => {
      try {
        const response = await axios.get("https://host-cycle-ji9x.vercel.app/api/auth/getAllHostingCycles", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
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

  // Add hosting cycle to cart
  const handleAddToCart = (hostingCycleId) => {
    if (!userData || !userData._id) {
      setCartError("User is not logged in or user ID is missing.");
      return;
    }

    // Show form to enter website details
    setShowForm(true);
  };

  // Handle form submission
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
        `https://host-cycle-ji9x.vercel.app/api/auth/registerWebsite`,
        {
          name: formData.namewebsite,
          url: formData.github, // Assuming GitHub URL is used for the website URL
          description: formData.description || "", // Optional description
          ownerId: userData._id, // Use the logged-in user's ID as the owner
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        alert("Website registered successfully!");
        setShowForm(false); // Hide the form
        setFormData({ namewebsite: "", github: "", description: "" }); // Reset form data
      } else {
        setCartError(response.data.message);
      }
    } catch (error) {
      console.error("Error registering website:", error.response?.data || error.message);
      setCartError("Error registering website. Please try again.");
    } finally {
      setCartLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <div className="font-sans py-4 mx-auto lg:max-w-4xl max-w-lg md:max-w-full">
        <h2 className="text-2xl font-extrabold text-gray-800 mb-6">Hosting Cycles</h2>

        {loading && <div>Loading...</div>}
        {error && <div className="text-red-600">{error}</div>}

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {hostingCycles.map((cycle) => (
            <div key={cycle._id} className="bg-gray-200 flex flex-col rounded-md">
              <div className="p-4 sm:p-6">
                <img src={cycle.image} alt={cycle.namePAckage} className="w-full aspect-[230/220] object-contain" />
              </div>
              <div className="flex flex-col h-full text-center bg-gray-100 p-4">
                <h1 className="text-sm font-bold">{cycle.namePAckage}</h1>
                <p className="text-sm ">{cycle.description}</p>
                <h4 className="text-sm font-bold mt-4">
                  ${cycle.cost} <strike>${cycle.originalCost}</strike>
                </h4>
                <button
    type="button"
    onClick={() => handleAddToCart(cycle._id)}
    className="w-full mt-6 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 disabled:bg-blue-300"   disabled={cartLoading}
>
    {cartLoading ? "Adding..." : "Add to Cart"}
</button>

                {cartError && <div className="text-red-600 mt-2">{cartError}</div>}
              </div>
            </div>
          ))}
        </div>

        {/* Show the form when `showForm` is true */}
        {showForm && (
          <div className="mt-6 bg-white p-4 rounded-md shadow-md">
            <h3 className="text-lg font-semibold">Enter Website Details</h3>
            <form onSubmit={handleFormSubmit}>
              <div className="mt-4">
                <label className="block text-sm font-medium">Website Name</label>
                <input
                  type="text"
                  value={formData.namewebsite}
                  onChange={(e) => setFormData({ ...formData, namewebsite: e.target.value })}
                  className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium">GitHub Account</label>
                <input
                  type="text"
                  value={formData.github}
                  onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                  className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium">Description (Optional)</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <button
                type="submit"
                className="mt-6 w-full bg-blue-500 text-white py-2 rounded-md"
                disabled={cartLoading}
              >
                {cartLoading ? "Saving..." : "Save and Register Website"}
              </button>
            </form>
            {cartError && <div className="text-red-600 mt-2">{cartError}</div>}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Commerce;
