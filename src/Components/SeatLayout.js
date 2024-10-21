import React, { useState } from 'react';
import './SeatLayout.css';  // Ensure CSS is correctly imported
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';  // Import useNavigate for navigation
import axios from 'axios';  // To make API calls to your backend

const SeatLayout = (props) => {
  const { seatCount, user } = props; // Destructure props for clarity
  const navigate = useNavigate(); // Initialize navigate for future use

  // Create a 2D array representing the seat layout
  const initialSeats = [
    ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9', 'A10'],
    ['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B9', 'B10'],
    ['C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9', 'C10'],
  ];

  // State to track the selected seats
  const [selectedSeats, setSelectedSeats] = useState([]);

  // Function to handle seat selection
  const handleSeatClick = (seat) => {
    if (selectedSeats.includes(seat)) {
      // If seat is already selected, remove it from selectedSeats
      setSelectedSeats(selectedSeats.filter(selected => selected !== seat));
    } else {
      // Only add seat if limit is not reached
      if (selectedSeats.length < seatCount) {
        setSelectedSeats([...selectedSeats, seat]);
      }
    }
  };

  // Razorpay Payment Integration
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    const res = await loadRazorpayScript();

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    // Create an order on the server
    const result = await axios.post('https://ticket-booking-mern-backend.onrender.com/api/create-order', { amount: selectedSeats.length * 10000 }); // Amount in paise (₹100 per seat)

    if (!result) {
      alert("Server error. Unable to create an order.");
      return;
    }

    
    const { amount, id: order_id, currency } = result.data;

    const options = {
      key: "rzp_test_IHINdrDCdx5Dmf", // Replace with your Razorpay key_id
      amount: amount.toString(),
      currency: currency,
      name: "Ticket Booking App",
      description: "Seat Booking Transaction",
      order_id: order_id,
      handler: async (response) => {
        alert("Payment successful! Payment ID: " + response.razorpay_payment_id);
        navigate('/confirmation'); // Redirect to confirmation page after payment
      },
      prefill: {
        name: user.name,
        email: user.email,
      },
      theme: {
        color: "#F37254",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  // Function to handle the Make Payment click
  const handleMakePayment = () => {
    handlePayment();  // Trigger Razorpay payment flow
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
                const isSelected = selectedSeats.includes(seat);
                const isDisabled = selectedSeats.length >= seatCount && !isSelected;

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
          <p>{selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None'}</p>
          <p>Maximum Seats Allowed: {seatCount}</p>
        </div>

        {/* Make Payment Button - Conditionally Render */}
        {selectedSeats.length === seatCount && (
          <button className="btn btn-primary make-payment-btn" onClick={handleMakePayment}>
            Make Payment
          </button>
        )}
      </div>
    </div>
  );
};

export default SeatLayout;
