import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { motion } from 'framer-motion'

const MyBookings = () => {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    fetchBookings()
  }, [])

  const fetchBookings = async () => {
    try {
      const response = await axios.get('/api/user/my-bookings')
      setBookings(response.data.bookings || [])
    } catch (error) {
      console.error('Error fetching bookings:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCancelBooking = async (bookingId) => {
    try {
      await axios.patch(`/api/user/cancel/${bookingId}`)
      fetchBookings() // Refresh the list
    } catch (error) {
      console.error('Error cancelling booking:', error)
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
      >
        <h1 className="text-2xl font-semibold">My Bookings</h1>
        <p className="text-gray-600">Manage your event bookings</p>
      </motion.div>

      {bookings.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No bookings found</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {bookings.map((booking, index) => (
            <motion.div
              key={booking._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card p-6"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{booking.event?.title}</h3>
                  <p className="text-gray-600 mt-1">{booking.event?.description}</p>
                  <div className="mt-2 space-y-1 text-sm text-gray-600">
                    <p>Date: {new Date(booking.event?.date).toLocaleDateString()}</p>
                    <p>Venue: {booking.event?.venue}</p>
                    <p>Seat: {booking.seatNumber}</p>
                    <p>Amount: ${booking.totalamount}</p>
                    <p>Status: 
                      <span className={`ml-1 px-2 py-1 rounded-full text-xs ${
                        booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                        booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {booking.status}
                      </span>
                    </p>
                  </div>
                </div>
                {booking.status === 'confirmed' && (
                  <button
                    onClick={() => handleCancelBooking(booking._id)}
                    className="btn-outline text-sm"
                  >
                    Cancel
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

export default MyBookings
