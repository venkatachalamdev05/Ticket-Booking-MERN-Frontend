import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.css';
import SignUp from "./Components/SignUp";
import SignIn from "./Components/SignIn";
import Home from "./Components/Home";
import Movie from "./Components/Movie";
import ParticularMovies from "./Components/ParticularMovies";
import { useState } from "react";
import Theaters from "./Components/Theaters";
import SeatLayout from "./Components/SeatLayout";
import PaymentPage from "./Components/Payment";



function App() {
  const [selectedMovie, setSelectedMovie] = useState({});
  const [seatCount, setseatCount] = useState(0);
  const [movie, setMovie] = useState("");


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/home" element={<Home setSelectedMovie={setSelectedMovie} />} />
        <Route path="/movie" element={<Movie setSelectedMovie={setSelectedMovie} />} />
        <Route path="/movie/:title" element={<ParticularMovies selectedMovie={selectedMovie} setMovie={setMovie} />} />
        <Route path="/theaters" element={<Theaters setseatCount={setseatCount} seatCount={seatCount} />} />
        <Route path="/book" element={<SeatLayout seatCount={seatCount} />} />
        <Route path="/payment" element={<SeatLayout seatCount={PaymentPage} // Ensure this is passed
          movieTitle={selectedMovie} />} />
        PaymentPage
      </Routes>
    </BrowserRouter>
  );
}

export default App;
