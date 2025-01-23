import React, { useEffect, useContext, useState } from 'react';
import { User, Mail, Calendar, DollarSign, Clock, Pencil, Globe, ExternalLink, Trash } from 'lucide-react';
import { AppContent } from '../context/Appcontext';
import Aymen from '../dash/header';

const UserAccount = () => {
  const { userData, setUserData } = useContext(AppContent);
  const [showDescription, setShowDescription] = useState(null); // État pour gérer quelle description afficher

  useEffect(() => {
    console.log("User Data: ", userData);
  }, [userData]);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const InfoItem = ({ icon: Icon, label, value }) => (
    <div className="flex items-center justify-between py-3 border-b last:border-b-0">
      <div className="flex items-center text-sm font-medium text-gray-600">
        <Icon className="mr-2 h-5 w-5 text-gray-400" />
        {label}
      </div>
      <div className="text-sm text-gray-900">{value}</div>
    </div>
  );

  const handleDeleteWebsite = async (websiteId) => {
    try {
      const response = await fetch(`http://localhost:4000/api/auth/delete-website/${userData._id}/${websiteId}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (data.success) {
        const updatedWebsites = userData.websites.filter(website => website._id !== websiteId);
        setUserData({ ...userData, websites: updatedWebsites });
        alert('Website deleted successfully');
      } else {
        alert('Failed to delete website');
      }
    } catch (error) {
      console.error("Error deleting website:", error);
      alert('An error occurred while deleting the website');
    }
  };

  const toggleDescription = (index) => {
    setShowDescription((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div>
      <Aymen />
      <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Account Dashboard</h1>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Informations utilisateur</h2>
              <div className="flex items-center justify-center mb-4">
                <img 
                  src={userData.image || "https://via.placeholder.com/150"} // Display the user's image or a default placeholder
                  alt="User Avatar"
                  className="h-24 w-24 rounded-full object-cover"
                />
              </div>
              <InfoItem icon={User} label="Nom" value={userData.name} />
              <InfoItem icon={Mail} label="Email" value={userData.email} />
              <InfoItem icon={Calendar} label="Début de l'abonnement" value={formatDate(userData.startDate)} />
              <InfoItem icon={DollarSign} label="Pays" value={userData.Contry} />
              <InfoItem icon={Clock} label="Durée" value={`${userData.duration} months`} />
              <InfoItem
                icon={Globe}
                label="Nombre de sites Web"
                value={userData.websites ? userData.websites.length : 0}
              />
            </div>
            <div className="bg-white shadow rounded-lg p-6 lg:col-span-2">
              <h2 className="text-xl font-semibold mb-4">Vos sites Web</h2>
              {userData.websites && userData.websites.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3">Nom du site Web</th>
                        <th scope="col" className="px-6 py-3">URL</th>
                        <th scope="col" className="px-6 py-3">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userData.websites.map((website, index) => (
                        <tr key={index} className="bg-white border-b hover:bg-gray-50">
                          <td className="px-6 py-4 font-medium text-gray-900">{website.name}</td>
                          <td className="px-6 py-4">
                            <a
                              href={website.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline flex items-center"
                            >
                              {website.url}
                              <ExternalLink className="ml-1 h-4 w-4" />
                            </a>
                          </td>
                          <td className="px-6 py-4 flex items-center">
                            <button
                              className="bg-gray-600 text-white hover:bg-gray-800 px-3 py-2 rounded mr-4"
                              onClick={() => toggleDescription(index)}
                            >
                              {showDescription === index ? 'Masquer la description' : 'Afficher la description'}
                            </button>
                            <button
                              onClick={() => handleDeleteWebsite(website._id)}
                              className="bg-red-600 text-white hover:bg-red-700 px-3 py-2 rounded flex items-center"
                            >
                              <Trash className="mr-1 h-4 w-4" />
                              Supprimer
                            </button>
                          </td>
                          {showDescription === index && (
                            <tr>
                              <td colSpan="3" className="px-6 py-4 text-gray-700">
                                {website.description}
                              </td>
                            </tr>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Globe className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">
                    Aucun site Web
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">Commencez par ajouter votre premier site Web.</p>
                  <div className="mt-6">
                    <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                      <Globe className="mr-2 h-4 w-4" />
                      Ajouter un site Web
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAccount;
