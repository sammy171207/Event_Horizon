import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './store/store.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import AuthInitializer from './components/AuthInitializer.jsx'
import Home from './pages/Home.jsx'
import Events from './pages/Events.jsx'
import EventDetail from './pages/EventDetail.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import MyBookings from './pages/MyBookings.jsx'
import Unauthorized from './pages/Unauthorized.jsx'
import OrganizerDashboard from './pages/organizer/OrganizerDashboard.jsx'
import OrganizerEvents from './pages/organizer/OrganizerEvents.jsx'
import CreateEvent from './pages/organizer/CreateEvent.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'events', element: <Events /> },
      { path: 'events/:id', element: <EventDetail /> },
      { path: 'login', element: <Login /> },
      { path: 'signup', element: <Signup /> },
      { path: 'unauthorized', element: <Unauthorized /> },
      { 
        path: 'my-bookings', 
        element: (
          <ProtectedRoute allowedRoles={['user']}>
            <MyBookings />
          </ProtectedRoute>
        ) 
      },
      { 
        path: 'organizer/dashboard', 
        element: (
          <ProtectedRoute allowedRoles={['organizer']}>
            <OrganizerDashboard />
          </ProtectedRoute>
        ) 
      },
      { 
        path: 'organizer/events', 
        element: (
          <ProtectedRoute allowedRoles={['organizer']}>
            <OrganizerEvents />
          </ProtectedRoute>
        ) 
      },
      { 
        path: 'organizer/events/create', 
        element: (
          <ProtectedRoute allowedRoles={['organizer']}>
            <CreateEvent />
          </ProtectedRoute>
        ) 
      },
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <AuthInitializer>
        <RouterProvider router={router} />
      </AuthInitializer>
    </Provider>
  </StrictMode>,
)
