import { Router } from "express";
import { paymentControler } from "./pay.controller";
import express from 'express';


const payRouter = Router()

payRouter.post("/create-checkout-session", paymentControler.createPaymentIntent)

// Stripe webhook (must receive raw body for signature verification)
payRouter.post('/webhook', express.raw({ type: 'application/json' }), paymentControler.handleWebhook);

export default payRouter