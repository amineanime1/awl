import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, subject, message } = body

    // TODO: Implement email sending logic here
    // For now, we'll just log the data
    console.log('Contact form submission:', {
      name,
      email,
      phone,
      subject,
      message,
    })

    // Send auto-reply email
    // TODO: Implement auto-reply email logic

    return NextResponse.json(
      { message: 'Message sent successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error processing contact form:', error)
    return NextResponse.json(
      { message: 'Error processing your request' },
      { status: 500 }
    )
  }
} 