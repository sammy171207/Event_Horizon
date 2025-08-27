import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { motion } from 'framer-motion'

const CreateEvent = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    venue: '',
    basePrice: '',
    dynamicPrice: false,
    totalSeats: '',
    availableSeats: '',
    image: ''
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const validateForm = () => {
    const newErrors = {}
    if (!formData.title) newErrors.title = 'Title is required'
    if (!formData.description) newErrors.description = 'Description is required'
    if (!formData.date) newErrors.date = 'Date is required'
    if (!formData.venue) newErrors.venue = 'Venue is required'
    if (!formData.basePrice || formData.basePrice < 0) newErrors.basePrice = 'Valid price is required'
    if (!formData.totalSeats || formData.totalSeats < 1) newErrors.totalSeats = 'Valid total seats is required'
    if (!formData.availableSeats || formData.availableSeats < 0) newErrors.availableSeats = 'Valid available seats is required'
    if (parseInt(formData.availableSeats) > parseInt(formData.totalSeats)) {
      newErrors.availableSeats = 'Available seats cannot exceed total seats'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (validateForm()) {
      setLoading(true)
      try {
        await axios.post('/api/organizer/events', formData)
        navigate('/organizer/events')
      } catch (error) {
        console.error('Error creating event:', error)
        if (error.response?.data?.message) {
          setErrors({ submit: error.response.data.message })
        }
      } finally {
        setLoading(false)
      }
    }
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-semibold mb-2">Create New Event</h1>
        <p className="text-gray-600 mb-6">Fill in the details to create your event</p>
      </motion.div>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        {errors.submit && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {errors.submit}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Event Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                errors.title ? 'border-red-300' : 'border-gray-300'
              }`}
            />
            {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
          </div>

          <div>
            <label htmlFor="venue" className="block text-sm font-medium text-gray-700">
              Venue *
            </label>
            <input
              type="text"
              id="venue"
              name="venue"
              value={formData.venue}
              onChange={handleChange}
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                errors.venue ? 'border-red-300' : 'border-gray-300'
              }`}
            />
            {errors.venue && <p className="mt-1 text-sm text-red-600">{errors.venue}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description *
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            value={formData.description}
            onChange={handleChange}
            className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
              errors.description ? 'border-red-300' : 'border-gray-300'
            }`}
          />
          {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">
              Event Date *
            </label>
            <input
              type="datetime-local"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                errors.date ? 'border-red-300' : 'border-gray-300'
              }`}
            />
            {errors.date && <p className="mt-1 text-sm text-red-600">{errors.date}</p>}
          </div>

          <div>
            <label htmlFor="basePrice" className="block text-sm font-medium text-gray-700">
              Base Price ($) *
            </label>
            <input
              type="number"
              id="basePrice"
              name="basePrice"
              min="0"
              step="0.01"
              value={formData.basePrice}
              onChange={handleChange}
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                errors.basePrice ? 'border-red-300' : 'border-gray-300'
              }`}
            />
            {errors.basePrice && <p className="mt-1 text-sm text-red-600">{errors.basePrice}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label htmlFor="totalSeats" className="block text-sm font-medium text-gray-700">
              Total Seats *
            </label>
            <input
              type="number"
              id="totalSeats"
              name="totalSeats"
              min="1"
              value={formData.totalSeats}
              onChange={handleChange}
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                errors.totalSeats ? 'border-red-300' : 'border-gray-300'
              }`}
            />
            {errors.totalSeats && <p className="mt-1 text-sm text-red-600">{errors.totalSeats}</p>}
          </div>

          <div>
            <label htmlFor="availableSeats" className="block text-sm font-medium text-gray-700">
              Available Seats *
            </label>
            <input
              type="number"
              id="availableSeats"
              name="availableSeats"
              min="0"
              value={formData.availableSeats}
              onChange={handleChange}
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                errors.availableSeats ? 'border-red-300' : 'border-gray-300'
              }`}
            />
            {errors.availableSeats && <p className="mt-1 text-sm text-red-600">{errors.availableSeats}</p>}
          </div>

          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">
              Image URL
            </label>
            <input
              type="url"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="dynamicPrice"
            name="dynamicPrice"
            checked={formData.dynamicPrice}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="dynamicPrice" className="ml-2 block text-sm text-gray-900">
            Enable dynamic pricing
          </label>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="btn flex-1"
          >
            {loading ? 'Creating...' : 'Create Event'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/organizer/events')}
            className="btn-outline flex-1"
          >
            Cancel
          </button>
        </div>
      </motion.form>
    </div>
  )
}

export default CreateEvent
