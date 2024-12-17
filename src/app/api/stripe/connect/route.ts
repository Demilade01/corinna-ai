import Stripe from 'stripe';
import { NextRequest, NextResponse } from 'next/server';

const stripe = new Stripe(process.env.STRIPE_SECRET!, {
  apiVersion: '2024-04-10',
  typescript: true,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const params: Stripe.Checkout.SessionCreateParams = {
      submit_type: 'pay',
      mode: 'payment',
      payment_method_types: ['card'],
      billing_address_collection: 'auto',
      shipping_options: [
        { shipping_rate: 'shr_1Oiw9BBUF1IOPuPLKXfhFVsu' },
        { shipping_rate: 'shr_1OjJTMBUF1IOPuPL2s5Bsqp7' },
      ],
      line_items: body.map((item: any) => {
        const img = item.image[0]?.asset?._ref || '';
        const newImage = img
          .replace('image-', 'https://cdn.sanity.io/images/itj5ehjn/production/')
          .replace('-webp', '.webp');

        return {
          price_data: {
            currency: 'usd',
            product_data: {
              name: item.name,
              images: [newImage],
            },
            unit_amount: Math.round(item.price * 100),
          },
          adjustable_quantity: {
            enabled: true,
            minimum: 1,
          },
          quantity: item.quantity,
        };
      }),
      success_url: `${req.headers.get('origin')}/success`,
      cancel_url: `${req.headers.get('origin')}/canceled`,
    };

    const session = await stripe.checkout.sessions.create(params);

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { message: 'Failed to create Stripe session' },
      { status: 500 }
    );
  }
}
