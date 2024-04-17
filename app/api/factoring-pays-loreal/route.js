import { NextResponse } from "next/server";
import Stripe from "stripe";
const vars = require('../../vars');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);



export async function POST(request) {
  try {
    console.log("Received POST request to /api/factoring-pays-loreal");
                        
    const intent = await stripe.paymentIntents.create({
        amount: 500000,
        currency: "eur", 
        payment_method_types:['customer_balance'],
        customer: vars.customer_id_factoring,
        confirm:true,
        payment_method_data:{
          type: "customer_balance",
        },
        expand: ['latest_charge'],
        description:"Factoring Payment for project p" + vars.id_loreal,
        metadata:{
          'payment_type':'payment',
          'project_id': 'p' + vars.id_loreal,
          'invoice_id':'i' + vars.id_loreal,
          'funds_origin': 'factoring',
          'funds_destinationid': vars.funds_destinationid_loreal,
          'funds_destination': 'freelancer',
          'incoming_bashbalance_id': vars.incoming_bashbalance_id_loreal,
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
        amount: 500000,
        destination: vars.xavier_id_loreal, 
        source_transaction: Source,

        description:"Factoring Payment for project p" + vars.id_loreal,
        metadata:{
          'payment_type':'payment',
          'project_id': 'p' + vars.id_loreal,
          'invoice_id':'i' + vars.id_loreal,
          'funds_origin': 'factoring',
          'funds_destinationid': vars.xavier_id_loreal,
          'funds_destination': 'freelancer',
          'incoming_bashbalance_id': vars.incoming_bashbalance_id_loreal,
        },
    });
    return NextResponse.json({  Transfer: transfers.id }, { status: 200});
  } catch (error) {
    console.error('Error creating customer:', error);
    return NextResponse.json({ error: 'An error occurred while creating the customer.' },{ status: 500});
  }
}
