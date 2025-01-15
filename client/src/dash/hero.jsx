import React, { useState,useContext } from 'react';
import { Bell, Calendar, Users, Activity, ChevronRight, Mail, Phone, MapPin, Check } from 'lucide-react';
import { AppContent } from '../context/Appcontext';

const Hero = () => {
  const {userData} =useContext(AppContent);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        

        {isMenuOpen && (
          <div className="md:hidden" id="mobile-menu">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a href="#features" className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium">Fonctionnalités</a>
              <a href="#pricing" className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium">Tarifs</a>
              <a href="#testimonials" className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium">Témoignages</a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium">Contact</a>
            </div>
            <div className="pt-4 pb-3 border-t border-gray-700">
              <div className="flex items-center px-5">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300 w-full">
                  Commencer
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
        {!userData ? (<>
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">Simplifiez la gestion de vos</span>
            <span className="block text-blue-600">cycles d'hébergement</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            HostCycle centralise les informations de vos clients et assure un suivi proactif des échéances d'hébergement pour une gestion sans souci.
          </p></>) : ( 
            <>
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">
            Comment vas-tu  {userData.name} </span>
            <span className="block text-blue-600">
            Êtes-vous prêt à commencer avec nous ?</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            HostCycle centralise les informations de vos clients et assure un suivi proactif des échéances d'hébergement pour une gestion sans souci.
          </p>
          </>
          )}
          {!userData && (
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <div className="rounded-md shadow">
              <a href="#" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10">
                Essai gratuit
              </a>
            </div>
            <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
              <a href="#" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10">
                En savoir plus
              </a>
            </div>
          </div>)}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-white">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Fonctionnalités principales
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Découvrez comment HostCycle peut simplifier votre gestion d'hébergement
          </p>
        </div>
        <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center h-16 w-16 rounded-md bg-blue-500 text-white">
              <Users className="h-8 w-8" />
            </div>
            <h3 className="mt-8 text-lg font-medium text-gray-900">Enregistrement des clients</h3>
            <p className="mt-2 text-base text-gray-500 text-center">
              Stockez facilement les informations de vos clients et les détails de leurs sites hébergés.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center h-16 w-16 rounded-md bg-blue-500 text-white">
              <Calendar className="h-8 w-8" />
            </div>
            <h3 className="mt-8 text-lg font-medium text-gray-900">Gestion des cycles</h3>
            <p className="mt-2 text-base text-gray-500 text-center">
              Définissez la durée du cycle (1 an ou 6 mois) et enregistrez les coûts d'hébergement.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center h-16 w-16 rounded-md bg-blue-500 text-white">
              <Bell className="h-8 w-8" />
            </div>
            <h3 className="mt-8 text-lg font-medium text-gray-900">Rappels automatisés</h3>
            <p className="mt-2 text-base text-gray-500 text-center">
              Recevez des e-mails de rappel avant l'expiration de l'hébergement pour une gestion proactive.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center h-16 w-16 rounded-md bg-blue-500 text-white">
              <Activity className="h-8 w-8" />
            </div>
            <h3 className="mt-8 text-lg font-medium text-gray-900">Tableau de bord intuitif</h3>
            <p className="mt-2 text-base text-gray-500 text-center">
              Visualisez facilement la liste des clients, leurs cycles et les prochaines échéances.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-gray-100">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Tarifs simples et transparents
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Choisissez le plan qui convient le mieux à vos besoins
          </p>
        </div>
        <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="px-6 py-8">
              <h3 className="text-2xl font-semibold text-gray-900">Débutant</h3>
              <p className="mt-4 text-gray-500">Parfait pour les petites entreprises</p>
              <p className="mt-8">
                <span className="text-4xl font-extrabold text-gray-900">19€</span>
                <span className="text-base font-medium text-gray-500">/mois</span>
              </p>
              <ul className="mt-8 space-y-4">
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>Jusqu'à 10 clients</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>Rappels par e-mail</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>Tableau de bord basique</span>
                </li>
              </ul>
            </div>
            <div className="px-6 py-8 bg-gray-50">
              <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300">
                Commencer
              </button>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-blue-500">
            <div className="px-6 py-8">
              <h3 className="text-2xl font-semibold text-gray-900">Pro</h3>
              <p className="mt-4 text-gray-500">Idéal pour les entreprises en croissance</p>
              <p className="mt-8">
                <span className="text-4xl font-extrabold text-gray-900">49€</span>
                <span className="text-base font-medium text-gray-500">/mois</span>
              </p>
              <ul className="mt-8 space-y-4">
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>Jusqu'à 50 clients</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>Rappels par e-mail et SMS</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>Tableau de bord avancé</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>Rapports personnalisés</span>
                </li>
              </ul>
            </div>
            <div className="px-6 py-8 bg-gray-50">
              <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300">
                Commencer
              </button>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="px-6 py-8">
              <h3 className="text-2xl font-semibold text-gray-900">Entreprise</h3>
              <p className="mt-4 text-gray-500">Pour les grandes organisations</p>
              <p className="mt-8">
                <span className="text-4xl font-extrabold text-gray-900mt-8">
                <span className="text-4xl font-extrabold text-gray-900">99€</span>
                <span className="text-base font-medium text-gray-500">/mois</span>
                </span>
              </p>
              <ul className="mt-8 space-y-4">
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>Clients illimités</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>Rappels multicanaux</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>Tableau de bord personnalisable</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>API pour intégrations</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>Support prioritaire</span>
                </li>
              </ul>
            </div>
            <div className="px-6 py-8 bg-gray-50">
              <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300">
                Nous contacter
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-white">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Ce que disent nos clients
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Découvrez comment HostCycle a aidé d'autres entreprises à simplifier leur gestion d'hébergement
          </p>
        </div>
        <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="bg-gray-100 rounded-lg p-8">
            <p className="text-gray-600 italic">"HostCycle a révolutionné notre façon de gérer les hébergements de nos clients. Nous ne manquons plus jamais une échéance !"</p>
            <div className="mt-4 flex items-center">
              <img src="/placeholder.svg?height=40&width=40" alt="Sophie Martin" className="w-10 h-10 rounded-full mr-4" />
              <div>
                <p className="font-semibold">Sophie Martin</p>
                <p className="text-gray-500 text-sm">Directrice, WebSolutions</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-100 rounded-lg p-8">
            <p className="text-gray-600 italic">"Grâce à HostCycle, nous avons pu automatiser nos rappels et réduire considérablement le temps passé à gérer les renouvellements."</p>
            <div className="mt-4 flex items-center">
              <img src="/placeholder.svg?height=40&width=40" alt="Thomas Dubois" className="w-10 h-10 rounded-full mr-4" />
              <div>
                <p className="font-semibold">Thomas Dubois</p>
                <p className="text-gray-500 text-sm">Fondateur, HostPro</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-100 rounded-lg p-8">
            <p className="text-gray-600 italic">"Le tableau de bord intuitif nous permet de avoir une vue d'ensemble claire de tous nos clients et de leurs échéances. C'est un outil indispensable pour notre entreprise."</p>
            <div className="mt-4 flex items-center">
              <img src="/placeholder.svg?height=40&width=40" alt="Marie Leroy" className="w-10 h-10 rounded-full mr-4" />
              <div>
                <p className="font-semibold">Marie Leroy</p>
                <p className="text-gray-500 text-sm">Responsable IT, TechHost</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-gray-100">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Contactez-nous
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Vous avez des questions ? Notre équipe est là pour vous aider.
          </p>
        </div>
        <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <form className="grid grid-cols-1 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nom</label>
                <input type="text" name="name" id="name" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" name="email" id="email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                <textarea name="message" id="message" rows="4" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"></textarea>
              </div>
              <div>
                <button type="submit" className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300">
                  Envoyer
                </button>
              </div>
            </form>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-xl font-semibold mb-4">Nos coordonnées</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <Mail className="h-6 w-6 text-blue-500 mr-2" />
                <span>contact@HostCyclegest.com</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-6 w-6 text-blue-500 mr-2" />
                <span>+33 1 23 45 67 89</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-6 w-6 text-blue-500 mr-2" />
                <span>123 Rue de l'Innovation, 75001 tozeur, tunisie</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
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
          <div className="mt-8 border-t border-gray-700 pt-8 flex justify-between items-center">
            <p className="text-base text-gray-400">&copy; 2023 HostCycle, Inc. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Hero;

