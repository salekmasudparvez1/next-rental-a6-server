import { Request, Response } from "express"
import catchAsync from "../../utils/catchAsync"
import { payService } from "./pay.service";
import sendResponse from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";


const createPaymentIntent = catchAsync(async(req: Request, res: Response) => {

    const result = await payService.createPaymentIntentFunc(req as Request);

    sendResponse(res, {
      success: true,
      message: 'Your paymentintent has been success',
      data: result,
      statusCode: StatusCodes.OK,
    });
 
})

// Stripe webhook handler
const handleWebhook = catchAsync(async (req: Request, res: Response) => {
  // raw body should be available either via express.raw middleware or via req.rawBody set in app.json verify
  const rawBody = (req as any).rawBody as Buffer ?? req.body;
  const sig = req.headers['stripe-signature'] as string | undefined;

  const result = await payService.handleWebhookFunc(rawBody, sig);

   sendResponse(res, {
      success: true,
      message: 'Your payment has been success',
      data: result,
      statusCode: StatusCodes.OK,
    });
});


export const paymentControler = {
    createPaymentIntent,
    handleWebhook
}