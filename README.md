# Bazar Sodai

Bazar Sodai is a modern e-commerce platform built with Next.js that combines a clean shopping experience with secure user authentication. The app helps users browse products, track price movements, and access personalized account features with email or social login.

## Technologies Used

- Next.js
- Better Auth
- MongoDB
- Tailwind CSS
- DaisyUI
- JavaScript / JSX

## Key Features

1. Secure Authentication System
   - Email sign-up and sign-in support
   - Protected profile pages and session-based access control
   - Built with Better Auth for reliable user management

2. Social Login Integration
   - Google and GitHub sign-in options
   - Quick onboarding for users without manual registration

3. Product Catalog Experience
   - Product browsing with category-based organization
   - Clean, modern storefront layout optimized for mobile and desktop

4. Price Trend Tracking
   - Highlights products whose prices increased or decreased
   - Helps users make better purchase decisions based on recent trends

5. Personalized User Profiles
   - Users can manage their account details and update profile information
   - A smooth shopping experience with account-aware navigation

## Getting Started

```bash
npm install
npm run dev
```

Then open http://localhost:3000 in your browser.

## Environment Setup

To enable social authentication, configure the following variables in your `.env` file:

```bash
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

This project is designed to provide a polished storefront experience with a secure authentication layer, making it a strong foundation for a real-world online marketplace.
