'use client';

import React, { useState } from 'react';
import useAuthSession from '../hooks/useAuthSession';
import { toast, Toaster } from 'react-hot-toast';

const HomePage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ username: '', password: '' });
  const { user, login } = useAuthSession();

  const handleLogin = async (e:any) => {
    e.preventDefault();

    if (!username) {
      setErrors((prev) => ({ ...prev, username: 'Username is required' }));
    }
    if (!password) {
      setErrors((prev) => ({ ...prev, password: 'Password is required' }));
    }

    if (username && password) {
      try {
        await login(username, password);
      } catch (error) {
        console.error('Login error:', error);
      }
    }
  };

  return (
    <div className="flex items-center text-black justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <Toaster />
        {user ? (
          <div>
            <h2 className="text-xl font-bold">Welcome, {user.username}</h2>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold text-center">Login</h2>
            <form onSubmit={handleLogin}>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="w-full px-4 py-2 mt-4 border rounded-md"
              />
              {errors.username && <span className="text-red-500">{errors.username}</span>}
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full px-4 py-2 mt-4 border rounded-md"
              />
              {errors.password && <span className="text-red-500">{errors.password}</span>}
              <button
                type="submit"
                className="w-full px-4 py-2 mt-6 font-bold text-white bg-blue-500 rounded-md"
              >
                Login
              </button>
            </form>
          </div>
        )}
        <div className="mt-6 p-4 border rounded-md text-black bg-gray-50">
          <h3 className="text-lg font-semibold">The hook should be usable like this: </h3>
          <pre className="mt-2 p-2 text-gray-500 bg-gray-100 rounded-md">
            <code>
              {`const { user } = useAuthSession();
if (user) {
  console.log('User:', user.username);
}`}
            </code>
          </pre>
          <h4 className='text-sm text-green-500'>User:admin, Password:admin</h4>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
