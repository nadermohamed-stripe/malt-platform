import { NextResponse } from "next/server";
import Stripe from "stripe";
const vars = require('../../vars');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


export async function POST(req) {
    try {
        console.log("Received POST request to /api/create-checkout-session");
        const session = await stripe.checkout.sessions.create({
          customer: vars.customer_id_smb,
          expand: ['payment_intent'],
            line_items: [
              {
                // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                price: 'price_1P6BTGJoM91GmNSBtbCduCQB',
                quantity: 1,
              },
            ],
            mode: 'payment',
            success_url: "http://localhost:3000/project-smb1",
            cancel_url: "http://localhost:3000/project-smb",
          });
        return Response.json({
            url: session.url,
            chargeId: session.payment_intent,
        });
      } catch (error) {
        console.error('An error occurred when calling the Stripe API to create a checkout session: ', error);
        return Response.json({ error: error.message }, { status: 500 });
      }
}


        // const transfer = await stripe.transfers.create({
        //     amount: 350000,
        //     currency: "eur", 
        //     destination: "acct_1P5rZ8R6J2IlYa6u",
        //     source_transaction: intent.latest_charge.id,
        //     description:"Factoring Payment for project #p117 ",
        //     metadata:{
        //       'payment_type':'payment',
        //       'project_id':'#p117',
        //       'invoice_id':'#i117',
        //       'funds_origin':'factoring',
        //       'funds_destinationid':'acct_1P5pG7R7oRvG1u9R',
        //       'funds_destination': 'freelancer',
        //       'incoming_bashbalance_id':'ccsbtxn_1P1mDvGPyjqeiImv3HwzrhBX',
        //     },
        //   });
