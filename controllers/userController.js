import { handleError } from '../utils/errorHandler.js';

const getProfile = async (req, res) => {
    try {
        return res.status(200).json({
            success: true,
            user: req.user
        });
    } catch (error) {
        return handleError(res, error, "Failed to fetch profile");
    }
};

export { getProfile };