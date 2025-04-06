require('dotenv').config(); // Load environment variables first
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');

const errorController = require('./controllers/error'); // Assume you create this controller
const User = require('./models/user');

const MONGODB_URI = process.env.MONGODB_URI;
const SESSION_SECRET = process.env.SESSION_SECRET;
const PORT = process.env.PORT || 3000;

const app = express();
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions'
});
const csrfProtection = csrf();

// Setup view engine
app.set('view engine', 'ejs');
app.set('views', 'views');

// Import routes
const authRoutes = require('./routes/auth');
const shopRoutes = require('./routes/shop');

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Session middleware
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: store
  })
);

// CSRF protection middleware
app.use(csrfProtection);

// Middleware to make session and csrf token available in all views
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});

// Middleware to load the logged-in user object onto the request
app.use((req, res, next) => {
  // If there's no session or no user in session, continue without user object
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then(user => {
      // Handle case where user might have been deleted but session still exists
      if (!user) {
        return next();
      }
      req.user = user; // Attach mongoose user model instance
      next();
    })
    .catch(err => {
        // Don't throw an error here, just log it or handle appropriately
        // Throwing might break the app for non-critical user loading issues
        console.error("Error fetching user for session:", err);
        next(new Error(err)); // Or just next() if you don't want to block requests
    });
});


// Use routes
app.use('/auth', authRoutes);
app.use(shopRoutes);

// Error Handling Middleware for 500 errors
app.use('/500', errorController.get500); // Specific route for 500 page
app.use(errorController.get404); // 404 middleware (catch all)

// More specific error handler (catches errors passed via next(err))
app.use((error, req, res, next) => {
  console.error("Unhandled Error:", error);
  // Render the 500 page
  res.status(500).render('500', {
    pageTitle: 'Error!',
    path: '/500',
    isAuthenticated: req.session ? req.session.isLoggedIn : false // Ensure isAuthenticated is available
  });
});


// Database connection and server start
mongoose
  .connect(MONGODB_URI)
  .then(result => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Database Connection Error:', err);
  });
