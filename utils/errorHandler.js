// Centralized error handling utility
export const handleError = (res, error, message = "Something went wrong", statusCode = 500) => {
    const errorResponse = {
        message,
        success: false
    };

    // Include error details in development mode
    if (process.env.NODE_ENV === 'development') {
        errorResponse.error = error.message;
        errorResponse.stack = error.stack;
    }

    console.error(`[${new Date().toISOString()}] Error:`, {
        message: error.message,
        stack: error.stack,
        statusCode
    });

    return res.status(statusCode).json(errorResponse);
};

// Validation error handler
export const handleValidationError = (res, error) => {
    const errors = Object.values(error.errors).map(err => err.message);
    return res.status(400).json({
        message: "Validation failed",
        errors,
        success: false
    });
};

// Not found error handler
export const handleNotFoundError = (res, resource = "Resource") => {
    return res.status(404).json({
        message: `${resource} not found`,
        success: false
    });
};

// Unauthorized error handler
export const handleUnauthorizedError = (res, message = "Unauthorized access") => {
    return res.status(401).json({
        message,
        success: false
    });
};
