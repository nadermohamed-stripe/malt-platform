import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);



export async function POST(request) {
  try {
    console.log("Received POST request to /api/send-transfer");
    const hardcoded = { InvoiceID: "XXXXX",
                        CustomerID: "cus_Poua0y0f9Xxlip",
                        Amount: 1000, 
                        Destination: "acct_1OUwUTGbDdjHL2Vv" };
    const intent = await stripe.paymentIntents.create({
        amount: hardcoded.Amount,
        currency: "eur", 
        payment_method_types:['customer_balance'],
        customer: hardcoded.CustomerID,
        confirm:true,
        payment_method_data:{
          type: "customer_balance",
        },
        expand: ['latest_charge'],
        description:"invoice id  XXXXX",
        metadata:{'maltInvoiceId':'XXXXX',
        'incomingTransferId':'ccsbtxn_1OzGu6GPyjqeiImvxuSzlLMH',
        'incomingReference':'#1231'
        },
        payment_method_options:{
          customer_balance: {
            funding_type: "bank_transfer",
            bank_transfer: {
              type: "eu_bank_transfer",
              eu_bank_transfer: {country:'FR'}
            },
          },
        },
    });
    const Source = intent.latest_charge.id
    const transfers = await stripe.transfers.create({
        currency: "eur", 
        amount: hardcoded.Amount,
        destination: hardcoded.Destination, 
        source_transaction: Source,
        description:"invoice id  XXXXX",
        metadata:{
        'maltInvoiceId':'XXXXX',
        'incomingTransferId':'ccsbtxn_1OzGu6GPyjqeiImvxuSzlLMH',
        'incomingReference':'#1231'
        },
    });
    return NextResponse.json({  Transfer: transfers.id }, { status: 200});
  } catch (error) {
    console.error('Error creating customer:', error);
    return NextResponse.json({ error: 'An error occurred while creating the customer.' },{ status: 500});
  }
}
