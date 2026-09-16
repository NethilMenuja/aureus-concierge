import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(req: Request) {
  try {
    // Build වෙන වෙලාවේ API Key එක නැති වුණත් Crash නොවෙන්න Function එක ඇතුළට දැම්මා
    const apiKey = process.env.RESEND_API_KEY || 're_dummy_key_for_build';
    const resend = new Resend(apiKey);

    const { orderId, villaName, items, totalAmount, customerEmail } = await req.json();

    const data = await resend.emails.send({
      from: 'Kavaro Concierge <onboarding@resend.dev>',
      to: [customerEmail || 'delivered@resend.dev'],
      subject: `Order Confirmation #${orderId} - Kavaro Concierge`,
      html: `
        <div style="background-color: #0A0A0A; color: #FFFFFF; padding: 20px; font-family: sans-serif;">
          <h1 style="color: #D4AF37;">KAVARO CONCIERGE</h1>
          <p style="font-size: 16px;">Luxury Procurement Order Confirmed</p>
          <hr style="border-color: #333;" />
          <p><strong>Property:</strong> ${villaName}</p>
          <p><strong>Order ID:</strong> #${orderId}</p>
          <p><strong>Items:</strong> ${items}</p>
          <p><strong>Total Amount:</strong> $${totalAmount}</p>
          <hr style="border-color: #333;" />
          <p style="color: #888;">Thank you for choosing Kavaro Concierge.</p>
        </div>
      `,
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}