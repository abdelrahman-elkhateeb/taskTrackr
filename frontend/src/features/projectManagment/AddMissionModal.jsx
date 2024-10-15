/* eslint-disable react/prop-types */
import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const AddMissionModal = ({ modalOpen, setModalOpen, projectId, setReload, reload }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    userEmail: '',
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false); 

  const creatorId = Cookies.get('userId');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); 
    setSuccess(false); 

    try {
      const response = await axios.post('http://localhost:5000/api/Projects/addMission', {
        projectId,
        title: formData.title,
        description: formData.description,
        userEmail: formData.userEmail,
        creatorId,
      });

      if (response.data.success) {
        setSuccess(true);
        setFormData({ title: '', description: '', userEmail: '' }); 
        setTimeout(() =>{
            setModalOpen(false);
            setReload(!reload);
        }, 800);
      }
    } catch (error) {
      console.error('Error adding mission:', error);
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('Failed to add mission. Please try again.');
      }
    }
  };

  return (
    <>
      {modalOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h2 className="font-bold text-xl">Add Mission</h2>
            {error && <p className="text-red-500">{error}</p>} 
            {success && <p className="text-green-500">Mission added successfully!</p>}
            <form onSubmit={handleSubmit}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Description</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="textarea textarea-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">User Email</span>
                </label>
                <input
                  type="email"
                  name="userEmail"
                  value={formData.userEmail}
                  onChange={handleChange}
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="modal-action">
                <button type="submit" className="btn">Add Mission</button>
                <button type="button" className="btn" onClick={() => setModalOpen(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddMissionModal;
