import { NextResponse } from "next/server";
import Stripe from "stripe";
const vars = require('../../vars');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);



export async function POST(request) {
  try {
    console.log("Received POST request to /api/factoring-pays-deloitte");
    // const hardcoded = { InvoiceID: "i117",
    //                     CustomerID: "cus_PvfN0rW5sbT5Rq",
    //                     Amount: 400000, 
    //                     Destination: "acct_1P5rNgQuWz7LVQL7" }; ///LINUS UK
                        
    const intent = await stripe.paymentIntents.create({
        amount: 400000,
        currency: "eur", 
        payment_method_types:['customer_balance'],
        customer: vars.customer_id_factoring,
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
          'funds_origin': 'factoring',
          'funds_destinationid': vars.linus_id_deloitte,
          'funds_destination': 'freelancer',
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


    
    const transfers_linus_uk = await stripe.transfers.create({
        currency: "eur", 
        amount: 400000,
        destination: vars.linus_id_deloitte, 
        source_transaction: Source,
        description:"Factoring Payment for project p" + vars.id_deloitte,
        metadata:{
          'payment_type':'payment',
          'project_id': 'p' + vars.id_deloitte,
          'invoice_id':'i' + vars.id_deloitte,
          'funds_origin': 'factoring',
          'funds_destinationid': vars.linus_id_deloitte,
          'funds_destination': 'freelancer',
          'incoming_bashbalance_id': vars.incoming_bashbalance_id_deloitte,
        },
    });

    const intent2 = await stripe.paymentIntents.create({
      amount: 500000,
      currency: "eur", 
      payment_method_types:['card'],
      customer: vars.customer_id_factoring,
      confirm:true,
      capture_method: 'automatic',  
      payment_method: 'pm_card_visa',
      on_behalf_of: vars.john_id_deloitte,
      description:"Factoring Payment for project p" + vars.id_deloitte,
      metadata:{
        'payment_type':'payment',
        'project_id': 'p' + vars.id_deloitte,
        'invoice_id':'i' + vars.id_deloitte,
        'funds_origin': 'factoring',
        'funds_destinationid': vars.john_id_deloitte,
        'funds_destination': 'freelancer',
        'incoming_bashbalance_id': vars.incoming_bashbalance_id_deloitte,
      },
      transfer_data: {
        destination: vars.john_id_deloitte,
        amount: 500000,
      },
  });

    return NextResponse.json({  Transfer: transfers_linus_uk.id }, { status: 200});
  } catch (error) {
    console.error('Error creating customer:', error);
    return NextResponse.json({ error: 'An error occurred while creating the customer.' },{ status: 500});
  }
}
