import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [turnedPages, setTurnedPages] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:5000/events');
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        const eventData = await response.json();
        setEvents(eventData);
        setTurnedPages(Array(eventData.length).fill(false)); // Initialize turnedPages array
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    fetchEvents();
  }, []);

  const handlePageClick = (pageIndex) => {
    const newTurnedPages = [...turnedPages]; // Create a copy of turnedPages array
    newTurnedPages[pageIndex] = !newTurnedPages[pageIndex]; // Toggle the value of the clicked page
    setTurnedPages(newTurnedPages); // Update the state with the modified array

    setCurrentPage(pageIndex); // Set current page to the clicked page
  };

  return (
    <div className="app">
      {events.map((event, i) => (
        <div
          key={i}
          className={`page page-${i} ${turnedPages[i] ? 'active' : ''}`}
          onClick={() => handlePageClick(i)}
        >
          <div className="content">
            {turnedPages[i] ? (
              <img
                src={event.lineup_image}
                alt="Event Image"
                style={{ width: '100%', height: '100%', objectFit: 'fit' }}
              />
            ) : (
              <>
                <h1>{event.name}</h1>
                <p>Date Start: {event.date_start}</p>
                <p>Date End: {event.date_end}</p>
                <p>Price: {event.price}</p>
                <p>Location: {event.location}</p>
                <p>Venue: {event.venue}</p>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
