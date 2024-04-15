import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


export async function POST(req) {
    try {
        console.log("Received POST request to /api/create-checkout-session");
        const session = await stripe.checkout.sessions.create({
            line_items: [
              {
                // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                price: 'price_1P5sKZJoM91GmNSBpikZFsVt',
                quantity: 1,
              },
            ],
            mode: 'payment',
            success_url: "http://localhost:3000/project-smb1",
            cancel_url: "http://localhost:3000/project-smb",
          });
        return Response.json({
            url: session.url,
        });
      } catch (error) {
        console.error('An error occurred when calling the Stripe API to create a checkout session: ', error);
        return Response.json({ error: error.message }, { status: 500 });
      }
}