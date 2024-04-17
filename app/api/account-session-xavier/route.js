import { NextResponse } from "next/server";
import Stripe from "stripe";
const vars = require('../../vars');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


  export async function POST(req) {
    try {
      console.log("Received POST request to /api/account-session-xavier");
        const accountSession = await stripe.accountSessions.create({
          account: vars.clean_onboarding_individual_xavier,
          components: {

            account_onboarding: {
              enabled: true,
              // features: {
              //   external_account_collection: false,
              // }
              
            },
            
          },
        });
        return Response.json({
          client_secret: accountSession.client_secret,
        });
      } catch (error) {
        console.error('An error occurred when calling the Stripe API to create an account session: ', error);
        return Response.json({ error: error.message }, { status: 500 });
      }
}