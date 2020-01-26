const path = require('path');

const express = require('express');
const { body } = require('express-validator/check');

const adminController = require('../controllers/admin');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

// /admin/add-product => GET
router.get('/add-profile', isAuth, adminController.getAddProfile);

// /admin/products => GET
router.get('/ngos', adminController.getNgos);

// /admin/add-product => POST
router.post(
  '/add-profile',
  [
    body('name')
      .isString()
      .isLength({ min: 3 })
      .trim(),
    body('amount').isFloat(),
    body('number'),
    body('address'),    
    body('reason')
      .isLength({ min: 5, max: 400 })
      .trim()
  ],
  isAuth,
  adminController.postAddProfile
);

router.get('/edit-product/:productId', isAuth, adminController.getEditProduct);

router.post(
  '/edit-product',
  [
    body('title')
      .isString()
      .isLength({ min: 3 })
      .trim(),
    body('price').isFloat(),
    body('description')
      .isLength({ min: 5, max: 400 })
      .trim()
  ],
  isAuth,
  adminController.postEditProduct
);

router.delete('/product/:productId', isAuth, adminController.deleteProduct);

module.exports = router;
