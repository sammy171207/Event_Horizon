# EventHorizon - Complete Setup Guide

## 🚀 Quick Start

### 1. Backend Setup

1. **Create `.env` file** in the root directory:
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGO_URI=mongodb://localhost:27017/event_horizon

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here_change_this_in_production

# Redis Configuration
REDIS_HOST=127.0.0.1
REDIS_PORT=6379

# Email Configuration (SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=sameerrandive97@gmail.com
SMTP_PASS=wkpk bdza lxkb igjp
```

2. **Install MongoDB** (if not already installed):
   - Download from: https://www.mongodb.com/try/download/community
   - Start MongoDB service

3. **Start Backend Server**:
```bash
# Option 1: Using the batch file (Windows)
start-backend.bat

# Option 2: Manual start
npm run dev
```

### 2. Frontend Setup

1. **Navigate to frontend directory**:
```bash
cd frontend
```

2. **Start Frontend Development Server**:
```bash
npm run dev
```

3. **Access the application**:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## 🔐 Authentication Features

### ✅ Fixed Issues:
- **Persistent Login**: Authentication now persists across page refreshes
- **Token Management**: Automatic token handling with localStorage
- **Role-based Access**: Proper user/organizer role management
- **Auto-logout**: Automatic logout on token expiration
- **Protected Routes**: Secure route protection with loading states

### 🎯 User Roles:
- **User**: Can book events, view bookings, cancel bookings
- **Organizer**: Can create events, manage events, view dashboard stats

## 🛠️ Industry-Level Features

### Frontend:
- ✅ React 18 with Vite
- ✅ Redux Toolkit for state management
- ✅ React Router with protected routes
- ✅ Tailwind CSS with custom utilities
- ✅ Framer Motion animations
- ✅ GSAP animations
- ✅ Axios with interceptors
- ✅ Loading states and error handling
- ✅ Responsive design
- ✅ Toast notifications
- ✅ Form validation

### Backend:
- ✅ Express.js with middleware
- ✅ MongoDB with Mongoose
- ✅ JWT authentication
- ✅ Role-based authorization
- ✅ Redis caching
- ✅ Email notifications
- ✅ PDF ticket generation
- ✅ Error handling
- ✅ Input validation

## 📱 Application Flow

### Public Pages:
1. **Home** - Welcome page with animations
2. **Events** - Browse all events (public)
3. **Event Details** - View specific event details
4. **Login/Signup** - Authentication pages

### User Pages (Protected):
1. **My Bookings** - View and manage bookings
2. **Book Event** - Book tickets for events

### Organizer Pages (Protected):
1. **Dashboard** - Statistics and quick actions
2. **Create Event** - Form to create new events
3. **Manage Events** - List, edit, delete events
4. **View Bookings** - Manage event bookings

## 🔧 Troubleshooting

### Common Issues:

1. **Backend Connection Error**:
   - Ensure MongoDB is running
   - Check if port 5000 is available
   - Verify .env file exists

2. **Authentication Not Persisting**:
   - Clear browser localStorage
   - Check browser console for errors
   - Verify JWT_SECRET in .env

3. **CORS Issues**:
   - Backend has CORS configured
   - Frontend proxy is set to port 5000

### Development Commands:

```bash
# Backend
npm run dev          # Start development server
npm start           # Start production server

# Frontend
npm run dev         # Start development server
npm run build       # Build for production
npm run preview     # Preview production build
```

## 🎨 Customization

### Styling:
- Edit `frontend/src/index.css` for global styles
- Modify Tailwind classes in components
- Update color scheme in CSS variables

### Features:
- Add new routes in `frontend/src/main.jsx`
- Create new components in `frontend/src/components/`
- Add new pages in `frontend/src/pages/`

## 🚀 Production Deployment

### Backend:
1. Set `NODE_ENV=production`
2. Use environment variables for secrets
3. Set up MongoDB Atlas or production database
4. Configure Redis for production

### Frontend:
1. Run `npm run build`
2. Deploy `dist` folder to hosting service
3. Update API base URL for production

## 📞 Support

For issues or questions:
1. Check the console for error messages
2. Verify all dependencies are installed
3. Ensure MongoDB and Redis are running
4. Check network connectivity

---

**EventHorizon** - Your complete event management solution! 🎉
