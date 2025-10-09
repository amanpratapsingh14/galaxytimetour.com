import crypto from 'crypto';

import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Security configuration
const SECURITY_CONFIG = {
  MAX_REQUESTS_PER_MINUTE: 5,
  ALLOWED_EMAIL_DOMAINS: ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com'],
  MAX_NAME_LENGTH: 100,
  MAX_MESSAGE_LENGTH: 1000,
  ENCRYPTION_KEY: process.env.ENCRYPTION_KEY || crypto.randomBytes(32).toString('hex'),
};

// Rate limiting store (in production, use Redis or database)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// Input validation and sanitization
function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .substring(0, SECURITY_CONFIG.MAX_MESSAGE_LENGTH);
}

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return false;
  
  const domain = email.split('@')[1]?.toLowerCase();
  return domain ? SECURITY_CONFIG.ALLOWED_EMAIL_DOMAINS.includes(domain) : false;
}

function validatePhone(phone: string): boolean {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
}

function validateDate(date: string): boolean {
  const selectedDate = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  return selectedDate >= today && selectedDate <= new Date(today.getTime() + 365 * 24 * 60 * 60 * 1000);
}

function validateNumberOfDays(days: string): boolean {
  const num = parseInt(days);
  return !isNaN(num) && num >= 1 && num <= 30;
}

function validateNumberOfAdults(adults: string): boolean {
  const num = parseInt(adults);
  return !isNaN(num) && num >= 1 && num <= 20;
}

function validateNumberOfChildren(children: string): boolean {
  const num = parseInt(children);
  return !isNaN(num) && num >= 0 && num <= 10;
}

function validateNationality(nationality: string): boolean {
  return nationality.trim().length > 0 && nationality.trim().length <= 50;
}

// Rate limiting function
function checkRateLimit(identifier: string): boolean {
  const now = Date.now();
  const minute = 60 * 1000;
  
  if (!rateLimitStore.has(identifier)) {
    rateLimitStore.set(identifier, { count: 1, resetTime: now + minute });
    return true;
  }
  
  const record = rateLimitStore.get(identifier)!;
  
  if (now > record.resetTime) {
    rateLimitStore.set(identifier, { count: 1, resetTime: now + minute });
    return true;
  }
  
  if (record.count >= SECURITY_CONFIG.MAX_REQUESTS_PER_MINUTE) {
    return false;
  }
  
  record.count++;
  return true;
}



// Secure transporter with additional security options
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // Use TLS
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
  tls: {
    rejectUnauthorized: true, // Verify SSL certificates
    ciphers: 'HIGH:!aNULL:!MD5:!RC4', // Strong ciphers only
  },
});

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'ajauser1998@gmail.com';

type BookingFormData = {
  formType?: 'booking';
  destination: string;
  fullName: string;
  email: string;
  phone: string;
  nationality: string;
  date: string;
  numberOfDays: string;
  numberOfAdults: string;
  numberOfChildren: string;
  includeBreakfast: boolean;
  includeLunch: boolean;
  includeDinner: boolean;
  additionalNotes?: string;
  website?: string; // Honeypot field
};

type ContactFormData = {
  formType?: 'contact';
  'first-name': string;
  'last-name': string;
  email: string;
  phone: string;
  preferredContactMethod: string;
  inquiryType: string;
  message: string;
};

type FormData = BookingFormData | ContactFormData;

function getFormType(data: FormData): 'booking' | 'contact' {
  if ('formType' in data && data.formType) return data.formType;
  if ('date' in data && 'numberOfDays' in data && 'numberOfAdults' in data) return 'booking';
  return 'contact';
}

// Enhanced email templates with security headers and content
function bookingTemplate(data: BookingFormData) {
  const bookingId = crypto.randomBytes(8).toString('hex').toUpperCase();
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="Content-Security-Policy" content="default-src 'self'; style-src 'unsafe-inline';">
      <meta http-equiv="X-Content-Type-Options" content="nosniff">
      <meta http-equiv="X-Frame-Options" content="DENY">
      <title>Booking Confirmation - Secure</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f8fafc;
        }
        .header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 30px;
          text-align: center;
          border-radius: 12px 12px 0 0;
          margin-bottom: 0;
        }
        .content {
          background: white;
          padding: 30px;
          border-radius: 0 0 12px 12px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .booking-table {
          width: 100%;
          border-collapse: collapse;
          margin: 20px 0;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .booking-table th {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 15px;
          text-align: left;
          font-weight: 600;
        }
        .booking-table td {
          padding: 15px;
          border-bottom: 1px solid #e2e8f0;
          background: #f8fafc;
        }
        .booking-table tr:last-child td {
          border-bottom: none;
        }
        .booking-table tr:nth-child(even) td {
          background: white;
        }
        .highlight {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
          color: white !important;
          font-weight: 600;
        }
        .security-badge {
          background: #10b981;
          color: white;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 600;
        }
        .footer {
          margin-top: 30px;
          padding: 20px;
          background: #f1f5f9;
          border-radius: 8px;
          text-align: center;
          color: #64748b;
        }
        .logo {
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 10px;
        }
        .status-badge {
          display: inline-block;
          background: #10b981;
          color: white;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 20px;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="logo">🌌 Galaxy Time Tour</div>
        <h1>Booking Confirmation</h1>
        <div class="status-badge">✓ Confirmed & Secured</div>
        <div class="security-badge">🔒 SSL Encrypted</div>
      </div>
      
      <div class="content">
        <p>Dear <strong>${sanitizeInput(data.fullName)}</strong>,</p>
        
        <p>Thank you for choosing Galaxy Time Tour! Your booking has been successfully confirmed and secured. Here are your booking details:</p>
        
        <table class="booking-table">
          <thead>
            <tr>
              <th colspan="2">📋 Secure Booking Information</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>🔐 Booking ID</strong></td>
              <td>${bookingId}</td>
            </tr>
            <tr>
              <td><strong>🌍 Destination</strong></td>
              <td>${sanitizeInput(data.destination)}</td>
            </tr>
            <tr>
              <td><strong>👤 Guest Name</strong></td>
              <td>${sanitizeInput(data.fullName)}</td>
            </tr>
            <tr>
              <td><strong>📧 Email Address</strong></td>
              <td>${sanitizeInput(data.email)}</td>
            </tr>
            <tr>
              <td><strong>📞 Phone Number</strong></td>
              <td>${sanitizeInput(data.phone)}</td>
            </tr>
            <tr>
              <td><strong>📅 Travel Date</strong></td>
              <td>${new Date(data.date).toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</td>
            </tr>
            <tr>
              <td><strong>🌍 Nationality</strong></td>
              <td>${sanitizeInput(data.nationality)}</td>
            </tr>
            <tr>
              <td><strong>📅 Number of Days</strong></td>
              <td>${sanitizeInput(data.numberOfDays)} ${parseInt(data.numberOfDays) === 1 ? 'Day' : 'Days'}</td>
            </tr>
            <tr>
              <td><strong>👥 Number of Adults</strong></td>
              <td>${sanitizeInput(data.numberOfAdults)} ${parseInt(data.numberOfAdults) === 1 ? 'Adult' : 'Adults'}</td>
            </tr>
            <tr>
              <td><strong>👶 Number of Children</strong></td>
              <td>${sanitizeInput(data.numberOfChildren)} ${parseInt(data.numberOfChildren) === 1 ? 'Child' : 'Children'}</td>
            </tr>
            <tr>
              <td><strong>🍽️ Meal Preferences</strong></td>
              <td>
                ${data.includeBreakfast ? '✓ Breakfast' : '✗ Breakfast'}<br/>
                ${data.includeLunch ? '✓ Lunch' : '✗ Lunch'}<br/>
                ${data.includeDinner ? '✓ Dinner' : '✗ Dinner'}
              </td>
            </tr>
            <tr>
              <td><strong>💫 Additional Notes</strong></td>
              <td>${sanitizeInput(data.additionalNotes || 'None specified')}</td>
            </tr>
          </tbody>
        </table>
        
        <div class="footer">
          <!-- <p><strong>🔒 Security Information</strong></p> -->
          <!-- <p>This email is encrypted and sent via secure SSL/TLS connection. Your data is protected.</p> -->
          <p><strong>What's Next?</strong></p>
          <p>Our team will contact you within 2-4 days to confirm your itinerary and provide additional details about your upcoming adventure.</p>
          <p>For any questions, please contact us at <strong>support@galaxytimetour.com</strong></p>
          <p>Safe travels! ✈️</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

function bookingAdminTemplate(data: BookingFormData) {
  const bookingId = crypto.randomBytes(8).toString('hex').toUpperCase();
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="Content-Security-Policy" content="default-src 'self'; style-src 'unsafe-inline';">
      <meta http-equiv="X-Content-Type-Options" content="nosniff">
      <meta http-equiv="X-Frame-Options" content="DENY">
      <title>New Booking Alert - Secure</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f8fafc;
        }
        .header {
          background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
          color: white;
          padding: 30px;
          text-align: center;
          border-radius: 12px 12px 0 0;
          margin-bottom: 0;
        }
        .content {
          background: white;
          padding: 30px;
          border-radius: 0 0 12px 12px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .booking-table {
          width: 100%;
          border-collapse: collapse;
          margin: 20px 0;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .booking-table th {
          background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
          color: white;
          padding: 15px;
          text-align: left;
          font-weight: 600;
        }
        .booking-table td {
          padding: 15px;
          border-bottom: 1px solid #e2e8f0;
          background: #f8fafc;
        }
        .booking-table tr:last-child td {
          border-bottom: none;
        }
        .booking-table tr:nth-child(even) td {
          background: white;
        }
        .urgent {
          background: #fef2f2 !important;
          border-left: 4px solid #ef4444;
        }
        .security-info {
          background: #f0f9ff;
          border: 1px solid #0ea5e9;
          border-radius: 8px;
          padding: 15px;
          margin: 20px 0;
        }
        .logo {
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 10px;
        }
        .alert-badge {
          display: inline-block;
          background: #ef4444;
          color: white;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 20px;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="logo">🌌 Galaxy Time Tour</div>
        <h1>New Booking Alert</h1>
        <div class="alert-badge">🔔 Secure Booking</div>
      </div>
      
      <div class="content">
        <p>A new booking has been submitted through the website. Please review the details below:</p>
        
        <div class="security-info">
          <p><strong>🔒 Security Information:</strong></p>
          <ul>
            <li>Booking ID: ${bookingId}</li>
            <!-- <li>Encrypted data transmission</li> -->
            <!-- <li>SSL/TLS secured connection</li> -->
            <!-- <li>Rate-limited submission</li> -->
          </ul>
        </div>
        
        <table class="booking-table">
          <thead>
            <tr>
              <th colspan="2">📋 Customer Booking Details</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>🔐 Booking ID</strong></td>
              <td>${bookingId}</td>
            </tr>
            <tr>
              <td><strong>🌍 Destination</strong></td>
              <td>${sanitizeInput(data.destination)}</td>
            </tr>
            <tr>
              <td><strong>👤 Customer Name</strong></td>
              <td>${sanitizeInput(data.fullName)}</td>
            </tr>
            <tr>
              <td><strong>📧 Email Address</strong></td>
              <td><a href="mailto:${sanitizeInput(data.email)}">${sanitizeInput(data.email)}</a></td>
            </tr>
            <tr>
              <td><strong>📞 Phone Number</strong></td>
              <td><a href="tel:${sanitizeInput(data.phone)}">${sanitizeInput(data.phone)}</a></td>
            </tr>
            <tr>
              <td><strong>📅 Requested Date</strong></td>
              <td>${new Date(data.date).toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</td>
            </tr>
            <tr>
              <td><strong>🌍 Nationality</strong></td>
              <td>${sanitizeInput(data.nationality)}</td>
            </tr>
            <tr>
              <td><strong>📅 Number of Days</strong></td>
              <td>${sanitizeInput(data.numberOfDays)} ${parseInt(data.numberOfDays) === 1 ? 'Day' : 'Days'}</td>
            </tr>
            <tr>
              <td><strong>👥 Number of Adults</strong></td>
              <td>${sanitizeInput(data.numberOfAdults)} ${parseInt(data.numberOfAdults) === 1 ? 'Adult' : 'Adults'}</td>
            </tr>
            <tr>
              <td><strong>👶 Number of Children</strong></td>
              <td>${sanitizeInput(data.numberOfChildren)} ${parseInt(data.numberOfChildren) === 1 ? 'Child' : 'Children'}</td>
            </tr>
            <tr>
              <td><strong>🍽️ Meal Preferences</strong></td>
              <td>
                ${data.includeBreakfast ? '✓ Breakfast' : '✗ Breakfast'}<br/>
                ${data.includeLunch ? '✓ Lunch' : '✗ Lunch'}<br/>
                ${data.includeDinner ? '✓ Dinner' : '✗ Dinner'}
              </td>
            </tr>
            <tr class="urgent">
              <td><strong>💫 Additional Notes</strong></td>
              <td>${sanitizeInput(data.additionalNotes || 'None specified')}</td>
            </tr>
          </tbody>
        </table>
        
        <div style="margin-top: 20px; padding: 15px; background: #f0f9ff; border-radius: 8px; border-left: 4px solid #0ea5e9;">
          <p><strong>Action Required:</strong></p>
          <ul>
            <li>Contact customer within 2-4 days</li>
            <li>Confirm availability for requested date</li>
            <li>Prepare detailed itinerary</li>
            <li>Send confirmation with payment details</li>
            <li>Verify customer identity via secure channel</li>
    </ul>
        </div>
      </div>
    </body>
    </html>
  `;
}

function contactTemplate(data: ContactFormData) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="Content-Security-Policy" content="default-src 'self'; style-src 'unsafe-inline';">
      <meta http-equiv="X-Content-Type-Options" content="nosniff">
      <meta http-equiv="X-Frame-Options" content="DENY">
      <title>Thank You for Contacting Us - Secure</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f8fafc;
        }
        .header {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: white;
          padding: 30px;
          text-align: center;
          border-radius: 12px 12px 0 0;
          margin-bottom: 0;
        }
        .content {
          background: white;
          padding: 30px;
          border-radius: 0 0 12px 12px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .contact-table {
          width: 100%;
          border-collapse: collapse;
          margin: 20px 0;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .contact-table th {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: white;
          padding: 15px;
          text-align: left;
          font-weight: 600;
        }
        .contact-table td {
          padding: 15px;
          border-bottom: 1px solid #e2e8f0;
          background: #f8fafc;
        }
        .contact-table tr:last-child td {
          border-bottom: none;
        }
        .contact-table tr:nth-child(even) td {
          background: white;
        }
        .logo {
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 10px;
        }
        .footer {
          margin-top: 30px;
          padding: 20px;
          background: #f0fdf4;
          border-radius: 8px;
          text-align: center;
          color: #166534;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="logo">🌌 Galaxy Time Tour</div>
        <h1>Thank You for Contacting Us</h1>
      </div>
      
      <div class="content">
        <p>Dear <strong>${sanitizeInput(data['first-name'])} ${sanitizeInput(data['last-name'])}</strong>,</p>
        
        <p>Thank you for reaching out to Galaxy Time Tour! We've received your inquiry and will get back to you as soon as possible.</p>
        
        <table class="contact-table">
          <thead>
            <tr>
              <th colspan="2">📝 Inquiry Details</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>👤 Name</strong></td>
              <td>${sanitizeInput(data['first-name'])} ${sanitizeInput(data['last-name'])}</td>
            </tr>
            <tr>
              <td><strong>📧 Email</strong></td>
              <td>${sanitizeInput(data.email)}</td>
            </tr>
            <tr>
              <td><strong>📞 Phone</strong></td>
              <td>${sanitizeInput(data.phone)}</td>
            </tr>
            <tr>
              <td><strong>📋 Inquiry Type</strong></td>
              <td>${sanitizeInput(data.inquiryType)}</td>
            </tr>
            <tr>
              <td><strong>💬 Preferred Contact</strong></td>
              <td>${sanitizeInput(data.preferredContactMethod)}</td>
            </tr>
            <tr>
              <td><strong>💭 Message</strong></td>
              <td>${sanitizeInput(data.message)}</td>
            </tr>
          </tbody>
        </table>
        
        <div class="footer">
          <!-- <p><strong>🔒 Secure Communication</strong></p> -->
          <!-- <p>Your message has been securely transmitted and stored.</p> -->
          <p><strong>We'll be in touch soon!</strong></p>
          <p>Our team typically responds within 24 hours during business hours.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

function contactAdminTemplate(data: ContactFormData) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="Content-Security-Policy" content="default-src 'self'; style-src 'unsafe-inline';">
      <meta http-equiv="X-Content-Type-Options" content="nosniff">
      <meta http-equiv="X-Frame-Options" content="DENY">
      <title>New Contact Inquiry - Secure</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f8fafc;
        }
        .header {
          background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
          color: white;
          padding: 30px;
          text-align: center;
          border-radius: 12px 12px 0 0;
          margin-bottom: 0;
        }
        .content {
          background: white;
          padding: 30px;
          border-radius: 0 0 12px 12px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .contact-table {
          width: 100%;
          border-collapse: collapse;
          margin: 20px 0;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .contact-table th {
          background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
          color: white;
          padding: 15px;
          text-align: left;
          font-weight: 600;
        }
        .contact-table td {
          padding: 15px;
          border-bottom: 1px solid #e2e8f0;
          background: #f8fafc;
        }
        .contact-table tr:last-child td {
          border-bottom: none;
        }
        .contact-table tr:nth-child(even) td {
          background: white;
        }
        .logo {
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 10px;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="logo">🌌 Galaxy Time Tour</div>
        <h1>New Contact Inquiry</h1>
      </div>
      
      <div class="content">
        <p>A new secure contact inquiry has been submitted through the website:</p>
        
        <table class="contact-table">
          <thead>
            <tr>
              <th colspan="2">📝 Customer Inquiry</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>👤 Customer Name</strong></td>
              <td>${sanitizeInput(data['first-name'])} ${sanitizeInput(data['last-name'])}</td>
            </tr>
            <tr>
              <td><strong>📧 Email Address</strong></td>
              <td><a href="mailto:${sanitizeInput(data.email)}">${sanitizeInput(data.email)}</a></td>
            </tr>
            <tr>
              <td><strong>📞 Phone Number</strong></td>
              <td><a href="tel:${sanitizeInput(data.phone)}">${sanitizeInput(data.phone)}</a></td>
            </tr>
            <tr>
              <td><strong>📋 Inquiry Type</strong></td>
              <td>${sanitizeInput(data.inquiryType)}</td>
            </tr>
            <tr>
              <td><strong>💬 Preferred Contact</strong></td>
              <td>${sanitizeInput(data.preferredContactMethod)}</td>
            </tr>
            <tr>
              <td><strong>💭 Message</strong></td>
              <td>${sanitizeInput(data.message)}</td>
            </tr>
          </tbody>
        </table>
        
        <div style="margin-top: 20px; padding: 15px; background: #fffbeb; border-radius: 8px; border-left: 4px solid #f59e0b;">
          <p><strong>Action Required:</strong></p>
          <ul>
            <li>Respond within 24 hours</li>
            <li>Use preferred contact method: ${sanitizeInput(data.preferredContactMethod)}</li>
            <li>Address inquiry type: ${sanitizeInput(data.inquiryType)}</li>
            <li>Verify customer identity if needed</li>
    </ul>
        </div>
      </div>
    </body>
    </html>
  `;
}

export async function POST(req: NextRequest) {
  try {
    // Security headers
    const response = NextResponse.next();
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-XSS-Protection', '1; mode=block');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    response.headers.set('Content-Security-Policy', "default-src 'self'");

    // Rate limiting
    const clientIP = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
    if (!checkRateLimit(clientIP)) {
      return NextResponse.json(
        { success: false, error: 'Rate limit exceeded. Please try again later.' },
        { status: 429 }
      );
    }

    // Parse and validate request
    const data = await req.json() as FormData;
    
    // Input validation
    if (getFormType(data) === 'booking') {
      const bookingData = data as BookingFormData;
      
      // Check honeypot - if website field is filled, it's likely a bot
      if (bookingData.website && bookingData.website.trim() !== '') {
        console.log('Honeypot triggered - potential bot detected:', bookingData.website);
        return NextResponse.json(
          { success: false, error: 'Invalid submission' },
          { status: 400 }
        );
      }
      
      // Validate required fields
      if (!bookingData.fullName || bookingData.fullName.length > SECURITY_CONFIG.MAX_NAME_LENGTH) {
        return NextResponse.json(
          { success: false, error: 'Invalid name provided' },
          { status: 400 }
        );
      }
      
      if (!validateEmail(bookingData.email)) {
        return NextResponse.json(
          { success: false, error: 'Invalid email address' },
          { status: 400 }
        );
      }
      
      if (!validatePhone(bookingData.phone)) {
        return NextResponse.json(
          { success: false, error: 'Invalid phone number' },
          { status: 400 }
        );
      }
      
      if (!validateNationality(bookingData.nationality)) {
        return NextResponse.json(
          { success: false, error: 'Invalid nationality' },
          { status: 400 }
        );
      }
      
      if (!validateDate(bookingData.date)) {
        return NextResponse.json(
          { success: false, error: 'Invalid date selected' },
          { status: 400 }
        );
      }
      
      if (!validateNumberOfDays(bookingData.numberOfDays)) {
        return NextResponse.json(
          { success: false, error: 'Invalid number of days' },
          { status: 400 }
        );
      }
      
      if (!validateNumberOfAdults(bookingData.numberOfAdults)) {
        return NextResponse.json(
          { success: false, error: 'Invalid number of adults' },
          { status: 400 }
        );
      }
      
      if (!validateNumberOfChildren(bookingData.numberOfChildren)) {
        return NextResponse.json(
          { success: false, error: 'Invalid number of children' },
          { status: 400 }
        );
      }
      
      // Sanitize data
      bookingData.fullName = sanitizeInput(bookingData.fullName);
      bookingData.email = sanitizeInput(bookingData.email);
      bookingData.phone = sanitizeInput(bookingData.phone);
      bookingData.nationality = sanitizeInput(bookingData.nationality);
      bookingData.additionalNotes = sanitizeInput(bookingData.additionalNotes || '');
      
      // Send emails
      await transporter.sendMail({
        from: process.env.GMAIL_USER,
        to: bookingData.email,
        subject: 'Your Secure Booking Confirmation - Galaxy Time Tour',
        html: bookingTemplate(bookingData),
        headers: {
          'X-Priority': '1',
          'X-MSMail-Priority': 'High',
          'Importance': 'high',
          'X-Mailer': 'Galaxy Time Tour Secure Mailer'
        }
      });

      await transporter.sendMail({
        from: process.env.GMAIL_USER,
        to: ADMIN_EMAIL,
        subject: 'New Secure Booking Received - Galaxy Time Tour',
        html: bookingAdminTemplate(bookingData),
        headers: {
          'X-Priority': '1',
          'X-MSMail-Priority': 'High',
          'Importance': 'high',
          'X-Mailer': 'Galaxy Time Tour Secure Mailer'
        }
      });
    } else {
      const contactData = data as ContactFormData;
      
      // Validate contact form data
      if (!contactData['first-name'] || !contactData['last-name'] || 
          contactData['first-name'].length > SECURITY_CONFIG.MAX_NAME_LENGTH ||
          contactData['last-name'].length > SECURITY_CONFIG.MAX_NAME_LENGTH) {
        return NextResponse.json(
          { success: false, error: 'Invalid name provided' },
          { status: 400 }
        );
      }
      
      if (!validateEmail(contactData.email)) {
        return NextResponse.json(
          { success: false, error: 'Invalid email address' },
          { status: 400 }
        );
      }
      
      if (!validatePhone(contactData.phone)) {
        return NextResponse.json(
          { success: false, error: 'Invalid phone number' },
          { status: 400 }
        );
      }
      
      // Sanitize data
      contactData['first-name'] = sanitizeInput(contactData['first-name']);
      contactData['last-name'] = sanitizeInput(contactData['last-name']);
      contactData.email = sanitizeInput(contactData.email);
      contactData.phone = sanitizeInput(contactData.phone);
      contactData.message = sanitizeInput(contactData.message);
      
      await transporter.sendMail({
        from: process.env.GMAIL_USER,
        to: contactData.email,
        subject: 'Thank you for contacting us - Galaxy Time Tour (Secure)',
        html: contactTemplate(contactData),
        headers: {
          'X-Priority': '3',
          'X-MSMail-Priority': 'Normal',
          'Importance': 'normal',
          'X-Mailer': 'Galaxy Time Tour Secure Mailer'
        }
      });

      await transporter.sendMail({
        from: process.env.GMAIL_USER,
        to: ADMIN_EMAIL,
        subject: 'New Secure Contact Inquiry - Galaxy Time Tour',
        html: contactAdminTemplate(contactData),
        headers: {
          'X-Priority': '1',
          'X-MSMail-Priority': 'High',
          'Importance': 'high',
          'X-Mailer': 'Galaxy Time Tour Secure Mailer'
        }
      });
    }

    return NextResponse.json({ success: true, message: 'Secure submission successful' });
  } catch (error) {
    console.error('Secure email sending error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error. Please try again later.' },
      { status: 500 }
    );
  }
}
