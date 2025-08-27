import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { motion } from 'framer-motion'

const OrganizerEvents = () => {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    try {
      const response = await axios.get('/api/organizer/events')
      setEvents(response.data.events || [])
    } catch (error) {
      console.error('Error fetching events:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteEvent = async (eventId) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await axios.delete(`/api/organizer/events/${eventId}`)
        fetchEvents() // Refresh the list
      } catch (error) {
        console.error('Error deleting event:', error)
      }
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-between items-center"
      >
        <div>
          <h1 className="text-2xl font-semibold">My Events</h1>
          <p className="text-gray-600">Manage your created events</p>
        </div>
        <Link
          to="/organizer/events/create"
          className="btn"
        >
          Create Event
        </Link>
      </motion.div>

      {events.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">No events found</p>
          <Link to="/organizer/events/create" className="btn">
            Create Your First Event
          </Link>
        </div>
      ) : (
        <div className="grid gap-6">
          {events.map((event, index) => (
            <motion.div
              key={event._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card p-6"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{event.title}</h3>
                  <p className="text-gray-600 mt-1">{event.description}</p>
                  <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Date</p>
                      <p className="font-medium">{new Date(event.date).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Venue</p>
                      <p className="font-medium">{event.venue}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Price</p>
                      <p className="font-medium">${event.basePrice}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Available Seats</p>
                      <p className="font-medium">{event.availableSeats}/{event.totalSeats}</p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <Link
                    to={`/organizer/events/${event._id}/edit`}
                    className="btn-outline text-sm"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDeleteEvent(event._id)}
                    className="px-3 py-2 text-sm text-red-600 border border-red-300 rounded-md hover:bg-red-50 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}

export default OrganizerEvents
