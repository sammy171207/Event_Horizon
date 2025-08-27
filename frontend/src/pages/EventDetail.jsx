import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

export default function EventDetail() {
  const { id } = useParams()
  const [event, setEvent] = useState(null)

  useEffect(() => {
    axios.get(`/api/event/${id}`)
      .then(res => setEvent(res.data.event || res.data))
      .catch(() => setEvent(null))
  }, [id])

  if (!event) return <div>Loading...</div>

  return (
    <div className="card p-6">
      <h1 className="text-2xl font-bold mb-2">{event.title}</h1>
      <div className="text-gray-700 mb-4">{event.description}</div>
      {event.date && (
        <div className="text-sm text-gray-600">Date: {new Date(event.date).toLocaleString()}</div>
      )}
      <div className="text-sm text-gray-600">Venue: {event.venue}</div>
      {event.basePrice != null && (
        <div className="text-sm text-gray-600">Price: ${event.basePrice}</div>
      )}
    </div>
  )
}


