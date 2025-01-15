import React, { useState } from 'react';
import './SeatLayout.css';  // Ensure CSS is correctly imported
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';  // Import useNavigate for navigation

const SeatLayout = (props) => {
  const { seatCount, user, movieTitle } = props;
  console.log(props);
  // Destructure props for clarity
  const navigate = useNavigate(); // Initialize navigate for future use

  // Create a 2D array representing the seat layout
  const initialSeats = [
    ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9', 'A10'],
    ['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B9', 'B10'],
    ['C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9', 'C10'],
  ];

  // State to track the selected seats
  const [selectedSeatsState, setSelectedSeatsState] = useState([]);

  // Function to handle seat selection
  const handleSeatClick = (seat) => {
    if (selectedSeatsState.includes(seat)) {
      // If seat is already selected, remove it from selectedSeats
      setSelectedSeatsState(selectedSeatsState.filter(selected => selected !== seat));
    } else {
      // Only add seat if limit is not reached
      if (selectedSeatsState.length < seatCount) {
        setSelectedSeatsState([...selectedSeatsState, seat]);
      }
    }
  };

  const handlePayment = async () => {
    navigate('payment')
  };

  // Function to handle the Make Payment click
  const handleMakePayment = () => {
    alert("Payment Successful")
  };

  return (
    <div>
      <Navbar user={user}></Navbar>
      <div className="seat-layout-container">
        <h4>Select Your Seats</h4>

        {/* Screen Indicator */}
        <div className="screen-indicator">
          <h6>All eyes this way please!</h6>
          <div className="screen-bar"></div>
        </div>

        <div className="seat-grid">
          {initialSeats.map((row, rowIndex) => (
            <div key={rowIndex} className="seat-row">
              {row.map((seat, seatIndex) => {
                // Determine if seat should be disabled
                const isSelected = selectedSeatsState.includes(seat);
                const isDisabled = selectedSeatsState.length >= seatCount && !isSelected;

                return (
                  <div
                    key={seatIndex}
                    className={`seat 
                      ${isSelected ? 'selected' : 'available'} 
                      ${isDisabled ? 'disabled' : ''}
                    `}
                    onClick={() => {
                      if (!isDisabled) handleSeatClick(seat);
                    }}
                  >
                    {seat}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Selected Seats Information */}
        <div className="selected-seats">
          <h4>Selected Seats:</h4>
          <p>{selectedSeatsState.length > 0 ? selectedSeatsState.join(', ') : 'None'}</p>
          <p>Maximum Seats Allowed: {seatCount}</p>
        </div>

        {/* Make Payment Button - Conditionally Render */}
        {selectedSeatsState.length === seatCount && (
          <button className="btn btn-primary make-payment-btn" onClick={handleMakePayment}>
            Make Payment
          </button>
        )}
      </div>

      {/* Payment Section */}
      {selectedSeatsState.length === seatCount && (
        <div className="payment-container card p-4 mt-4">
          <h3>Payment Summary</h3>
          <p><b>Movie:</b> {localStorage.getItem('movie')}</p>
          <p><b>Selected Seats:</b> {selectedSeatsState.join(', ')}</p>
          <p><b>Total Price:</b> ₹{seatCount * 150}</p>

          {/* Payment Method Selection */}
          <div className="payment-method-section mt-4">
            <h5>Select Payment Method</h5>
            <select
              className="form-select mt-2"
            >
              <option value="Credit Card">Credit Card</option>
              <option value="Debit Card">Debit Card</option>
              <option value="UPI">UPI</option>
              <option value="Net Banking">Net Banking</option>
              <option value="Wallet">Wallet</option>
            </select>
          </div>

          {/* Payment Button */}
          <button
            className="btn btn-success mt-4"
            onClick={handleMakePayment}
          >
            Make Payment
          </button>
        </div>
      )}
    </div>
  );
};

export default SeatLayout;