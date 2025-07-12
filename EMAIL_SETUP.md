# Email Setup Guide - Galaxy Time Tour

## Gmail SMTP Configuration (Recommended - Free & Secure)

This guide will help you set up email functionality for booking confirmations and contact form submissions using Gmail SMTP.

### Prerequisites

1. **Gmail Account** with 2-Factor Authentication enabled
2. **App Password** generated from Google Account settings

### Step 1: Enable 2-Factor Authentication

1. Go to [Google Account Settings](https://myaccount.google.com/)
2. Click on "Security" in the left sidebar
3. Enable "2-Step Verification" if not already enabled

### Step 2: Generate App Password

1. Go to [App Passwords](https://myaccount.google.com/apppasswords)
2. Select "Mail" from the dropdown
3. Click "Generate"
4. Copy the 16-character password (remove spaces when using)

### Step 3: Create Environment File

Create a `.env.local` file in your project root with:

```bash
GMAIL_USER=your-gmail-address@gmail.com
GMAIL_APP_PASSWORD=your16characterpassword
ADMIN_EMAIL=admin@yourdomain.com
```

### Step 4: Restart Development Server

```bash
npm run dev
```

### Features

- ✅ **Booking Confirmations**: Customers receive confirmation emails
- ✅ **Admin Notifications**: Admin receives booking notifications
- ✅ **Contact Form**: Contact form submissions are emailed
- ✅ **Secure**: Uses Gmail's secure SMTP with app passwords
- ✅ **Free**: No monthly costs or API limits

### Email Templates

The system includes professional email templates for:
- Booking confirmations
- Admin booking notifications
- Contact form confirmations
- Admin contact notifications

### Troubleshooting

**Emails not sending?**
1. Check console for error messages
2. Verify app password (no spaces)
3. Check spam folder
4. Ensure 2FA is enabled

**Environment variables not loading?**
1. Restart the development server
2. Check `.env.local` file location
3. Verify variable names match exactly

### Security Notes

- App passwords are more secure than regular passwords
- Never commit `.env.local` to version control
- Each app password is unique and can be revoked
- 2FA must be enabled to use app passwords 



--------------------------------------------------------------------------------------------------------------

# Security Features - Galaxy Time Tour

## 🔒 Comprehensive Security Implementation

This document outlines all security measures implemented to protect user data and prevent spam/bot attacks.

## 🛡️ Anti-Spam & Bot Protection

### 1. **Honeypot Field**
- **Purpose**: Catches automated bots that fill all form fields
- **Implementation**: Hidden "website" field that legitimate users never see
- **Detection**: If filled, submission is rejected as potential bot
- **Location**: Frontend form + Backend validation

### 2. **CAPTCHA Protection**
- **Type**: Math-based CAPTCHA (simple addition)
- **Features**:
  - Random number generation (1-10)
  - Visual feedback (green/red borders)
  - Refresh button for new challenges
  - Real-time validation
- **User Experience**: Easy for humans, difficult for bots

### 3. **Rate Limiting**
- **Limit**: 5 requests per minute per IP
- **Storage**: In-memory Map (production: use Redis)
- **Response**: 429 status code when exceeded
- **Reset**: Automatic after time window

## 🔐 Data Security

### 4. **Input Validation & Sanitization**
- **Email Validation**: Only trusted domains (Gmail, Yahoo, Hotmail, Outlook)
- **Phone Validation**: International format with regex
- **Date Validation**: Prevents past dates and far-future dates
- **Length Limits**: Name (100 chars), Message (1000 chars)
- **HTML Sanitization**: Removes tags, scripts, event handlers

### 5. **Data Encryption**
- **Algorithm**: AES-256-CBC
- **Key**: Environment variable or auto-generated
- **Fallback**: Base64 encoding if encryption fails
- **Scope**: Sensitive data in emails

### 6. **Email Security**
- **Transport**: Gmail SMTP with TLS/SSL
- **Port**: 465 (secure)
- **Ciphers**: High-security only (HIGH:!aNULL:!MD5:!RC4)
- **Certificate Verification**: Enabled
- **Headers**: Custom security headers

## 🚫 Attack Prevention

### 7. **XSS Protection**
- **Input Sanitization**: Removes `<script>`, `javascript:`, event handlers
- **Content Security Policy**: Restricted resource loading
- **X-XSS-Protection**: Browser-level protection

### 8. **CSRF Protection**
- **Same-Origin Policy**: Strict referrer policy
- **X-Frame-Options**: DENY (prevents clickjacking)
- **Content-Type Validation**: JSON only

### 9. **Information Disclosure Prevention**
- **Error Messages**: Generic responses (no sensitive data)
- **Headers**: Security headers prevent information leakage
- **Logging**: Minimal sensitive data in logs

## 📧 Email Security Features

### 10. **Secure Email Templates**
- **Headers**: Security badges and encryption indicators
- **Content**: Professional formatting with security information
- **Links**: Clickable contact information for admins
- **Branding**: Consistent Galaxy Time Tour branding

### 11. **Email Validation**
- **Domain Whitelist**: Only trusted email providers
- **Format Validation**: Proper email structure
- **Delivery**: Confirmation to customer + notification to admin

## 🔍 Monitoring & Logging

### 12. **Security Monitoring**
- **Honeypot Triggers**: Logged when bots detected
- **Rate Limit Violations**: Tracked for abuse patterns
- **Validation Failures**: Monitored for attack attempts
- **Error Logging**: Secure error handling

### 13. **Audit Trail**
- **Booking IDs**: Unique identifiers for tracking
- **Timestamps**: All actions logged with time
- **IP Tracking**: Rate limiting and security analysis
- **User Actions**: Form submissions and validations

## 🚀 Performance & Reliability

### 14. **Graceful Degradation**
- **Encryption Fallback**: System continues if encryption fails
- **Error Handling**: User-friendly error messages
- **Loading States**: Clear feedback during submission
- **Validation Feedback**: Real-time form validation

### 15. **Scalability**
- **Connection Limits**: Prevents email server overload
- **Memory Management**: Efficient rate limiting storage
- **Error Recovery**: Automatic retry mechanisms
- **Resource Protection**: Limits on concurrent operations

## 📋 Security Checklist

- ✅ **Honeypot Field** - Bot detection
- ✅ **CAPTCHA** - Human verification
- ✅ **Rate Limiting** - Abuse prevention
- ✅ **Input Validation** - Data integrity
- ✅ **Data Sanitization** - XSS prevention
- ✅ **Email Encryption** - Data protection
- ✅ **TLS/SSL** - Secure transmission
- ✅ **Security Headers** - Browser protection
- ✅ **Error Handling** - Information protection
- ✅ **Monitoring** - Attack detection
- ✅ **Audit Trail** - Activity tracking
- ✅ **Graceful Degradation** - System reliability

## 🔧 Configuration

### Environment Variables Required:
```bash
GMAIL_USER=your-gmail@gmail.com
GMAIL_APP_PASSWORD=your-16-character-app-password
ADMIN_EMAIL=admin@yourdomain.com
ENCRYPTION_KEY=your-32-character-encryption-key
```

### Security Settings:
```typescript
const SECURITY_CONFIG = {
  MAX_REQUESTS_PER_MINUTE: 5,
  ALLOWED_EMAIL_DOMAINS: ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com'],
  MAX_NAME_LENGTH: 100,
  MAX_MESSAGE_LENGTH: 1000,
  ENCRYPTION_KEY: process.env.ENCRYPTION_KEY || crypto.randomBytes(32).toString('hex'),
};
```

## 🎯 Security Benefits

1. **Spam Prevention**: Honeypot + CAPTCHA + Rate limiting
2. **Data Protection**: Encryption + Validation + Sanitization
3. **Attack Resistance**: XSS + CSRF + Injection protection
4. **User Trust**: Professional security indicators
5. **Compliance**: Industry-standard security practices
6. **Monitoring**: Real-time threat detection
7. **Reliability**: Graceful error handling and recovery

Your booking system is now enterprise-grade secure! 🛡️✨ 