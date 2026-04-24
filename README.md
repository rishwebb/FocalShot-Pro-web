# FocalShot Pro Web

A modern, high-impact promotional website for **FocalShot Pro** with dynamic phone showcase animations, legal/info pages, and a WhatsApp-first contact flow.

## Highlights

- Bold hero section with animated multi-phone mockup carousel
- Fully responsive layouts for desktop, tablet, and mobile
- Branded header with custom app logo + favicon
- Direct **Google Play** CTA button
- Contact form that opens WhatsApp with prefilled user details
- Dedicated Privacy Policy, Terms & Conditions, and Contact pages

## Live Page Structure

- `index.html` - Home / landing experience
- `privacy.html` - Privacy Policy
- `terms.html` - Terms & Conditions
- `contact.html` - Contact form (WhatsApp prefill)
- `assets/css/styles.css` - Shared styles + responsive behavior
- `assets/js/main.js` - Animations, scroll reveal, footer year, contact handling

## Contact Form -> WhatsApp Flow

On submit, the contact form:

1. Validates required fields.
2. Builds a structured message including:
   - Name
   - Email
   - Subject
   - Message
3. Opens WhatsApp chat with your prefilled message ready to send.

Configured recipient number:

- `+91 9734687196`

## Local Development

This is a static site, so you can run it with any local static server.

Example (Python):

```bash
cd /home/rishav/Downloads/skull
python3 -m http.server 8080
```

Then open:

- `http://localhost:8080`

## Design Notes

- Visual language: warm yellow base, strong typography, premium rounded UI
- Mobile navigation is optimized for compact two-row readability
- Phone showcase transitions use preloading + synchronized frame swaps to reduce flicker

## Tech Stack

- HTML5
- CSS3 (custom responsive styling)
- Vanilla JavaScript
- Font Awesome + Google Fonts

## Author

Built for **Rishav Biswas** and the **FocalShot Pro** brand.
