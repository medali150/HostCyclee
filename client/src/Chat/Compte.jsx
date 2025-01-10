import React from 'react';
import { User, Mail, Calendar, DollarSign, Clock, ImageIcon } from 'lucide-react';
import Navbar from '../components/navbar';
import Aymen from '../dash/header'
import { useContext, useState } from 'react';
import { AppContent } from '../context/Appcontext';

const Compte = ({ user }) => {

  const { userData, setIsLogin, setUserData } = useContext(AppContent);
  // This is a placeholder. In a real application, you would fetch the user data from your backend.
  const placeholderUser = {
    name: "John Doe",
    email: "john.doe@example.com",
    isAcconuntVerified: true,
    isAdmin: false,
    startDate: new Date("2023-01-01"),
    endDate: new Date("2023-12-31"),
    cost: 99.99,
    duration: "1 year",
    image: "/placeholder.svg?height=200&width=200"
  };

  // Use the placeholder data if no user is provided
  

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div>
    <Aymen/>
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Informations du compte utilisateur</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">Détails personnels et informations sur l'abonnement.</p>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500 flex items-center">
                  <User className="mr-2 h-5 w-5 text-gray-400" /> Nom
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{userData.name}</dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500 flex items-center">
                  <Mail className="mr-2 h-5 w-5 text-gray-400" /> Adresse e-mail
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{userData.email}</dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Compte vérifié</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {userData.isAcconuntVerified ? (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Vérifié
                    </span>
                  ) : (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                      Non vérifié
                    </span>
                  )}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Statut administrateur</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {userData.isAdmin ? (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                      Administrateur
                    </span>
                  ) : (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                      Utilisateur standard
                    </span>
                  )}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500 flex items-center">
                  <Calendar className="mr-2 h-5 w-5 text-gray-400" /> Date de début
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{formatDate(userData.startDate)}</dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500 flex items-center">
                  <Calendar className="mr-2 h-5 w-5 text-gray-400" /> Date de fin
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{formatDate(userData.endDate)}</dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500 flex items-center">
                  <DollarSign className="mr-2 h-5 w-5 text-gray-400" /> Coût
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{userData.cost} €</dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500 flex items-center">
                  <Clock className="mr-2 h-5 w-5 text-gray-400" /> Durée
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{userData.duration}</dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500 flex items-center">
                  <ImageIcon className="mr-2 h-5 w-5 text-gray-400" /> Image de profil
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <img src={userData.image} alt="Profile" className="h-24 w-24 rounded-full" />
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Compte;

