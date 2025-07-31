import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfile, updateProfile, uploadProfileImage } from '../features/auth/authSlice';

export default function Profile() {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    username: '',
    email: ''
  });

  useEffect(() => {
    if (!user) {
      dispatch(fetchProfile());
    } else {
      setFormData({
        username: user.username || '',
        email: user.email || ''
      });
    }
  }, [dispatch, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(updateProfile(formData));
  };

  const handleImageUpload = (e) => {
    if (e.target.files.length > 0) {
      dispatch(uploadProfileImage(e.target.files[0]));
    }
  };

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div className="form-container profile-form-container">
      <h1 className="form-title">My Profile</h1>
      {user && (
        <>
          {user.profile_image && (
            <img src={user.profile_image} alt="Profile" className="profile-image" />
          )}
          <div className="form-group">
            <label htmlFor="profile-image">Change Profile Picture</label>
            <input id="profile-image" type="file" accept="image/*" onChange={handleImageUpload} />
          </div>
          <form className="form profile-form" onSubmit={handleUpdate}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input id="username" type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input id="email" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
            </div>
            <button className="form-btn" type="submit">Save Changes</button>
          </form>
        </>
      )}
    </div>
  );
}
