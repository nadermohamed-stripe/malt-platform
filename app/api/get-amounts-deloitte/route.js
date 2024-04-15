import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function GET(request) {
  try {
    console.log("Received GET request to /api/get-amounts-deloitte");
    const customerID = "cus_PvjHIMouxuMvhs"; // Hardcode the customer ID

    const cashBalance = await stripe.customers.retrieveCashBalance(customerID);
    const amount = cashBalance.available.eur;

    return NextResponse.json({ amount }, { status: 200 });
  } catch (error) {
    console.error("Error fetching customer balance:", error);
    return NextResponse.json({ error: "An error occurred while fetching the customer balance." }, { status: 500 });
  }
}

