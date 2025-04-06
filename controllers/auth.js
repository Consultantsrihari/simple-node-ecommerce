const bcrypt = require('bcryptjs');
const User = require('../models/user');

exports.getLogin = (req, res, next) => {
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    errorMessage: null // Or pass flash messages if using connect-flash
  });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        // User not found
        return res.status(422).render('auth/login', {
          path: '/login',
          pageTitle: 'Login',
          errorMessage: 'Invalid email or password.'
        });
      }
      bcrypt
        .compare(password, user.password)
        .then(doMatch => {
          if (doMatch) {
            // Passwords match - Login successful
            req.session.isLoggedIn = true;
            req.session.user = user; // Store user data in session
            // Best practice: save session before redirecting
            return req.session.save(err => {
              if (err) {
                console.log(err);
              }
              res.redirect('/');
            });
          }
          // Passwords don't match
          res.status(422).render('auth/login', {
            path: '/login',
            pageTitle: 'Login',
            errorMessage: 'Invalid email or password.'
          });
        })
        .catch(err => {
          console.log(err);
          res.redirect('/login'); // Redirect on bcrypt error
        });
    })
    .catch(err => {
        console.error("Login Error:", err);
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    });
};

exports.getSignup = (req, res, next) => {
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Signup',
    errorMessage: null
  });
};

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  // Basic validation
  if (password !== confirmPassword) {
     return res.status(422).render('auth/signup', {
        path: '/signup',
        pageTitle: 'Signup',
        errorMessage: 'Passwords do not match!'
      });
  }

  User.findOne({ email: email })
    .then(userDoc => {
      if (userDoc) {
        // User already exists
        return res.status(422).render('auth/signup', {
            path: '/signup',
            pageTitle: 'Signup',
            errorMessage: 'E-Mail address already exists.'
        });
      }
      // Hash password before saving
      return bcrypt
        .hash(password, 12) // 12 is a good salt rounds value
        .then(hashedPassword => {
          const user = new User({
            email: email,
            password: hashedPassword,
            cart: { items: [] } // Initialize cart
          });
          return user.save();
        })
        .then(result => {
          // Signup successful, maybe log them in directly or redirect to login
          res.redirect('/auth/login');
        });
    })
    .catch(err => {
        console.error("Signup Error:", err);
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    if (err) {
      console.log(err);
    }
    res.redirect('/');
  });
};
