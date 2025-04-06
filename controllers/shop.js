const Product = require('../models/product');
// No need to import User here unless performing actions not on req.user

exports.getIndex = (req, res, next) => {
  Product.find() // Fetches all products
    .then(products => {
      res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/'
        // isAuthenticated: req.session.isLoggedIn // Passed via middleware now
      });
    })
    .catch(err => {
        console.error("getIndex Error:", err);
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    });
};

exports.getProducts = (req, res, next) => {
  Product.find()
    .then(products => {
      res.render('shop/products', { // Render products view specifically
        prods: products,
        pageTitle: 'All Products',
        path: '/products'
      });
    })
    .catch(err => {
        console.error("getProducts Error:", err);
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then(product => {
      if (!product) {
        return res.redirect('/'); // Or render a 'not found' page
      }
      res.render('shop/product-detail', {
        product: product,
        pageTitle: product.title,
        path: '/products' // Active path for navigation highlight
      });
    })
    .catch(err => {
        console.error("getProduct Error:", err);
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    });
};


exports.getCart = (req, res, next) => {
  if (!req.user) {
      return res.redirect('/auth/login');
  }
  req.user
    .populate('cart.items.productId') // Fetch product details for cart items
    // .execPopulate() // No longer needed in Mongoose 6+
    .then(user => {
      const products = user.cart.items;
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: products
      });
    })
    .catch(err => {
        console.error("getCart Error:", err);
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    });
};


exports.postCart = (req, res, next) => {
  if (!req.user) {
      return res.status(401).redirect('/auth/login'); // Unauthorized
  }
  const prodId = req.body.productId;
  Product.findById(prodId)
    .then(product => {
      if (!product) {
          // Handle product not found gracefully
          return res.redirect('/');
      }
      return req.user.addToCart(product);
    })
    .then(result => {
      // console.log('Added to cart:', result);
      res.redirect('/cart');
    })
    .catch(err => {
        console.error("postCart Error:", err);
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    });
};

exports.postCartDeleteProduct = (req, res, next) => {
    if (!req.user) {
        return res.status(401).redirect('/auth/login'); // Unauthorized
    }
    const prodId = req.body.productId;
    req.user
      .removeFromCart(prodId)
      .then(result => {
        res.redirect('/cart');
      })
      .catch(err => {
        console.error("postCartDeleteProduct Error:", err);
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    });
};

// Basic error controller functions (can be moved to controllers/error.js)
exports.get404 = (req, res, next) => {
  res.status(404).render('404', {
      pageTitle: 'Page Not Found',
      path: '/404',
      isAuthenticated: req.session ? req.session.isLoggedIn : false // Ensure isAuthenticated is available
    });
};

exports.get500 = (req, res, next) => {
    res.status(500).render('500', {
      pageTitle: 'Error!',
      path: '/500',
      isAuthenticated: req.session ? req.session.isLoggedIn : false // Ensure isAuthenticated is available
    });
  };
