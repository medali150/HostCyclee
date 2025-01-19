import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StatsSection = () => {
  const [stats, setStats] = useState({
    users: 0,
    websites: 0,
    packages: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch stats data
  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const userResponse = await axios.get('http://localhost:4000/api/user/getAllUsers');
        const websiteResponse = await axios.get('http://localhost:4000/api/website/getAllWebsites');
        const packageResponse = await axios.get('http://localhost:4000/api/package/getAllPackages');

        setStats({
          users: userResponse.data.users.length,
          websites: websiteResponse.data.websites.length,
          packages: packageResponse.data.packages.length,
        });
      } catch (err) {
        setError('Failed to fetch stats');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <div className="text-center py-10">Loading stats...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-10">{error}</div>;
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className="rounded-2xl py-10 px-10 xl:py-16 xl:px-20 bg-white flex items-center justify-between flex-col gap-16 lg:flex-row"
        >
          <div className="w-full lg:w-60">
            <h2 className="font-manrope text-4xl font-bold text-gray-900 mb-4 text-center lg:text-left">
              Admin Stats
            </h2>
            <p className="text-sm text-gray-500 leading-6 text-center lg:text-left">
              Track key metrics to manage and grow your business.
            </p>
          </div>
          <div className="w-full lg:w-4/5">
            <div className="flex flex-col flex-1 gap-10 lg:gap-0 lg:flex-row lg:justify-between">
              <div className="block">
                <div className="font-manrope font-bold text-4xl text-indigo-600 mb-3 text-center lg:text-left">
                  {stats.users}
                </div>
                <span className="text-gray-900 text-center block lg:text-left">
                  Total Users
                </span>
              </div>
              <div className="block">
                <div className="font-manrope font-bold text-4xl text-indigo-600 mb-3 text-center lg:text-left">
                  {stats.websites}
                </div>
                <span className="text-gray-900 text-center block lg:text-left">
                  Total Websites
                </span>
              </div>
              <div className="block">
                <div className="font-manrope font-bold text-4xl text-indigo-600 mb-3 text-center lg:text-left">
                  {stats.packages}
                </div>
                <span className="text-gray-900 text-center block lg:text-left">
                  Total Packages
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
