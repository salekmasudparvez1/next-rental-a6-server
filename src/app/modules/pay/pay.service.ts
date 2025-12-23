import { Request } from "express"
import Stripe from "stripe";
import config from "../../config";
import AppError from "../../errors/AppError";
import { StatusCodes } from "http-status-codes";


const getStripe = () => {
  let stripeInstance: Stripe | null = null;
  if (!stripeInstance) {
    if (!config.STRIPE_SECRET_KEY) {
      throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR, 'Stripe secret key is not configured');
    }
    stripeInstance = new Stripe(config.STRIPE_SECRET_KEY as string);
  }
  return stripeInstance;
};

const createPaymentIntentFunc = async (req :Request)=>{
   const stripe = getStripe();
   const session = await stripe.paymentIntents.create({
    amount: 5000,
    currency: 'usd',
    payment_method_types: ['card'],
  });

  return {  clientSecret: session.client_secret };
}


const handleWebhookFunc = async (rawBody: Buffer | string, sigHeader?: string) => {
  const endpointSecret = config.STRIPE_WEBHOOK_SECRET as string;
  if (!endpointSecret) {
    throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR, 'Stripe webhook secret is not configured');
  }

  let event: Stripe.Event;
  try {
    const stripe = getStripe();
    const payload = rawBody instanceof Buffer ? rawBody : Buffer.from(rawBody);
    event = stripe.webhooks.constructEvent(payload, sigHeader || '', endpointSecret);
  } catch (err) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Stripe webhook signature verification failed');
  }

  // Handle common events
  switch (event.type) {
    case 'payment_intent.succeeded': {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.log('PaymentIntent succeeded:', paymentIntent.id);
      // TODO: update DB / mark payment as completed
      break;
    }
    case 'payment_intent.payment_failed': {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.log('PaymentIntent failed:', paymentIntent.id);
      break;
    }
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      console.log('Checkout session completed:', session.id);
      // TODO: fulfill the purchase, etc.
      break;
    }
    default:
      console.log(`Unhandled Stripe event type: ${event.type}`);
  }

  return { received: true };
}

export const payService ={
    createPaymentIntentFunc,
    handleWebhookFunc
}