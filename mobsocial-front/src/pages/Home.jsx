import React, { useEffect, useState } from 'react';
import Header from '../components/header';
import Projetos from '../components/home/projetos';
import UserMenu from '../components/dashboardVoluntario/UserMenu';
import { useNavigate } from 'react-router-dom';
import getUserById from '../services/userService';
import '../index.css';




const Home = () => {
  const [userData, setUserData] = useState(window.localStorage.getItem('user') ? JSON.parse(window.localStorage.getItem('user')) : null);
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => {
    if (userData) {
      getUserById(userData.data.id, setData);
    }
  }, [userData, navigate]);

  return (
    <>
      <Header />
      <div className="relative">
        <UserMenu />
        {userData && (
          <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Projetos Recomendados</h2>
            <Projetos />
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
