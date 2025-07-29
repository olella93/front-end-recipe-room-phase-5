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


      const res = await API.put('/users/profile', payload);

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

    <div className="profile-container min-h-screen bg-[#fdbb89] py-10 px-6 flex justify-center">
      <div className="max-w-3xl w-full bg-white p-8 rounded shadow-lg">
        <h1 className="text-3xl font-bold text-[#f47e3b] mb-8 animate-fade-in-down">
          My Profile
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col items-center animate-fade-in">
            {userData.image && (
              <img
                src={userData.image}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-[#f47e3b] hover:scale-105 transition-transform"
              />
            )}
            <input type="file" onChange={handleImageChange} />
          </div>

          <div>
            <label className="block font-medium">Name:</label>
            <input
              name="name"
              value={userData.name}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block font-medium">Email:</label>
            <input
              name="email"
              value={userData.email}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block font-medium">New Password:</label>
            <input
              name="password"
              type="password"
              value={userData.password}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              placeholder="Leave blank to keep current password"
            />
          </div>

          <button
            type="submit"
            className="bg-[#f47e3b] text-white px-6 py-2 rounded hover:bg-[#fb9751] transition duration-300"
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Update Profile'}
          </button>
        </form>

        <div className="mt-10 flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0 animate-fade-in-up">
          <button
            onClick={() => {
              localStorage.clear();
              window.location.href = '/login';
            }}
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
          >
            Logout
          </button>

          <button
            onClick={async () => {
              const confirmDelete = window.confirm('Are you sure you want to delete your profile? This cannot be undone.');
              if (!confirmDelete) return;

              try {
                await API.delete('/users/profile');
                localStorage.clear();
                window.location.href = '/signup';
              } catch (err) {
                console.error('Delete failed:', err);
                alert('Failed to delete your profile.');
              }
            }}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Delete Profile
          </button>
        </div>
      </div>
    <div className="min-h-screen p-8 profile-page" id="profile-page">
      <h1 className="text-3xl font-bold mb-8 profile-title" id="profile-title">My Profile</h1>
      <form onSubmit={handleSubmit} className="space-y-6 max-w-xl profile-form" id="profile-form">
        <div className="profile-image-section" id="profile-image-section">
          {userData.profile_image && (
            <img
              src={userData.profile_image}
              alt="Profile"
              className="w-32 h-32 rounded-full mb-4 object-cover"
            />
          )}
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>
        <div className="profile-input-section" id="profile-input-name">
          <label>Name:</label>
          <input
            name="name"
            value={userData.name}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="profile-input-section" id="profile-input-email">
          <label>Email:</label>
          <input
            name="email"
            value={userData.email}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="profile-input-section" id="profile-input-password">
          <label>New Password:</label>
          <input
            name="password"
            type="password"
            value={userData.password}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            placeholder="Leave blank to keep current password"
          />
        </div>
        <button
          type="submit"
          className="bg-orange-600 text-white px-6 py-2 rounded hover:bg-orange-700 profile-update-btn" id="profile-update-btn"
          disabled={loading}
        >
          {loading ? 'Updating...' : 'Update Profile'}
        </button>
      </form>

      <div className="mt-10 space-x-4 profile-actions" id="profile-actions">
        <button
          onClick={() => {
            localStorage.clear();
            window.location.href = '/login'; 
          }}
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 profile-logout-btn" id="profile-logout-btn"
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
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 profile-delete-btn" id="profile-delete-btn"
        >
          Delete Profile
        </button>
</div>
    </div>
  );
};

export default Profile;
