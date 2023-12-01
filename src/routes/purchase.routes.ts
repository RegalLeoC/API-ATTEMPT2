import express from 'express';
import PurchasController from '../controllers/PurchaseController';

const router =  express.Router();

router.get('/purchases', PurchasController.getPurchases);

router.get('/purchase/:id', PurchasController.getPurchaseById)


router.post('/purchase', PurchasController.createPurchase)

// GET user by ID
// router.get('/purchase/:id', PurchaseController);

// POST create user
// router.post('/purchase', PurchaseController.createPurchase);



export default router