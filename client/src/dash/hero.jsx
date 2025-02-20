import React, { useState,useContext ,useEffect} from 'react';
import { Bell, Calendar, Users, Activity, ChevronRight, Mail, Phone, MapPin, Check } from 'lucide-react';
import { AppContent } from '../context/Appcontext';

const Hero = () => {
  const {userData} =useContext(AppContent);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [index, setIndex] = useState(0);

  const phrases = [
    `
How are you ${userData?.name|| 'visiteur'} ? `
  ];

  useEffect(() => {
    const handleTyping = () => {
      const currentPhrase = phrases[index % phrases.length];
      const isTypingComplete = text === currentPhrase;

      if (isTypingComplete && !isDeleting) {
        setTimeout(() => setIsDeleting(true), 1000); // Pause before deleting
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setIndex((prevIndex) => prevIndex + 1);
      } else {
        const updatedText = isDeleting
          ? currentPhrase.substring(0, text.length - 1)
          : currentPhrase.substring(0, text.length + 1);
        setText(updatedText);
      }
    };

    const typingSpeed = isDeleting ? 50 : 150; // Faster when deleting
    const timer = setTimeout(handleTyping, typingSpeed);

    return () => clearTimeout(timer);
  }, [text, isDeleting, index]);


  return (
    
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        

        {isMenuOpen && (
          <div className="md:hidden" id="mobile-menu">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a href="#features" className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium">
              Features</a>
              <a href="#pricing" className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium">Prices</a>
              <a href="#testimonials" className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium">
              Testimonials</a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium">Contact</a>
            </div>
            <div className="pt-4 pb-3 border-t border-gray-700">
              <div className="flex items-center px-5">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300 w-full">
                Start
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
            <span className="block">Simplify the management of your</span>
            <span className="block text-blue-600">hosting cycles</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          HostCycle centralise les informations de vos clients et assure un suivi proactif des échéances d'hébergement pour une gestion sans souci.
          </p></>) : !userData.isAcconuntVerified ? ( <>
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            Can you verified you account pls ${userData?.name} ? 
          
          <span className="blinking-cursor">|</span>
          
          
       
          
        </h1>
          </>

            
          ) :(
    
    <>
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
          {text}
          
          <span className="blinking-cursor">|</span>
          <h1><span className="block text-blue-600">
          Are you ready to get started with us?</span></h1>
          
       
          
        </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          HostCycle centralise les informations de vos clients et assure un suivi proactif des échéances d'hébergement pour une gestion sans souci.
          </p>
          </>
          )}
          {!userData  && (
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <div className="rounded-md shadow">
              <a href="#" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10">
                Free trial
              </a>
            </div>
            <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
              <a href="#" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10">
              Learn more
              </a>
            </div>
          </div>)}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-white">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
           
          Main features
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
          Learn how HostCycle can simplify your hosting management
          </p>
        </div>
        <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center h-16 w-16 rounded-md bg-blue-500 text-white">
              <Users className="h-8 w-8" />
            </div>
            <h3 className="mt-8 text-lg font-medium text-gray-900">
            Customer registration</h3>
            <p className="mt-2 text-base text-gray-500 text-center">
       
Easily store your clients' information and details of their hosted sites.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center h-16 w-16 rounded-md bg-blue-500 text-white">
              <Calendar className="h-8 w-8" />
            </div>
            <h3 className="mt-8 text-lg font-medium text-gray-900">
            Cycle management</h3>
            <p className="mt-2 text-base text-gray-500 text-center">
              
Set the cycle duration (1 year or 6 months) and record hosting costs.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center h-16 w-16 rounded-md bg-blue-500 text-white">
              <Bell className="h-8 w-8" />
            </div>
            <h3 className="mt-8 text-lg font-medium text-gray-900">
            Automated reminders</h3>
            <p className="mt-2 text-base text-gray-500 text-center">
            Receive reminder emails before hosting expires for proactive management.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center h-16 w-16 rounded-md bg-blue-500 text-white">
              <Activity className="h-8 w-8" />
            </div>
            <h3 className="mt-8 text-lg font-medium text-gray-900">Intuitive dashboard</h3>
            <p className="mt-2 text-base text-gray-500 text-center">
              
Easily view the list of customers, their cycles and upcoming deadlines.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-gray-100">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Simple and transparent pricing
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
          
Choose the plan that best suits your needs        </p>
        </div>
        <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="px-6 py-8">
              <h3 className="text-2xl font-semibold text-gray-900">Beginner</h3>
              <p className="mt-4 text-gray-500">Perfect for small businesses</p>
              <p className="mt-8">
                <span className="text-4xl font-extrabold text-gray-900">19$</span>
                <span className="text-base font-medium text-gray-500">/mounth</span>
              </p>
              <ul className="mt-8 space-y-4">
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>Up to 10 customers</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>Email reminders</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>Basic dashboard</span>
                </li>
              </ul>
            </div>
            <div className="px-6 py-8 bg-gray-50">
              <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300">
                Start
              </button>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-blue-500">
            <div className="px-6 py-8">
              <h3 className="text-2xl font-semibold text-gray-900">Pro</h3>
              <p className="mt-4 text-gray-500">Ideal for growing businesses</p>
              <p className="mt-8">
                <span className="text-4xl font-extrabold text-gray-900">49$</span>
                <span className="text-base font-medium text-gray-500">/mounth</span>
              </p>
              <ul className="mt-8 space-y-4">
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>Up to 50 customers</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>Email and SMS reminders</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>Advanced dashboard</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>
                  Custom Reports</span>
                </li>
              </ul>
            </div>
            <div className="px-6 py-8 bg-gray-50">
              <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300">
                Start
              </button>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="px-6 py-8">
              <h3 className="text-2xl font-semibold text-gray-900">Business</h3>
              <p className="mt-4 text-gray-500">
              For large organizations</p>
              <p className="mt-8">
                <span className="text-4xl font-extrabold text-gray-900mt-8">
                <span className="text-4xl font-extrabold text-gray-900">99$</span>
                <span className="text-base font-medium text-gray-500">/mounth</span>
                </span>
              </p>
              <ul className="mt-8 space-y-4">
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>
                  Unlimited customers</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>
                  Multi-channel reminders</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>
                  Customizable dashboard</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>API for integrations</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>
                  Priority Support</span>
                </li>
              </ul>
            </div>
            <div className="px-6 py-8 bg-gray-50">
              <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300">
              Contact us
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-white">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          What our customers say
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
          Learn how HostCycle has helped other businesses simplify their hosting management Learn how HostCycle has helped other businesses simplify their hosting management
          </p>
        </div>
        <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="bg-gray-100 rounded-lg p-8">
            <p className="text-gray-600 italic">"
            HostCycle has revolutionized the way we manage our customers' hosting. We never miss a deadline again! HostCycle has revolutionized the way we manage our customers' hosting. We never miss a deadline again!"</p>
            <div className="mt-4 flex items-center">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBT-e9_wwxLqG6SgcGXMVtWxpDBuR8MAJ64Q&s" alt="Sophie Martin" className="w-10 h-10 rounded-full mr-4" />
              <div>
                <p className="font-semibold">Sophie Martin</p>
                <p className="text-gray-500 text-sm">Director, WebSolutions</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-100 rounded-lg p-8">
            <p className="text-gray-600 italic">"
            Using HostCycle, we were able to automate our reminders and significantly reduce the time spent managing renewals."</p>
            <div className="mt-4 flex items-center">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrtvcjtT2LXqNEw2p89EAVjvxD04sbPegiRQ&s" alt="Thomas Dubois" className="w-10 h-10 rounded-full mr-4" />
              <div>
                <p className="font-semibold">Thomas Dubois</p>
                <p className="text-gray-500 text-sm">Fondateur, HostPro</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-100 rounded-lg p-8">
            <p className="text-gray-600 italic">"The intuitive dashboard allows us to have a clear overview of all our clients and their deadlines. It is an essential tool for our business."</p>
            <div className="mt-4 flex items-center">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSffW4weIsjQDtUgmbVCLZzRx-4GKdBiZDHNQ&s" alt="Marie Leroy" className="w-10 h-10 rounded-full mr-4" />
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
          Contact us
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
          
Do you have any questions? Our team is here to help you.
          </p>
        </div>
        <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <form className="grid grid-cols-1 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
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
                  send
                </button>
              </div>
            </form>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-xl font-semibold mb-4">
            Our contact details</h3>
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
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Company</h3>
              <ul className="mt-4 space-y-4">
                <li><a href="#" className="text-base text-gray-300 hover:text-white">About</a></li>
                <li><a href="#" className="text-base text-gray-300 hover:text-white">Blog</a></li>
                <li><a href="#" className="text-base text-gray-300 hover:text-white">
                Jobs</a></li>
                <li><a href="#" className="text-base text-gray-300 hover:text-white">Press</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Support</h3>
              <ul className="mt-4 space-y-4">
                <li><a href="#" className="text-base text-gray-300 hover:text-white">help center</a></li>
                <li><a href="#" className="text-base text-gray-300 hover:text-white">Documentation</a></li>
                <li><a href="#" className="text-base text-gray-300 hover:text-white">Guides</a></li>
                <li><a href="#" className="text-base text-gray-300 hover:text-white">API Status</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Legal</h3>
              <ul className="mt-4 space-y-4">
                <li><a href="#" className="text-base text-gray-300 hover:text-white">
                Confidentiality</a></li>
                <li><a href="#" className="text-base text-gray-300 hover:text-white">Conditions</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Social</h3>
              <ul className="mt-4 space-y-4">
                <li><a href="https://www.facebook.com/ITQANdo/" className="text-base text-gray-300 hover:text-white">Facebook</a></li>
                <li><a href="https://x.com/Tenaris/status/1755712733440352559?mx=2#" className="text-base text-gray-300 hover:text-white">Twitter</a></li>
                <li><a href="https://tn.linkedin.com/company/itqanlabs" className="text-base text-gray-300 hover:text-white">LinkedIn</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-700 pt-8 flex justify-between items-center">
            <p className="text-base text-gray-400"></p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Hero;

