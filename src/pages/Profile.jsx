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
    </div>
  );
};

export default Profile;
