# Event Horizon - Event Booking API

A robust Node.js/Express.js backend API for event booking and management with Redis caching, PDF ticket generation, and email notifications.

## 🚀 Features

- **User Authentication & Authorization**
  - JWT-based authentication
  - Role-based access control (User, Organizer, Admin)
  - Secure password hashing with bcrypt

- **Event Management**
  - Create, read, update events
  - Dynamic pricing support
  - Seat management and availability tracking
  - Image upload support

- **Booking System**
  - Real-time seat booking
  - Booking status tracking (pending, confirmed, cancelled)
  - Automatic seat restoration on cancellation

- **Advanced Features**
  - Redis caching for improved performance
  - PDF ticket generation
  - Email notifications with ticket attachments
  - Comprehensive error handling

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Cache**: Redis with ioredis
- **Authentication**: JWT (jsonwebtoken)
- **Email**: Nodemailer
- **PDF Generation**: PDFKit
- **Password Hashing**: bcrypt

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB
- Redis
- SMTP email service (Gmail, SendGrid, etc.)

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd event_horizon
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp env.example .env
   ```
   
   Update the `.env` file with your configuration:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGO_URI=mongodb://localhost:27017/event_horizon
   JWT_SECRET=your_jwt_secret_key_here
   REDIS_HOST=localhost
   REDIS_PORT=6379
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your_email@gmail.com
   SMTP_PASS=your_app_password
   ```

4. **Start the server**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

## 📚 API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/signin` - User login

### Events (Public)
- `GET /api/event` - Get all events
- `GET /api/event/:id` - Get event by ID

### User Routes (Protected)
- `GET /api/user/profile` - Get user profile
- `POST /api/user/book-event/:id` - Book an event
- `GET /api/user/bookingofUser` - Get user bookings
- `PUT /api/user/booking/cancel/:id` - Cancel booking

### Organizer Routes (Protected)
- `POST /api/organizer/create-event` - Create new event
- `GET /api/organizer` - Get organizer's events
- `GET /api/organizer/bookings` - Get event bookings

## 🔧 Configuration

### Redis Configuration
The application uses Redis for caching frequently accessed data:
- Event listings (30 minutes cache)
- Individual events (30 minutes cache)
- User bookings (15 minutes cache)

### Email Configuration
Configure your SMTP settings in the `.env` file for ticket delivery:
- Gmail: Use App Password for 2FA accounts
- SendGrid: Use API key
- Other SMTP providers: Configure host, port, and credentials

## 📁 Project Structure

```
event_horizon/
├── config/
│   ├── db.js          # MongoDB connection
│   └── redis.js       # Redis configuration
├── controllers/
│   ├── authController.js
│   ├── bookController.js
│   ├── eventController.js
│   └── userController.js
├── middlewares/
│   └── authMiddleware.js
├── models/
│   ├── Booking.js
│   ├── Event.js
│   ├── Payment.js
│   └── User.js
├── routes/
│   ├── authRoutes.js
│   ├── eventRoutes.js
│   ├── organizerRoutes.js
│   └── userRoutes.js
├── utils/
│   ├── cache.js
│   ├── createTicketPdf.js
│   └── errorHandler.js
├── tickets/           # Generated PDF tickets
├── server.js
└── package.json
```

## 🔒 Security Features

- JWT token authentication
- Role-based access control
- Password hashing with bcrypt
- Input validation and sanitization
- Rate limiting (recommended to add)
- CORS configuration

## 🚀 Performance Optimizations

- Redis caching for database queries
- Efficient database indexing
- Optimized API responses
- Connection pooling

## 📝 Error Handling

The application includes comprehensive error handling:
- Centralized error handling utility
- Validation error handling
- Not found error handling
- Unauthorized error handling
- Development vs production error responses

## 🧪 Testing

```bash
# Run tests (when implemented)
npm test

# Health check
curl http://localhost:5000/health
```

## 📄 License

This project is licensed under the ISC License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📞 Support

For support and questions, please open an issue in the repository.
