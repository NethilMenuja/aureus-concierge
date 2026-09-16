import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { orderId, villaName, items, totalAmount, customerEmail } = await req.json();

    const data = await resend.emails.send({
      from: 'Aureus Concierge <onboarding@resend.dev>',
      to: [customerEmail || 'delivered@resend.dev'],
      subject: `Order Confirmation #${orderId} - Aureus Concierge`,
      html: `
        <div style="background-color: #0A0A0A; color: #FFFFFF; padding: 20px; font-family: sans-serif;">
          <h1 style="color: #D4AF37;">AUREUS CONCIERGE</h1>
          <p style="font-size: 16px;">Luxury Procurement Order Confirmed</p>
          <hr style="border-color: #333;" />
          <p><strong>Property:</strong> ${villaName}</p>
          <p><strong>Order ID:</strong> #${orderId}</p>
          <p><strong>Total Amount:</strong> $${totalAmount}</p>
          <hr style="border-color: #333;" />
          <p style="color: #888;">Thank you for choosing Aureus Concierge.</p>
        </div>
      `,
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}