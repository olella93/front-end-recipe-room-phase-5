import React, { useEffect, useState } from 'react';
import { uploadImageToCloudinary } from '../services/cloudinary';
import API from '../services/api';

const Profile = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    image: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {

        const res = await API.get('/users/profile');
        setUserData(res.data);

        const res = await API.get('/auth/profile');
        
        setUserData({
          name: res.data.name || '',
          email: res.data.email || '',
          profile_image: res.data.profile_image || '',
          password: '',
        });

        localStorage.setItem('user_profile', JSON.stringify(res.data));
      } catch (err) {
        console.error('Error fetching profile:', err);
      }
    };
    fetchProfile();
  }, []);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      setLoading(true);
      const imageUrl = await uploadImageToCloudinary(file);
      setUserData((prev) => ({ ...prev, image: imageUrl }));
      setLoading(false);
    } catch (err) {
      console.error('Cloudinary upload failed:', err);
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name: userData.name,
        email: userData.email,
        image: userData.image,
      };
      if (userData.password) payload.password = userData.password;


      const res = await API.put('/users/profile', payload);

      const res = await API.put('/auth/profile', payload);

      alert('Profile updated successfully!');
      localStorage.setItem('user_profile', JSON.stringify(res.data));
      setUserData((prev) => ({ ...prev, password: '' }));
    } catch (err) {
      console.error('Error updating profile:', err);
      alert('Failed to update profile.');
    }
  };

  return (

    <div className="profile-container min-h-screen bg-[#fdbb89] py-10 px-6 flex justify-center">
      <div className="max-w-3xl w-full bg-white p-8 rounded shadow-lg">
        <h1 className="text-3xl font-bold text-[#f47e3b] mb-8 animate-fade-in-down">
          My Profile
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col items-center animate-fade-in">
            {userData.image && (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 via-white to-orange-200 profile-page" id="profile-page">
      <div className="profile-card bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-orange-600 mb-6 text-center profile-title" id="profile-title">My Profile</h1>
        <form onSubmit={handleSubmit} className="space-y-6 profile-form" id="profile-form">
          <div className="flex flex-col items-center mb-4 profile-image-section" id="profile-image-section">
            <div className="relative w-24 h-24">

              <img
                src={userData.profile_image || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(userData.name) + '&background=f47e3b&color=fff&size=96'}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-4 border-orange-200 shadow-md"
              />
              <label htmlFor="profile-image-upload" className="absolute bottom-1 right-1 bg-orange-500 text-white rounded-full p-1.5 cursor-pointer shadow-md hover:bg-orange-600 transition">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 13l6-6m2 2a2.828 2.828 0 11-4-4 2.828 2.828 0 014 4z" />
                </svg>
                <input id="profile-image-upload" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
              </label>
            </div>
            <span className="text-xs text-gray-500 mt-1">Change profile image</span>
          </div>
          <div className="profile-input-section" id="profile-input-name">
            <label className="block text-gray-700 font-semibold mb-2">Name</label>
            <input
              name="name"
              value={userData.name}
              onChange={handleInputChange}
              className="input-field w-full"
              required
            />
          </div>
          <div className="profile-input-section" id="profile-input-email">
            <label className="block text-gray-700 font-semibold mb-2">Email</label>
            <input
              name="email"
              value={userData.email}
              onChange={handleInputChange}
              className="input-field w-full"
              required
            />
          </div>
          <div className="profile-input-section" id="profile-input-password">
            <label className="block text-gray-700 font-semibold mb-2">New Password</label>
            <input
              name="password"
              type="password"
              value={userData.password}
              onChange={handleInputChange}
              className="input-field w-full"
              placeholder="Leave blank to keep current password"
            />
          </div>
          <button
            type="submit"
            className="login-btn w-full profile-update-btn py-2 text-base font-semibold" id="profile-update-btn"
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Update Profile'}
          </button>
        </form>
        <div className="flex justify-between mt-8 profile-actions" id="profile-actions">
          <button
            onClick={() => {
              localStorage.clear();
              window.location.href = '/login'; 
            }}
            className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 profile-logout-btn text-sm" id="profile-logout-btn"
          >
            Logout
          </button>
          <button
            onClick={async () => {
              const confirmDelete = window.confirm('Are you sure you want to delete your profile? This cannot be undone.');
              if (!confirmDelete) return;
              try {
                await API.delete('/auth/profile'); 
                localStorage.clear();
                window.location.href = '/signup';
              } catch (err) {
                console.error('Delete failed:', err);
                alert('Failed to delete your profile.');
              }
            }}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 profile-delete-btn text-sm" id="profile-delete-btn"
          >
            Delete Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
