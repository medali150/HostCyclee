import React, { useState, createContext,useEffect } from "react";
import { toast } from "react-toastify";
import axios from 'axios';
// Création du contexte
export const AppContent = createContext();

export const AppContextProvider = (props) => {
    axios.defaults.withCredentials=true ;//bech ki nfrichih lpage nab9a msagel login mta3i 
    const backendUrl = process.env.VITE_BACKEND_URL; // Assurez-vous que cette variable est définie
    const [isLogin, setIsLogin] = useState(false); // Correction de la casse pour les conventions de nommage
    const [userData, setUserData] = useState(false); 
    const [isAdmin, setIsAdmin] = useState(null); // `null` est plus courant que `false` pour les données utilisateur
    
    const getAuthState=async ()=>{
        try {
            const {data}=await axios.get('https://host-cycle-ji9x-aymens-projects-9ad69811.vercel.app/api/auth/isAuthenticated')  
            if(data.success){
                setIsLogin(true)
                getUserData()
            }
            
        } catch (error) {
            toast.error(error.message)
        }
    }
    useEffect(()=>{
        getAuthState();
    },[])
    
    const getUserData =async ()=>{
    try {
        const {data} =await axios.get('https://host-cycle-ji9x-aymens-projects-9ad69811.vercel.app/api/user/data')    
        data.success ? setUserData(data.userData):toast.error(data.message)
    } catch (error) {
        toast.error(error.message)
        
    }
   }
   const checkAdminStatus = async () => {
    try {
      const { data } = await axios.get('https://host-cycle-ji9x-aymens-projects-9ad69811.vercel.app/api/auth/isAdmin', {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } // Utilisation du token pour vérifier le rôle
      });
      if (data.success) {
        setIsAdmin(true); // Utilisateur est un administrateur
      } else {
        setIsAdmin(false); // Utilisateur n'est pas un administrateur
      }
    } catch (error) {
      toast.error("Erreur lors de la vérification du statut admin: " + error.message);
      setIsAdmin(false); // Par défaut, l'utilisateur n'est pas admin
    }
  };


    const value = {
        backendUrl,
        isLogin,
        setIsLogin,
        userData,
        setUserData,
        getUserData,
        isAdmin
    };

    return (
        <AppContent.Provider value={value}>
            {props.children}
        </AppContent.Provider>
    );
};
