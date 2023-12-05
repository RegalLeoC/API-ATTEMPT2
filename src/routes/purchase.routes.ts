import express from 'express';
import PurchaseController from '../controllers/PurchaseController';

const router =  express.Router();

router.get('/purchases', PurchaseController.getPurchases);

router.get('/purchase/:id', PurchaseController.getPurchaseById)


router.post('/purchase', PurchaseController.createPurchase)


export default router