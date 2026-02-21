import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
import logging
from dotenv import load_dotenv
from pathlib import Path

# Load environment variables
ROOT_DIR = Path(__file__).parent.parent
load_dotenv(ROOT_DIR / '.env')

logger = logging.getLogger(__name__)

# Email configuration
SMTP_SERVER = os.getenv('SMTP_SERVER', 'smtp.gmail.com')
SMTP_PORT = int(os.getenv('SMTP_PORT', '587'))
SMTP_USERNAME = os.getenv('SMTP_USERNAME', 'arctrackdev@gmail.com')
SMTP_PASSWORD = os.getenv('SMTP_PASSWORD', '')  # Set in .env
ADMIN_EMAIL = os.getenv('ADMIN_EMAIL', 'arctrackdev@gmail.com')

def send_email(to_email: str, subject: str, html_content: str):
    """Send an email using SMTP"""
    try:
        msg = MIMEMultipart('alternative')
        msg['From'] = SMTP_USERNAME
        msg['To'] = to_email
        msg['Subject'] = subject
        
        html_part = MIMEText(html_content, 'html')
        msg.attach(html_part)
        
        # Skip sending if password not configured
        if not SMTP_PASSWORD:
            logger.warning(f"SMTP not configured. Email would be sent to {to_email}")
            logger.info(f"Subject: {subject}")
            return True
        
        with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
            server.starttls()
            server.login(SMTP_USERNAME, SMTP_PASSWORD)
            server.send_message(msg)
        
        logger.info(f"Email sent successfully to {to_email}")
        return True
    
    except Exception as e:
        logger.error(f"Failed to send email to {to_email}: {str(e)}")
        return False

def send_lead_notification(lead_data: dict):
    """Send email notification for new lead to admin"""
    subject = f"🎯 New Lead: {lead_data['schoolName']}"
    
    html_content = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body {{ font-family: 'Inter', Arial, sans-serif; background-color: #f8fafc; padding: 20px; }}
            .container {{ max-width: 600px; margin: 0 auto; background-color: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }}
            .header {{ background: linear-gradient(135deg, #0EA5E9 0%, #3B82F6 100%); padding: 30px; text-align: center; }}
            .header h1 {{ color: white; margin: 0; font-size: 24px; }}
            .content {{ padding: 30px; }}
            .info-row {{ display: flex; margin-bottom: 15px; padding: 12px; background-color: #f1f5f9; border-radius: 8px; }}
            .label {{ font-weight: 600; color: #475569; min-width: 140px; }}
            .value {{ color: #1e293b; }}
            .cta-button {{ display: inline-block; background: linear-gradient(135deg, #0EA5E9 0%, #3B82F6 100%); color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; margin-top: 20px; }}
            .footer {{ text-align: center; padding: 20px; background-color: #f8fafc; color: #64748b; font-size: 14px; }}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>🎯 New Lead Received!</h1>
            </div>
            <div class="content">
                <p style="color: #475569; margin-bottom: 25px;">A new school has expressed interest in ArcTrack. Here are the details:</p>
                
                <div class="info-row">
                    <span class="label">🏫 School Name:</span>
                    <span class="value">{lead_data['schoolName']}</span>
                </div>
                
                <div class="info-row">
                    <span class="label">👥 Student Strength:</span>
                    <span class="value">{lead_data['studentStrength']}</span>
                </div>
                
                <div class="info-row">
                    <span class="label">📍 City:</span>
                    <span class="value">{lead_data['city']}</span>
                </div>
                
                <div class="info-row">
                    <span class="label">👤 Contact Person:</span>
                    <span class="value">{lead_data['contactName']}</span>
                </div>
                
                <div class="info-row">
                    <span class="label">📧 Email:</span>
                    <span class="value">{lead_data['email']}</span>
                </div>
                
                <div class="info-row">
                    <span class="label">📞 Phone:</span>
                    <span class="value">{lead_data['phone']}</span>
                </div>
                
                <div class="info-row">
                    <span class="label">🔗 Source:</span>
                    <span class="value">{lead_data.get('source', 'Website Form')}</span>
                </div>
                
                <p style="margin-top: 25px; color: #64748b; font-size: 14px;">
                    ⏰ <strong>Action Required:</strong> Follow up within 24 hours for best conversion rates.
                </p>
            </div>
            <div class="footer">
                <p>ArcTrack Lead Management System</p>
                <p>Complete School Digital Infrastructure Platform</p>
            </div>
        </div>
    </body>
    </html>
    """
    
    return send_email(ADMIN_EMAIL, subject, html_content)

def send_lead_confirmation(lead_data: dict):
    """Send confirmation email to the lead"""
    subject = "Thank you for your interest in ArcTrack!"
    
    html_content = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body {{ font-family: 'Inter', Arial, sans-serif; background-color: #f8fafc; padding: 20px; }}
            .container {{ max-width: 600px; margin: 0 auto; background-color: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }}
            .header {{ background: linear-gradient(135deg, #0EA5E9 0%, #3B82F6 100%); padding: 40px; text-align: center; }}
            .header h1 {{ color: white; margin: 0 0 10px 0; font-size: 28px; }}
            .header p {{ color: #e0f2fe; margin: 0; }}
            .content {{ padding: 40px; }}
            .content h2 {{ color: #1e293b; margin-bottom: 20px; }}
            .content p {{ color: #475569; line-height: 1.6; margin-bottom: 15px; }}
            .highlight-box {{ background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); border-left: 4px solid #0EA5E9; padding: 20px; border-radius: 8px; margin: 25px 0; }}
            .benefit {{ display: flex; align-items: start; margin-bottom: 15px; }}
            .benefit-icon {{ color: #0EA5E9; margin-right: 12px; font-size: 20px; }}
            .footer {{ text-align: center; padding: 30px; background-color: #f8fafc; color: #64748b; font-size: 14px; }}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Welcome to ArcTrack! 🎉</h1>
                <p>India's Complete School Management Platform</p>
            </div>
            <div class="content">
                <p>Dear {lead_data['contactName']},</p>
                
                <p>Thank you for your interest in ArcTrack for <strong>{lead_data['schoolName']}</strong>!</p>
                
                <div class="highlight-box">
                    <h3 style="color: #0EA5E9; margin-top: 0;">✅ Your Request is Confirmed</h3>
                    <p style="margin-bottom: 0;">Our team has received your information and will contact you within 24 hours to schedule a personalized demo of the ArcTrack platform.</p>
                </div>
                
                <h3 style="color: #1e293b; margin-top: 30px;">What to expect:</h3>
                
                <div class="benefit">
                    <span class="benefit-icon">📞</span>
                    <div>
                        <strong>Personal consultation call</strong> to understand your school's specific needs
                    </div>
                </div>
                
                <div class="benefit">
                    <span class="benefit-icon">💻</span>
                    <div>
                        <strong>Live demo</strong> tailored to schools with {lead_data['studentStrength']} students
                    </div>
                </div>
                
                <div class="benefit">
                    <span class="benefit-icon">📊</span>
                    <div>
                        <strong>Custom proposal</strong> with pricing and implementation timeline
                    </div>
                </div>
                
                <div class="benefit">
                    <span class="benefit-icon">🌐</span>
                    <div>
                        <strong>Free website mockup</strong> showing how your school's website could look
                    </div>
                </div>
                
                <p style="margin-top: 30px; color: #64748b; font-size: 14px;">
                    If you have any immediate questions, feel free to reply to this email.
                </p>
            </div>
            <div class="footer">
                <p><strong>ArcTrack</strong></p>
                <p>Complete ERP • Mobile Apps • Premium Website</p>
                <p style="margin-top: 15px;">
                    Email: arctrackdev@gmail.com<br>
                    Website: <a href="#" style="color: #0EA5E9;">www.arctrack.com</a>
                </p>
            </div>
        </div>
    </body>
    </html>
    """
    
    return send_email(lead_data['email'], subject, html_content)
