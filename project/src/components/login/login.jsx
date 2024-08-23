import React, { useState } from 'react';
import {signIn } from '../../api/login';

import LoadingIndicator from '../../hooks/loading';


export default function Form() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await signIn(formData, setIsLoading);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="w-full h-1/2">
      로그인
      <form onSubmit={handleSubmit} className="flex flex-col justify-evenly items-center w-full h-full">
        <input
          type="text"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className="bg-transparent rounded-lg border border-white w-4/5 h-8 text-white"
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          className="bg-transparent rounded-lg border border-white w-4/5 h-8 text-white"
        />
        <button type="submit" disabled={isLoading} className={`w-52 p-2 rounded-md outline-none cursor-pointer text-white bg-blue-500 transition-colors duration-300 ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}>
          로그인
        </button>
      </form>
      {isLoading && <LoadingIndicator />}
    </div>

  );
}
