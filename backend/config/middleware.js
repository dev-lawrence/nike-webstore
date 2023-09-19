const authMiddleware = (req, res, next) => {
  // Check if the user is authenticated, e.g., based on your authentication logic
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // If the user is authenticated, you can proceed to the next middleware or route handler
  next();
};

export default authMiddleware;
