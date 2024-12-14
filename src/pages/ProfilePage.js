import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../utils/auth"; 

const ProfilePage = () => {
  const [userProfile, setUserProfile] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    profilePicture: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const storedProfile = JSON.parse(localStorage.getItem("userProfile")) || {
      name: "John Doe",
      email: "johndoe@example.com",
      phone: "1234567890",
      address: "123 Main Street, City",
      profilePicture: "", // No default profile picture initially
    };
    setUserProfile(storedProfile);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserProfile({ ...userProfile, [name]: value });
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        const imageUrl = reader.result;
        setUserProfile((prevState) => ({
          ...prevState,
          profilePicture: imageUrl,
        }));
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please select a valid image file.");
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    localStorage.setItem("userProfile", JSON.stringify(userProfile));
    setIsEditing(false);
    alert("Profile updated successfully!");
  };

  return (
    <div className="profile-page">
      <h1>Your Profile</h1>
      <div className="profile-img-container">
        <img
          src={
            userProfile.profilePicture ||
            "https://via.placeholder.com/150" // Placeholder if no image is provided
          }
          alt="Profile"
          className="profile-img"
        />
        {isEditing && (
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={handleProfilePicChange}
              style={{ display: "none" }}
              id="fileInput"
            />
            <label htmlFor="fileInput" className="file-label">
              Choose Profile Picture
            </label>
          </div>
        )}
      </div>

      {isEditing ? (
        <form onSubmit={handleSave} className="profile-form">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={userProfile.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={userProfile.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={userProfile.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={userProfile.address}
              onChange={handleChange}
              required
            />
          </div>
          <div className="button-container">
            <button type="submit" className="save-button">
              Save
            </button>
            <button
              type="button"
              className="cancel-button"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="profile-details">
          <p>
            <strong>Name:</strong> {userProfile.name}
          </p>
          <p>
            <strong>Email:</strong> {userProfile.email}
          </p>
          <p>
            <strong>Phone:</strong> {userProfile.phone}
          </p>
          <p>
            <strong>Address:</strong> {userProfile.address}
          </p>
          <button onClick={() => setIsEditing(true)} className="edit-button">
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
