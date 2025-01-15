import { useParams } from 'react-router-dom';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './ParticularMovies.css'; // Link to your CSS for styling
import Navbar from './Navbar';

const ParticularMovies = (props) => {
    const { title } = useParams();
    

    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        localStorage.setItem("movie",title)
        axios.get(`https://ticket-booking-mern-backend.onrender.com/movie-list/${title}`)
            .then((result) => {
                // Access the first movie in the response array
                setSelectedMovie(result.data[0]);
            })
            .catch((error) => {
                console.error("Error fetching movie details:", error);
            });
    }, [title]);

    // Handle loading state while fetching movie data
    if (!selectedMovie) {
        return <div className='text-center'>
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>;
    }

    return (
        <div>
             <Navbar></Navbar>
            <div className="particular-movie-container">
                <div className="movie-poster">
                    {selectedMovie.poster_image && (
                        <img src={selectedMovie.poster_image} alt={selectedMovie.title} />
                    )}
                </div>
                <div className="movie-details">
                    <h1 className="movie-title">{selectedMovie.title}</h1>
                    <p className="movie-synopsis">{selectedMovie.synopsis}</p>
                    <p className="movie-release-date"><b>Release Date:</b> {selectedMovie.release_date}</p>
                    <p className="movie-rating"><b>Rating:</b> {selectedMovie.rating}</p>
                    <p className="movie-duration"><b>Duration:</b> {selectedMovie.duration}</p>
                    <p className="movie-language"><b>Language:</b> {selectedMovie.language}</p>
                    <p className="movie-genre"><b>Genre:</b> {selectedMovie.genre?.join(', ') || 'N/A'}</p>
                    <p className="movie-director"><b>Director:</b> {selectedMovie.director || 'N/A'}</p>
                    <p className="movie-cast"><b>Cast:</b> {selectedMovie.cast?.join(', ') || 'N/A'}</p>
                    <p className="movie-description"><b>Description:</b> {selectedMovie.description?.plot || 'No plot available'}</p>
                    <a href={`/theaters`} className="btn">Book Now</a>
                </div>
            </div>
        </div>
    );
};

export default ParticularMovies;
