import React, { useState } from 'react';
import './SignUp.css';  // This will include the background styles
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Import useNavigate

function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [showPassword, setShowPassword] = useState(false); // For toggling password visibility
  const [errorMessage, setErrorMessage] = useState(''); // For validation error message
  const [alertMessage, setAlertMessage] = useState(''); // For success/error messages from API
  const [alertType, setAlertType] = useState(''); // For alert type (success or danger)

  const navigate = useNavigate();  // Initialize useNavigate

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setAlertMessage("");
    setErrorMessage("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Password and confirm password validation
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    // Clear error message if passwords match
    setErrorMessage('');

    axios.post('https://ticket-booking-mern-backend.onrender.com/signup-user', formData)
      .then((result) => {
        // Check if the response is successful
        if (result.data.message === "User successfully created") {
          setAlertMessage(result.data.message);
          setAlertType("success"); // Bootstrap success alert
          // Clear form after submission
          setFormData({
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
          });
        }
      })
      .catch((error) => {
        // Check if the error message is "Username or email already exists"
        if (error.response && error.response.data.message === "Username or email already exists") {
          setAlertMessage(error.response.data.message);
          setAlertType("danger"); // Bootstrap danger alert
        }
      });
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignInClick = () => {
    navigate('/sign-in');  // Redirect to Sign In page without refreshing
  };

  return (
    <div className="signup-page">
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title text-center mb-4">SIGN UP</h3>

              {/* Display alert messages */}
              {alertMessage && (
                <div className={`alert alert-${alertType} alert-dismissible fade show`} role="alert">
                  {alertMessage}
                  <button type="button" className="btn-close" onClick={() => setAlertMessage('')}></button>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <div className="input-group">
                    <input
                      type={showPassword ? "text" : "password"} // Toggle between password and text type
                      className="form-control"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                  <div className="input-group">
                    <input
                      type={showPassword ? "text" : "password"} // Toggle between password and text type
                      className="form-control"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>
                {errorMessage && (
                  <p className="text-danger text-center">{errorMessage}</p> // Display error message for password mismatch
                )}
                <button type="submit" className="btn btn-danger w-100">Sign Up</button>
              </form>

            </div>
            <p className='text-center'>
              Already a user?
              <span onClick={handleSignInClick} style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline', paddingLeft: "5px" }}>
                Sign In
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default SignUp;
