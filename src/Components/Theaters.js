import React, { useEffect, useState, useRef } from 'react';  // Import useRef
import './Theaters.css';
import axios from 'axios';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

const Theaters = (props) => {
  const [selectedLocation, setSelectedLocation] = useState('');
  const [theaterDetails, setTheaterDetails] = useState([]);
  const [dayDetails, setDayDetails] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const seatCountOptions = [1, 2, 3, 4, 5, 6, 7, 8, 10]; // Renamed for clarity
  const navigate = useNavigate();

  const modalRef = useRef(null);  // Create a ref for the modal

  useEffect(() => {
    axios.get("http://localhost:5000/theatersList")
      .then((result) => {
        setTheaterDetails(result.data);
      })
      .catch((error) => {
        console.error("Error fetching theaters:", error);
      });

    let info = [];
    for (let i = 0; i < 5; i++) {
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() + i);
      const date = currentDate.getDate();
      const day = currentDate.toLocaleDateString('en-US', { weekday: 'short' });
      const month = currentDate.toLocaleDateString('en-US', { month: 'short' });
      info.push({ "date": date, "day": day, "month": month });
    }
    setDayDetails(info);
  }, []);

  const handleLocationChange = (e) => {
    setSelectedLocation(e.target.value);
  };

  const handleDayClick = (index) => {
    setSelectedDay(index);
  };

  const handleSeatSelect = (seat) => {
    console.log(seat);
    
    props.setseatCount(seat); // This should update the selected seat count
  }

  const handleSeat = () => {
    // Hide the modal after seat selection
    const modalElement = modalRef.current;
    if (modalElement) {
      const modal = window.bootstrap.Modal.getInstance(modalElement);  // Get modal instance
      modal.hide();  // Hide the modal
    }
    navigate("/book");
  };

  const filteredTheaters = theaterDetails.find(theater => theater.location === selectedLocation);

  return (
    <div>
      <Navbar />
      <div className="theaters-container card">
        <div style={{ display: 'flex', justifyContent: "space-between" }}>
          <div className='day-wrapper'>
            {dayDetails.map((item, index) => (
              <div key={index} onClick={() => handleDayClick(index)}>
                <p className={`day ${selectedDay === index ? 'selected' : ''}`}>
                  {item.day}<br />
                  {item.month}<br />
                  {item.date}
                </p>
              </div>
            ))}
          </div>

          <div className="location-dropdown">
            <label htmlFor="location-select">Select Location:</label>
            <select id="location-select" value={selectedLocation} onChange={handleLocationChange}>
              <option value="">-- Choose a Location --</option>
              {theaterDetails.map((value, index) => (
                <option key={index} value={value.location}>
                  {value.location}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="theater-details">
          {selectedLocation && selectedDay !== null && filteredTheaters ? (
            <>
              <h6>Theaters in {filteredTheaters.location}:</h6>
              {filteredTheaters.theaters.map((theater, index) => (
                <div key={index} className="theater-item">
                  <h6>{theater.name}</h6>
                  <div className="show-timings-buttons">
                    {theater.timings.map((show, showIndex) => (
                      <button key={showIndex} className="btn btn-outline-danger btn-sm me-2" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        {show}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </>
          ) : (
            <p>Please select both a location and a date to see theater details.</p>
          )}
        </div>
      </div>

      {/* Modal for seat selection */}
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" ref={modalRef}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5 text-center" id="exampleModalLabel">How Many Seats?</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body" style={{ display: "flex", justifyContent: 'center' }}>
            {console.log(props.seatCount)      }
              {seatCountOptions.map((value, index) => (
               
                <div 
                key={index} 
                onClick={() => handleSeatSelect(value)} 
                className={`seat-button ${props.seatCount == value ? 'selected' : ''}`}> {/* Compare props.seatCount */}
                {value}
              </div>
              ))}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary btn-sm" onClick={handleSeat}>Select Seats</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Theaters;
