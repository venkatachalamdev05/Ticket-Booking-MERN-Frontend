import React, { useState } from 'react';
import './SignIn.css';  // Optional for additional styling
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Import useNavigate

function SignIn(props) {
    const [formData, setFormData] = useState({
        name: '',
        password: ''
    });
    const navigate = useNavigate();  // Initialize useNavigate

    const [showPassword, setShowPassword] = useState(false); // For toggling password visibility
    const [alertMessage, setAlertMessage] = useState(''); // For alert messages from API
    const [alertType, setAlertType] = useState(''); // For alert type (success or danger)

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSignUpClick = () => {
        navigate('/');  // Redirect to Sign In page without refreshing
      };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Clear any previous alert message
        setAlertMessage('');

        axios.post('http://localhost:5000/signin-user', formData)
            .then((result) => {
                // Check if the response is successful
                if (result.data.message === "Login successfull") {
                    localStorage.setItem("user",formData.name)
                    setAlertMessage(result.data.message);
                    navigate('/home'); // Redirect to ho
                    setAlertType("success"); // Bootstrap success alert
                }
            })
            .catch((error) => {
                // Check if the error message is relevant
                if (error.response && error.response.data.message) {
                    setAlertMessage(error.response.data.message);
                    setAlertType("danger"); // Bootstrap danger alert
                }
            });

        // Clear form after submission
        setFormData({
            name: '',
            password: ''
        });
    };

    // Toggle password visibility
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="signin-page">
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="card-title text-center mb-4">SIGN IN</h3>

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
                                <button type="submit" className="btn btn-danger w-100">Sign In</button>
                            </form>
                        </div>
                        <p className='text-center'>
                           New User?
                            <span onClick={handleSignUpClick} style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline', paddingLeft: "5px" }}>
                                Sign Up
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
}

export default SignIn;
