// CORS headers for Vercel
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

// Set CORS headers helper
function setCorsHeaders(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

module.exports = async (req, res) => {
  // Set CORS headers for all responses
  setCorsHeaders(res);

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).json({ success: true });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { schoolName, studentStrength, city, contactName, email, phone } = req.body;

    // Validate required fields
    if (!schoolName || !studentStrength || !city || !contactName || !email || !phone) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Generate unique ID
    const leadId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const timestamp = new Date().toISOString();

    // Save to MongoDB (if configured)
    if (process.env.MONGODB_URI) {
      try {
        const client = await connectToDatabase();
        const db = client.db(process.env.MONGODB_DB_NAME || 'arctrack_db');
        await db.collection('leads').insertOne({
          id: leadId,
          schoolName,
          studentStrength,
          city,
          contactName,
          email,
          phone,
          source: 'Website Form',
          status: 'New',
          createdAt: timestamp,
          updatedAt: timestamp,
        });
      } catch (dbError) {
        console.error('MongoDB error (non-blocking):', dbError);
      }
    }

    // Send emails via Resend
    if (process.env.RESEND_API_KEY) {
      try {
        // Email to admin
        await resend.emails.send({
          from: 'ArcTrack <onboarding@resend.dev>', // Use your verified domain
          to: process.env.ADMIN_EMAIL || 'arctrackdev@gmail.com',
          subject: `🎯 New Lead: ${schoolName}`,
          html: `
            <!DOCTYPE html>
            <html>
            <head>
              <style>
                body { font-family: 'Inter', Arial, sans-serif; background-color: #f8fafc; padding: 20px; }
                .container { max-width: 600px; margin: 0 auto; background-color: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
                .header { background: linear-gradient(135deg, #0EA5E9 0%, #3B82F6 100%); padding: 30px; text-align: center; }
                .header h1 { color: white; margin: 0; font-size: 24px; }
                .content { padding: 30px; }
                .info-row { display: flex; margin-bottom: 15px; padding: 12px; background-color: #f1f5f9; border-radius: 8px; }
                .label { font-weight: 600; color: #475569; min-width: 140px; }
                .value { color: #1e293b; }
                .footer { text-align: center; padding: 20px; background-color: #f8fafc; color: #64748b; font-size: 14px; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>🎯 New Lead Received!</h1>
                </div>
                <div class="content">
                  <p style="color: #475569; margin-bottom: 25px;">A new school has expressed interest in ArcTrack:</p>
                  <div class="info-row">
                    <span class="label">🏫 School Name:</span>
                    <span class="value">${schoolName}</span>
                  </div>
                  <div class="info-row">
                    <span class="label">👥 Student Strength:</span>
                    <span class="value">${studentStrength}</span>
                  </div>
                  <div class="info-row">
                    <span class="label">📍 City:</span>
                    <span class="value">${city}</span>
                  </div>
                  <div class="info-row">
                    <span class="label">👤 Contact Person:</span>
                    <span class="value">${contactName}</span>
                  </div>
                  <div class="info-row">
                    <span class="label">📧 Email:</span>
                    <span class="value">${email}</span>
                  </div>
                  <div class="info-row">
                    <span class="label">📞 Phone:</span>
                    <span class="value">${phone}</span>
                  </div>
                  <p style="margin-top: 25px; color: #64748b; font-size: 14px;">
                    ⏰ <strong>Action Required:</strong> Follow up within 24 hours for best conversion rates.
                  </p>
                </div>
                <div class="footer">
                  <p>ArcTrack Lead Management System</p>
                </div>
              </div>
            </body>
            </html>
          `,
        });

        // Confirmation email to lead
        await resend.emails.send({
          from: 'ArcTrack <onboarding@resend.dev>',
          to: email,
          subject: 'Thank you for your interest in ArcTrack!',
          html: `
            <!DOCTYPE html>
            <html>
            <head>
              <style>
                body { font-family: 'Inter', Arial, sans-serif; background-color: #f8fafc; padding: 20px; }
                .container { max-width: 600px; margin: 0 auto; background-color: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
                .header { background: linear-gradient(135deg, #0EA5E9 0%, #3B82F6 100%); padding: 40px; text-align: center; }
                .header h1 { color: white; margin: 0; font-size: 28px; }
                .content { padding: 40px; }
                .highlight-box { background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); border-left: 4px solid #0EA5E9; padding: 20px; border-radius: 8px; margin: 25px 0; }
                .benefit { display: flex; align-items: start; margin-bottom: 15px; }
                .footer { text-align: center; padding: 30px; background-color: #f8fafc; color: #64748b; font-size: 14px; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>Welcome to ArcTrack! 🎉</h1>
                  <p style="color: #e0f2fe; margin: 10px 0 0 0;">Complete School Management Platform</p>
                </div>
                <div class="content">
                  <p>Dear ${contactName},</p>
                  <p>Thank you for your interest in ArcTrack for <strong>${schoolName}</strong>!</p>
                  <div class="highlight-box">
                    <h3 style="color: #0EA5E9; margin-top: 0;">✅ Your Request is Confirmed</h3>
                    <p style="margin-bottom: 0;">Our team will contact you within 24 hours to schedule a personalized demo.</p>
                  </div>
                  <h3>What to expect:</h3>
                  <div class="benefit">📞 Personal consultation call</div>
                  <div class="benefit">💻 Live demo for ${studentStrength} students</div>
                  <div class="benefit">📊 Custom proposal with pricing</div>
                  <div class="benefit">🌐 Free website mockup preview</div>
                </div>
                <div class="footer">
                  <p><strong>ArcTrack</strong></p>
                  <p>Email: arctrackdev@gmail.com</p>
                </div>
              </div>
            </body>
            </html>
          `,
        });

        console.log('Emails sent successfully');
      } catch (emailError) {
        console.error('Email error (non-blocking):', emailError);
      }
    }

    // Return success response
    res.status(200).json({
      success: true,
      id: leadId,
      message: 'Lead submitted successfully',
    });

  } catch (error) {
    console.error('Error processing lead:', error);
    res.status(500).json({
      error: 'Failed to process lead',
      message: error.message,
    });
  }
};
