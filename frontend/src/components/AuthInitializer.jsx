import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadUser } from '../store/authSlice.js'

const AuthInitializer = ({ children }) => {
  const dispatch = useDispatch()
  const { token, isAuthenticated, user, loading } = useSelector((state) => state.auth)

  useEffect(() => {
    // If we have a token but no user data, load the user
    if (token && !user && !loading) {
      dispatch(loadUser())
    }
  }, [dispatch, token, user, loading])

  return children
}

export default AuthInitializer
