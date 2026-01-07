export const requireAuth = async (req, res, next) => {
  try {
    // Get the user from Clerk
    const { userId } = req.auth();
    
    if (!userId) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    // Set userId for use in controllers
    req.userId = userId;
    
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(401).json({ error: 'Authentication failed' });
  }
};

export default requireAuth;