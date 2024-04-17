import { NextResponse } from "next/server";
import Stripe from "stripe";
const vars = require('../../vars');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    console.log("Received POST request to /api/transfer-manuel");

    // Retrieve the most recently created Charge
    const charges = await stripe.charges.list({
      limit: 1,
    });

    if (charges.data.length === 0) {
      throw new Error('No charges found.');
    }

    const latestCharge = charges.data[0];
    console.log('Latest charge: ', latestCharge.id);

    const transfer = await stripe.transfers.create({
      amount: 350000,
      currency: "eur",
      destination: vars.manuel_id_smb,
      source_transaction: latestCharge.id,
      description: "Factoring Payment for project p" + vars.id_smb,
      metadata: {
        'payment_type': 'payment',
        'project_id': 'p' + vars.id_smb,
        'invoice_id': 'i' + vars.id_smb,
        'funds_origin': 'malt',
        'funds_destinationid': vars.manuel_id_smb,
        'funds_destination': 'freelancer',
        'incoming_bashbalance_id': vars.incoming_bashbalance_id_smb,
      },
    });

    // Return a success response
    return NextResponse.json({ message: 'Transfer created successfully', transfer }, { status: 200 });
  } catch (error) {
    console.error('Transfer: ', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}