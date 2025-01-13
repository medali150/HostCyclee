import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import Header from '../dash/header';
import Footer from '../dash/footer';

const Commerce = () => {
  const { userId } = useParams();
  const [hostingCycles, setHostingCycles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [cartLoading, setCartLoading] = useState(false);
  const [cartError, setCartError] = useState('');

  useEffect(() => {
    const fetchHostingCycles = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/auth/getAllHostingCycles', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setHostingCycles(response.data.data);
      } catch (error) {
        setError('Failed to fetch hosting cycles');
        console.error('Error fetching hosting cycles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHostingCycles();
  }, []);

  const handleAddToCart = async (cycleId) => {
    setCartLoading(true);
    setCartError('');

    if (!userId) {
      setCartError('User not authenticated');
      setCartLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:4000/api/user/addHostingCycleToCart/${userId}`,
        { hostingCycleId: cycleId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (response.data.success) {
        alert('Item added to cart successfully!');
      } else {
        setCartError('Failed to add item to cart');
      }
    } catch (error) {
      setCartError('Error adding item to cart: ' + (error.response?.data?.message || error.message));
      console.error("Error details:", error);
    } finally {
      setCartLoading(false);
    }
  };

  return (
    <div>
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Hosting Cycles</h1>

        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {hostingCycles.map((cycle) => (
            <div key={cycle._id} className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl">
              <div className="p-4">
                <img src={cycle.image} alt={cycle.namePAckage} className="w-full h-48 object-cover rounded-md" />
              </div>
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">{cycle.namePAckage}</h2>
                <p className="text-gray-600 mb-4">{cycle.description}</p>
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <span className="text-2xl font-bold text-blue-600">${cycle.cost}</span>
                    <span className="text-sm text-gray-500 line-through ml-2">${cycle.originalCost}</span>
                  </div>
                  <div className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    Save ${(cycle.originalCost - cycle.cost).toFixed(2)}
                  </div>
                </div>
                <button
                  onClick={() => handleAddToCart(cycle._id)}
                  disabled={cartLoading}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out flex items-center justify-center"
                >
                  {cartLoading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Adding...
                    </span>
                  ) : (
                    <>
                      <ShoppingCart className="mr-2" size={20} />
                      Add to Cart
                    </>
                  )}
                </button>
                {cartError && <p className="text-red-500 text-sm mt-2">{cartError}</p>}
              </div>
            </div>
          ))}
        </div>
      </main>
     
    </div>
    <footer className="bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Société</h3>
              <ul className="mt-4 space-y-4">
                <li><a href="#" className="text-base text-gray-300 hover:text-white">À propos</a></li>
                <li><a href="#" className="text-base text-gray-300 hover:text-white">Blog</a></li>
                <li><a href="#" className="text-base text-gray-300 hover:text-white">Emplois</a></li>
                <li><a href="#" className="text-base text-gray-300 hover:text-white">Presse</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Support</h3>
              <ul className="mt-4 space-y-4">
                <li><a href="#" className="text-base text-gray-300 hover:text-white">Centre d'aide</a></li>
                <li><a href="#" className="text-base text-gray-300 hover:text-white">Documentation</a></li>
                <li><a href="#" className="text-base text-gray-300 hover:text-white">Guides</a></li>
                <li><a href="#" className="text-base text-gray-300 hover:text-white">API Status</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Légal</h3>
              <ul className="mt-4 space-y-4">
                <li><a href="#" className="text-base text-gray-300 hover:text-white">Confidentialité</a></li>
                <li><a href="#" className="text-base text-gray-300 hover:text-white">Conditions</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Social</h3>
              <ul className="mt-4 space-y-4">
                <li><a href="#" className="text-base text-gray-300 hover:text-white">Facebook</a></li>
                <li><a href="#" className="text-base text-gray-300 hover:text-white">Twitter</a></li>
                <li><a href="#" className="text-base text-gray-300 hover:text-white">LinkedIn</a></li>
              </ul>
            </div>
          </div>
          
        </div>
      </footer>
     <Footer />
    
     </div>
   
  );
};

export default Commerce;

