import React, { useEffect, useState } from 'react';
import API from '../services/api';
import { uploadImageToCloudinary } from '../services/cloudinary';

const Profile = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    profile_image: '',
    password: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
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
    if (file) {
      setLoading(true);
      try {
        // Upload to Cloudinary and get URL
        const imageUrl = await uploadImageToCloudinary(file);
        setUserData((prev) => ({ ...prev, profile_image: imageUrl }));
      } catch (err) {
        alert('Image upload failed.');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Only send JSON to /auth/profile
      const payload = {
        username: userData.name,
        email: userData.email,
        profile_image: userData.profile_image,
      };
      if (userData.password) payload.password = userData.password;
      const res = await API.put('/auth/profile', payload);
      alert('Profile updated successfully!');
      localStorage.setItem('user_profile', JSON.stringify(res.data));
      setUserData((prev) => ({ ...prev, password: '' }));
    } catch (err) {
      console.error('Error updating profile:', err);
      alert('Failed to update profile.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 via-white to-orange-200 profile-page" id="profile-page">
      <div className="profile-card bg-white rounded-2xl shadow-2xl p-10 w-full max-w-lg">
        <h1 className="text-4xl font-bold text-orange-600 mb-8 text-center profile-title" id="profile-title">My Profile</h1>
        <form onSubmit={handleSubmit} className="space-y-7 profile-form" id="profile-form">
          <div className="flex flex-col items-center mb-6 profile-image-section" id="profile-image-section">
            <div className="relative">
              <img
                src={userData.profile_image || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(userData.name) + '&background=f47e3b&color=fff&size=128'}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-orange-200 shadow-lg"
              />
              <label htmlFor="profile-image-upload" className="absolute bottom-2 right-2 bg-orange-500 text-white rounded-full p-2 cursor-pointer shadow-md hover:bg-orange-600 transition">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 13l6-6m2 2a2.828 2.828 0 11-4-4 2.828 2.828 0 014 4z" />
                </svg>
                <input id="profile-image-upload" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
              </label>
            </div>
            <span className="text-sm text-gray-500 mt-2">Click the icon to change your profile image</span>
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
            className="login-btn w-full profile-update-btn" id="profile-update-btn"
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Update Profile'}
          </button>
        </form>
        <div className="flex justify-between mt-10 profile-actions" id="profile-actions">
          <button
            onClick={() => {
              localStorage.clear();
              window.location.href = '/login'; 
            }}
            className="bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-800 profile-logout-btn" id="profile-logout-btn"
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
            className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 profile-delete-btn" id="profile-delete-btn"
          >
            Delete Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
