import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory
import axios from 'axios';
import Cookies from 'js-cookie';

const CreateProject = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Use useNavigate hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = Cookies.get('userId'); // Assuming you have the userId in cookies

    // Validate form fields
    if (!title || !description) {
      setError('Title and description are required.');
      return;
    }

    try {
      // Create a new project
      const response = await axios.post('http://localhost:5000/api/Projects/create', {
        title,
        description,
        userId,
      });

      if (response.status === 201) {
        navigate('/projectManagement'); 
      }
    } catch (err) {
      console.error("Error creating project:", err);
      setError('Failed to create project. Please try again.');
    }
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-xl font-bold mb-4">Create New Project</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-4">
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            rows="4"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white font-bold py-2 px-4 rounded">
          Create Project
        </button>
      </form>
    </div>
  );
};

export default CreateProject;
