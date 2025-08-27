import { useSelector, useDispatch } from 'react-redux'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { logout } from '../store/authSlice.js'
import { motion } from 'framer-motion'

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  return (
    <motion.header 
      className="border-b bg-white shadow-sm"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container-page py-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-semibold text-blue-600">
          EventHorizon
        </Link>
        
        <nav className="flex items-center gap-6">
          {/* Public Navigation */}
          <NavLink 
            to="/" 
            end 
            className={({isActive}) => 
              `text-sm font-medium transition-colors ${isActive ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'}`
            }
          >
            Home
          </NavLink>
          <NavLink 
            to="/events" 
            className={({isActive}) => 
              `text-sm font-medium transition-colors ${isActive ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'}`
            }
          >
            Events
          </NavLink>

          {/* Authenticated Navigation */}
          {isAuthenticated ? (
            <>
              {user?.role === 'organizer' && (
                <NavLink 
                  to="/organizer/dashboard" 
                  className={({isActive}) => 
                    `text-sm font-medium transition-colors ${isActive ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'}`
                  }
                >
                  Dashboard
                </NavLink>
              )}
              
              {user?.role === 'user' && (
                <NavLink 
                  to="/my-bookings" 
                  className={({isActive}) => 
                    `text-sm font-medium transition-colors ${isActive ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'}`
                  }
                >
                  My Bookings
                </NavLink>
              )}

              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600">
                  Welcome, {user?.name}
                </span>
                <button 
                  onClick={handleLogout}
                  className="btn-outline text-sm"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/login" className="btn-outline text-sm">
                Login
              </Link>
              <Link to="/signup" className="btn text-sm">
                Sign Up
              </Link>
            </div>
          )}
        </nav>
      </div>
    </motion.header>
  )
}

export default Navbar
