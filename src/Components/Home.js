/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import './Home.css';  // Link to your CSS for styling
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import Navbar from './Navbar';
const Home = (props) => {
    const [moviesList, setMovieList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:5000/home-movie-list")
            .then((result) => {
                setMovieList(result.data);
            })
            .catch((error) => {
                console.error("Error fetching movies:", error);
            });
    }, []);

    // Function to truncate synopsis
    const truncateSynopsis = (synopsis, maxLength) => {
        if (synopsis.length > maxLength) {
            return synopsis.substring(0, maxLength) + '...';
        }
        return synopsis;
    };

    const handleSignInClick = () => {
        navigate('/movie');  // Redirect to Sign In page without refreshing
    };

    const handleNavigateMovie = (item) => {
        props.setSelectedMovie(item);
        navigate(`/movie/${item.title}`);
    }

    return (
        <div className="home-container">
            {/* Navbar */}
            <Navbar></Navbar>

            {/* Hero Section */}
            <div className="hero-section text-light">
                <div className='hero-section-sub'>
                    <h1>Welcome to TicketBooking</h1>
                    <p className="lead">Book your favorite movie tickets, concerts, and more!</p>
                    <a onClick={handleSignInClick} className="btn btn-danger btn-lg">Explore Movies</a>
                </div>
            </div>

            {/* Featured Movies Section */}
            <div className="container mt-5 featured-movies">
                <h2 className="text-center mb-4 text-white">Featured Movies</h2>
                <div className="row">
                    {
                        moviesList.map((item, key) => (
                            <div className="col-md-4" key={item.id || key}>
                                <div className="card">
                                    <img src={item.poster_image} className="card-img-top" alt={item.title} />
                                    <div className="card-body">
                                        <h5 className="card-title">{item.title}</h5>
                                        <p className="card-text">{truncateSynopsis(item.synopsis, 100)}</p>
                                        <a onClick={() => handleNavigateMovie(item)} className="btn btn-primary">Book Now</a>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>

            {/* Footer */}
            <footer className="footer bg-dark text-light text-center py-3 mt-5">
                <p>&copy; 2024 TicketBooking. All Rights Reserved.</p>
            </footer>
        </div>
    );
};

export default Home;
