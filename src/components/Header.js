import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

function Header() {
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [user, setUser] = useState(null);

  // Function to handle Google login success
  const onSuccess = (response) => {
    let token = response.credential;
    localStorage.setItem("EcommerceWebsitetoken", token); // Save token to local storage
    let userInfo = jwtDecode(token); // Decode the JWT to get user info
    setUser(userInfo); // Set user info in state
    alert(`Login Successful! Welcome, ${userInfo.email.split("@")[0]}`);
    setShowModal(false); // Close the modal
  };

  // Error callback for Google login
  const onError = () => {
    console.log("Login Failed");
  };

  // Logout function
  const logout = () => {
    let doLogout = window.confirm("Are you sure you want to log out?");
    if (doLogout === true) {
      localStorage.removeItem("EcommerceWebsitetoken");
      setUser(null); // Clear user state
      alert("Logged out successfully");
    }
  };

  return (
    <GoogleOAuthProvider clientId="493607288841-iol0ejctqf89i58s7co94pn7h5jtd3of.apps.googleusercontent.com">
      <nav className="navbar">
        <div className="navbar-left">
          <Link to="/">Home</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/checkout">Checkout</Link>
          <Link to="/profile">Profile</Link>
        </div>

        <div className="navbar-right">
          {user ? (
            <>
              <span className="fw-bold text-white">
                Welcome, {user.email.split("@")[0]}
              </span>
              <button onClick={logout} className="btn1 btn-outline-light btn-sm">
                Logout
              </button>
            </>
          ) : (
            <button
              className="btn btn-outline-light m-3 ms-3 btn-sm"
              onClick={() => setShowModal(true)} // Open modal when clicked
            >
              Login
            </button>
          )}
        </div>
      </nav>

      {/* Google Login Modal */}
      {showModal && (
        <div className="modal fade show" style={{ display: "block", zIndex: 1050 }} aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Login</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)} // Close modal
                ></button>
              </div>
              <div className="modal-body">
                <GoogleLogin onSuccess={onSuccess} onError={onError} />
              </div>
            </div>
          </div>
        </div>
      )}
    </GoogleOAuthProvider>
  );
}

export default Header;
