import { NextResponse } from "next/server";
import Stripe from "stripe";
const vars = require('../../vars');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);



export async function POST(request) {
  try {
    console.log("Received POST request to /api/deloitte-pays-factoring");
    // const hardcoded = { InvoiceID: "XXXXX",
    //                     CustomerID: "cus_PvjHIMouxuMvhs",
    //                     Amount: 400000, 
    //                     Destination: "acct_1P5pG7R7oRvG1u9R" };
                        
    const intent = await stripe.paymentIntents.create({
        amount: 400000,
        currency: "eur", 
        payment_method_types:['customer_balance'],
        customer: vars.customer_id_deloitte,
        confirm:true,
        payment_method_data:{
          type: "customer_balance",
        },
        expand: ['latest_charge'],
        description:"Factoring Payment for project p" + vars.id_deloitte,
        metadata:{
          'payment_type':'payment',
          'project_id': 'p' + vars.id_deloitte,
          'invoice_id':'i' + vars.id_deloitte,
          'funds_origin': 'deloitte',
          'funds_destinationid': vars.factoring_account_id,
          'funds_destination': 'factoring',
          'incoming_bashbalance_id': vars.incoming_bashbalance_id_deloitte,
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
        amount: 400000,
        destination: vars.factoring_account_id, 
        source_transaction: Source,
        description:"Factoring Payment for project p" + vars.id_deloitte,
        metadata:{
          'payment_type':'payment',
          'project_id': 'p' + vars.id_deloitte,
          'invoice_id':'i' + vars.id_deloitte,
          'funds_origin': 'deloitte',
          'funds_destinationid': vars.factoring_account_id,
          'funds_destination': 'factoring',
          'incoming_bashbalance_id': vars.incoming_bashbalance_id_deloitte,
        },
    });


    const intent2 = await stripe.paymentIntents.create({
      amount: 1000,
      currency: "eur", 
      payment_method_types:['customer_balance'],
      customer: vars.customer_id_deloitte,
      confirm:true,
      payment_method_data:{
        type: "customer_balance",
      },
      expand: ['latest_charge'],
      description:"Malt Fee for project #p" + vars.id_deloitte,
      metadata:{
        'payment_type':'payment',
        'project_id': 'p' + vars.id_deloitte,
        'invoice_id':'i' + vars.id_deloitte,
        'funds_origin': 'deloitte',
        'funds_destinationid': vars.funds_destinationid_deloitte,
        'funds_destination': 'malt',
        'incoming_bashbalance_id': vars.incoming_bashbalance_id_deloitte,
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


    return NextResponse.json({  Transfer: transfers.id }, { status: 200});
  } catch (error) {
    console.error('Error creating customer:', error);
    return NextResponse.json({ error: 'An error occurred while creating the customer.' },{ status: 500});
  }
}
