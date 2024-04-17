import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);



export async function POST(request) {
  try {
    console.log("Received POST request to /api/deloitte-pays-factoring");
    const hardcoded = { InvoiceID: "XXXXX",
                        CustomerID: "cus_PvjHIMouxuMvhs",
                        Amount: 400000, 
                        Destination: "acct_1P5pG7R7oRvG1u9R" };
                        
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
        description:"Factoring Payment for project #p97 ",
        metadata:{
          'payment_type':'payment',
          'project_id':'#p97',
          'invoice_id':'#i97',
          'funds_origin':'factoring',
          'funds_destinationid':'acct_1P5pG7R7oRvG1u9R',
          'funds_destination': 'freelancer',
          'incoming_bashbalance_id':'ccsbtxn_1P1mDvGPyjqeiImv3HwzrhBX',
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
        description:"Factoring Payment for project #p117 ",
        metadata:{
          'payment_type':'payment',
          'project_id':'#p117',
          'invoice_id':'#i117',
          'funds_origin':'factoring',
          'funds_destinationid':'acct_1P5pG7R7oRvG1u9R',
          'funds_destination': 'freelancer',
          'incoming_bashbalance_id':'ccsbtxn_1P1mDvGPyjqeiImv3HwzrhBX',
        },
    });
    return NextResponse.json({  Transfer: transfers.id }, { status: 200});
  } catch (error) {
    console.error('Error creating customer:', error);
    return NextResponse.json({ error: 'An error occurred while creating the customer.' },{ status: 500});
  }
}
