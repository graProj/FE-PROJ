import React, { useState } from 'react';

export default function Form({ onSubmit }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center text-black">
      <input
        type="text"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="email"
        className="mb-4 p-2 ra"
      />
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
        className="mb-4 p-2"
      />
      <button type="submit" className="p-2 bg-blue-500 text-white">Sign In</button>
    </form>
  );
}