import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoute from './routes/authRoutes.js';
import userRoute from './routes/userRoutes.js';
import organizerRoute from './routes/organizerRoutes.js';
import eventRoute from './routes/eventRoutes.js';

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/organizer', organizerRoute);
app.use('/api/event', eventRoute);

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({
        message: 'Event Horizon API is running',
        timestamp: new Date().toISOString(),
        status: 'healthy'
    });
});

// Test endpoint
app.get('/test', (req, res) => {
    res.status(200).json({
        message: 'This is Test Route',
        success: true
    });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
        message: 'Route not found',
        success: false
    });
});

// Global error handler
app.use((error, req, res, next) => {
    console.error('Global error:', error);
    res.status(500).json({
        message: 'Internal server error',
        success: false
    });
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});