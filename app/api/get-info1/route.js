import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    console.log("Received GET request to /api/get-info1");
    const customerCashBalanceTransactions = await stripe.customers.listCashBalanceTransactions(
      "cus_PvjHIMouxuMvhs",
      {
        expand: ["data.applied_to_payment.payment_intent"],
      }
    );

    // Get the last 5 transactions
    const lastFiveTransactions = customerCashBalanceTransactions.data.slice(-5);

    const expandedTransactions = lastFiveTransactions.map((transaction) => {
      if (transaction.applied_to_payment) {
        console.log("Transaction with Payment Intent:", transaction); // Log the entire transaction object
        return {
          id: transaction.id,
          amount: transaction.net_amount,
          paymentIntent: transaction.applied_to_payment.payment_intent,
        };
      }
      return {
        id: transaction.id,
        amount: transaction.net_amount,
        paymentIntent: null,
      };
    });

    console.log("Last 5 transactions:", expandedTransactions);

    return NextResponse.json({ transactions: expandedTransactions }, { status: 200 });
  } catch (error) {
    console.error("Error on getting transactions:", error);
    return NextResponse.json({ error: "Error on getting transactions" }, { status: 500 });
  }
}