// pages/api/get-cash-balance.js
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    console.log("Received POST request to /api/post-ccsbtxn");
    const customerID = "cus_Poua0y0f9Xxlip"
    const transaction = await stripe.customers.createCashBalanceTransaction(customerID, {
      amount: 1000,
      currency: "usd",
      description:"invoice id ABCDEF125",
      metadata:{'maltID':'#ABCDEF125',
      'incomingTransferId':'ccsbtxn_1OzGu6GPyjqeiImvxuSzlLMH','incomingReference':'#1231'
      },
    });


    return NextResponse.json(transaction.id, { status: 200 });
  } catch (error) {
    console.error("Error fetching customer cash balance data:", error);
    return NextResponse.json({ error: "An error occurred while fetching the customer cash balance data." }, { status: 500 });
  }
}