    // Sidebar.js
    import React, { useState } from 'react';
    import { Link } from 'react-router-dom';
    import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
    import {faTachometerAlt, faPlus, faEye, faUserPlus, faUsers} from '@fortawesome/free-solid-svg-icons';
    import Aymen from '../dash/header';

    const Sidebar = () => {
        const [isOpen, setIsOpen] = useState(false);

        const toggleSidebar = () => {
            setIsOpen(!isOpen);
        };

        return (
            
            <div>
            
            
                <button
                    onClick={toggleSidebar}
                    aria-controls="default-sidebar"
                    type="button"
                    className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                >
                    <span className="sr-only">
                    Ouvrir la barre latérale</span>
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

                <aside
                    id="default-sidebar"
                    className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} sm:translate-x-0`}
                    aria-label="Sidebar"
                >
                    <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                                        <ul className="space-y-2 font-medium">
                                            <li>
                                                <Link to="/Admin" className="flex items-center p-2 text-gray-900 rounded-lg">
                                                    <FontAwesomeIcon icon={faTachometerAlt} className="me-2" />
                                                    Dashboard
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/Package" className="flex items-center p-2 text-gray-900 rounded-lg">
                                                    <FontAwesomeIcon icon={faPlus} className="me-2" />
                                                    
                                                Ajouter un paquet
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/showhostingCycleSchema" className="flex items-center p-2 text-gray-900 rounded-lg">
                                                    <FontAwesomeIcon icon={faEye} className="me-2" />
                                                    
                                                Voir le forfait
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/Admin" className="flex items-center p-2 text-gray-900 rounded-lg">
                                                    <FontAwesomeIcon icon={faUsers} className="me-2" />
                                                    Voir les utilisateurs
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                </aside>
            
            
            </div>
        
        );
    };

    export default Sidebar;