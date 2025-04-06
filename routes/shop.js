const express = require('express');
const shopController = require('../controllers/shop');
const isAuth = require('../middleware/is-auth'); // Import the auth middleware

const router = express.Router();

// GET / (Homepage - shows products)
router.get('/', shopController.getIndex);

// GET /products (Product list page)
router.get('/products', shopController.getProducts);

// GET /products/:productId (Product detail page)
router.get('/products/:productId', shopController.getProduct);

// GET /cart (View cart - requires authentication)
router.get('/cart', isAuth, shopController.getCart);

// POST /cart (Add item to cart - requires authentication)
router.post('/cart', isAuth, shopController.postCart);

// POST /cart-delete-item (Remove item from cart - requires authentication)
router.post('/cart-delete-item', isAuth, shopController.postCartDeleteProduct);

// Note: Routes for Orders would go here, protected by isAuth

module.exports = router;
