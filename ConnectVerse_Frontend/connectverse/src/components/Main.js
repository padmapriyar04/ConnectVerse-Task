import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const MainPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex flex-col items-center justify-center p-8">
      <h1 className="text-6xl font-extrabold text-white mb-4 text-center drop-shadow-lg">
        ConnectVerse
      </h1>
      <p className="text-2xl text-white font-light text-center mb-8">
        Your gateway to meaningful connections in the digital world.
      </p>

      <div className="max-w-3xl bg-white p-6 rounded-lg shadow-lg text-center">
        <p className="text-lg text-gray-800 mb-6">
          ConnectVerse is the next-generation social media platform designed to bring people together. 
          Whether you're catching up with friends, discovering new communities, or sharing your journey, 
          ConnectVerse helps you connect, engage, and grow. Join today to experience a world of social 
          interaction like never before!
        </p>

        <div className="flex justify-center gap-4">
          <button 
            onClick={() => navigate('/signup')} 
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full text-lg shadow-md transition  transform hover:scale-105"
          >
            Sign Up
          </button>
          <button 
            onClick={() => navigate('/login')} 
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-2 rounded-full text-lg shadow-md transition transform hover:scale-105"
          >
            Login
          </button>
        </div>
      </div>

      <footer className="mt-12 text-sm text-white/70">
        © 2024 ConnectVerse. All Rights Reserved.
      </footer>
    </div>
  );
};

export default MainPage;
