"use client";

import React, { useState } from 'react';
import Switch from 'react-switch';
import { FaGlobe, FaMoon } from 'react-icons/fa';
import { AiOutlineEdit } from 'react-icons/ai';

const translations = {
  english: {
    preferences: 'Preferences',
    language: 'Language',
    darkMode: 'Dark Mode',
    login: 'Login',
    username: 'Username',
    password: 'Password',
    enterUsername: 'Enter your username',
    enterPassword: 'Enter your password',
    loginButton: 'Login',
    logoutButton: 'Log Out',
  },
  korean: {
    preferences: '환경설정',
    language: '언어',
    darkMode: '다크 모드',
    login: '로그인',
    username: '사용자 이름',
    password: '비밀번호',
    enterUsername: '사용자 이름을 입력하세요',
    enterPassword: '비밀번호를 입력하세요',
    loginButton: '로그인',
    logoutButton: '로그아웃',
  },
};

const Example: React.FC = () => {
  const [form, setForm] = useState({
    darkMode: false,
    language: 'english' as 'english' | 'korean',
    username: '',
    password: '',
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleDarkMode = () => setForm({ ...form, darkMode: !form.darkMode });
  const setLanguage = (language: 'english' | 'korean') =>
    setForm({ ...form, language });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleLogin = () => {
    if (form.username && form.password) {
      setIsLoggedIn(true);
    } else {
      alert('Please enter a valid username and password.');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setForm({ ...form, username: '', password: '' });
  };

  const t = translations[form.language];

  return (
    <div className={`min-h-screen ${form.darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <div className="max-w-xl mx-auto p-6">
        {!isLoggedIn && (
          <div className="flex flex-col items-center justify-center mb-6">
            <h2 className={`text-2xl font-semibold mb-4 ${form.darkMode ? 'text-white' : 'text-black'}`}>{t.login}</h2>
            <label htmlFor="username" className={`block text-lg font-semibold mb-2 ${form.darkMode ? 'text-white' : 'text-black'}`}>{t.username}</label>
            <input
              id="username"
              name="username"
              title={t.username}
              className={`border p-2 rounded w-full mb-4 ${form.darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-black'}`}
              placeholder={t.enterUsername}
              value={form.username}
              onChange={handleInputChange}
            />
            <label htmlFor="password" className={`block text-lg font-semibold mb-2 ${form.darkMode ? 'text-white' : 'text-black'}`}>{t.password}</label>
            <input
              id="password"
              name="password"
              title={t.password}
              className={`border p-2 rounded w-full mb-4 ${form.darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-black'}`}
              placeholder={t.enterPassword}
              type="password"
              value={form.password}
              onChange={handleInputChange}
            />
            <button
              className={`w-full p-2 rounded ${form.darkMode ? 'bg-blue-300 text-black' : 'bg-blue-500 text-white'}`}
              onClick={handleLogin}
            >
              {t.loginButton}
            </button>
          </div>
        )}

        {isLoggedIn && (
          <div className="flex items-center justify-center flex-col mb-6 relative">
            <img
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80"
              alt="Profile"
              className="w-24 h-24 rounded-full mb-2"
            />
            <AiOutlineEdit className={`absolute right-0 top-0 ${form.darkMode ? 'text-blue-300' : 'text-blue-500'} cursor-pointer`} size={20} />
            <h1 className={`text-xl font-semibold ${form.darkMode ? 'text-white' : 'text-black'}`}>{form.username}</h1>
          </div>
        )}

        <div className="mb-6">
          <h2 className={`text-lg font-semibold mb-4 ${form.darkMode ? 'text-white' : 'text-black'}`}>{t.preferences}</h2>
          <div className="space-y-4">
            <div className={`w-full flex items-center justify-between p-4 rounded ${form.darkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
              <div className="flex items-center space-x-3">
                <FaGlobe size={20} color="#fe9400" />
                <span>{t.language}</span>
              </div>
              <div className="flex space-x-4">
                <button
                  title="Select English"
                  className={`p-2 rounded ${form.language === 'english' ? 'bg-blue-500 text-white' : form.darkMode ? 'bg-gray-600 text-white' : 'bg-gray-300'}`}
                  onClick={() => setLanguage('english')}>
                  English
                </button>
                <button
                  title="Select Korean"
                  className={`p-2 rounded ${form.language === 'korean' ? 'bg-blue-500 text-white' : form.darkMode ? 'bg-gray-600 text-white' : 'bg-gray-300'}`}
                  onClick={() => setLanguage('korean')}>
                  한국어
                </button>
              </div>
            </div>
            <div className={`w-full flex items-center justify-between p-4 rounded ${form.darkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
              <div className="flex items-center space-x-3">
                <FaMoon size={20} color="#007afe" />
                <span>{t.darkMode}</span>
              </div>
              <div>
                <Switch
                  checked={form.darkMode}
                  onChange={toggleDarkMode}
                  offColor="#e2e8f0"
                  onColor="#4f46e5"
                  offHandleColor="#ffffff"
                  onHandleColor="#ffffff"
                  uncheckedIcon={false}
                  checkedIcon={false}
                  height={20}
                  width={40}
                  handleDiameter={20}
                />
              </div>
            </div>
            {isLoggedIn && (
              <button
                className={`w-full p-2 rounded ${form.darkMode ? 'bg-red-300 text-black' : 'bg-red-500 text-white'}`}
                onClick={handleLogout}
              >
                {t.logoutButton}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Example;
