import { Router } from "express";
import { paymentControler } from "./pay.controller";
import express from 'express';
import verifyUser from "../../middlewares/verifyUser";
import verifyTenant from "../../middlewares/verifyTenant copy";


const payRouter = Router()

payRouter.post("/create-checkout-session", paymentControler.createPaymentIntent)

// Stripe webhook (must receive raw body for signature verification)
payRouter.post('/webhook', express.raw({ type: 'application/json' }), paymentControler.Webhook);

// Get all transactions
payRouter.get('/transactions',verifyUser, paymentControler.getAllTransactions);
// Get single tenant transactions by id
payRouter.get('/transactions/:id',verifyUser, paymentControler.getSingleTenantTransactions);
//get single tenant transactions without id by paid status
payRouter.get('/transactions/status',verifyTenant, paymentControler.getSingleTransactionsByStatus);
//get transaction by payment intent id
payRouter.get('/transaction/paymentIntentId/:paymentIntentId',verifyUser, paymentControler.getTransactionByPaymentIntentId);

export default payRouter