/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import './Home.css';  // Link to your CSS for styling
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import Navbar from './Navbar';

const Movie = (props) => {
    const [moviesList, setMovieList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("https://ticket-booking-mern-backend.onrender.com/movie-list")
            .then((result) => {
                setMovieList(result.data);
            })
            .catch((error) => {
                console.error("Error fetching movies:", error);
            });
    }, []);

    const handleNavigateMovie = (item) => {
        props.setSelectedMovie(item);
        navigate(`/movie/${item.title}`);
    }

    // Function to truncate synopsis
    const truncateSynopsis = (synopsis, maxLength) => {
        if (synopsis.length > maxLength) {
            return synopsis.substring(0, maxLength) + '...';
        }
        return synopsis;
    };

    return (
        <div className="home-container">
            <Navbar></Navbar>
            {/* Featured Movies Section */}
            <div className="container">
                <div className="row">
                    {
                        moviesList.map((item, key) => (
                            <div className="col-md-4 p-3" key={item.id || key}>
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

export default Movie;