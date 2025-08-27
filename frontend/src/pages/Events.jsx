import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { gsap } from 'gsap'
import { motion } from 'framer-motion'

const Events = () => {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [bookingLoading, setBookingLoading] = useState(null)
  const cardsRef = useRef([])
  const { isAuthenticated, user } = useSelector((state) => state.auth)

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    try {
      const response = await axios.get('/api/event')
      setEvents(response.data.events || response.data || [])
    } catch (error) {
      console.error('Error fetching events:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleBookEvent = async (eventId) => {
    if (!isAuthenticated) {
      // Redirect to login
      window.location.href = '/login'
      return
    }

    setBookingLoading(eventId)
    try {
      await axios.post(`/api/user/book/${eventId}`)
      // Refresh events to update available seats
      fetchEvents()
      alert('Booking successful!')
    } catch (error) {
      console.error('Error booking event:', error)
      alert(error.response?.data?.message || 'Booking failed')
    } finally {
      setBookingLoading(null)
    }
  }

  useEffect(() => {
    if (cardsRef.current.length) {
      gsap.from(cardsRef.current, {
        opacity: 0,
        y: 16,
        duration: 0.4,
        stagger: 0.05,
        ease: 'power2.out'
      })
    }
  }, [events])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-semibold mb-2">All Events</h1>
        <p className="text-gray-600 mb-6">Discover and book amazing events</p>
      </motion.div>

      {events.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No events available</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, idx) => (
            <motion.div
              key={event._id || idx}
              ref={el => (cardsRef.current[idx] = el)}
              className="card p-6 hover:shadow-md transition-shadow"
              whileHover={{ y: -2 }}
            >
              {event.image && (
                <img 
                  src={event.image} 
                  alt={event.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              )}
              
              <h2 className="text-lg font-semibold mb-2">{event.title}</h2>
              <p className="text-sm text-gray-600 mb-3 line-clamp-3">{event.description}</p>
              
              <div className="space-y-2 text-sm text-gray-700 mb-4">
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {new Date(event.date).toLocaleDateString()}
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {event.venue}
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                  ${event.basePrice}
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  {event.availableSeats} seats available
                </div>
              </div>

              <div className="flex gap-2">
                <Link 
                  to={`/events/${event._id}`} 
                  className="btn-outline text-sm flex-1 text-center"
                >
                  View Details
                </Link>
                {event.availableSeats > 0 ? (
                  <button
                    onClick={() => handleBookEvent(event._id)}
                    disabled={bookingLoading === event._id}
                    className="btn text-sm flex-1"
                  >
                    {bookingLoading === event._id ? 'Booking...' : 'Book Now'}
                  </button>
                ) : (
                  <button
                    disabled
                    className="btn text-sm flex-1 opacity-50 cursor-not-allowed"
                  >
                    Sold Out
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Events
