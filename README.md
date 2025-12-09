<div align="center" markdown="1">

# Elevate

![App Version](https://img.shields.io/github/package-json/version/Abhyudaya-Beyond/Elevate-Resume?label=version)

**Your resume. Your story. Your control.**

A privacy-first resume builder built on consciousness-first design principles. Own your professional narrative with complete data control and institutional-grade credibility.

### [Go to App](https://elevate.local/) | [Documentation](https://github.com/Abhyudaya-Beyond/Elevate-Resume#readme)

</div>

## 🚀 Quick Start

**Get Elevate running in under 60 seconds with Docker.**

### Prerequisites
- Docker Desktop installed and running

### Run It

```bash
git clone https://github.com/Abhyudaya-Beyond/Elevate-Resume.git
cd Elevate-Resume
docker compose -f docker-compose.local.yml up -d --build
```

**Wait 60-90 seconds**, then visit: **http://localhost:3000**

**That's it!** The app is running. See [README_MENTOR.md](./README_MENTOR.md) for the complete setup guide.

---

## Why Elevate?

Most resume builders treat your data as fuel for their algorithms—tracking your usage, selling your information, or locking you into their platform. **Elevate flips that model entirely.**

Elevate is built on the principle that **you should own your professional narrative end-to-end**. Whether you're a student preparing for your first job, a professional switching careers, or working with governments and think tanks, Elevate gives you the tools to create a resume that truly represents you—**without trackers, dark patterns, or data lock-in**.

### Our Core Philosophy

- **Privacy-First**: Your data stays under your control, always
- **Consciousness-First Design**: Built with neurobiological principles for optimal user experience
- **Narrative Control**: Shape your story across multiple versions and contexts
- **Institutional Credibility**: Designed to work with governments, think tanks, and policy makers
- **Signal Strength**: AI-powered suggestions that enhance your impact without compromising your voice

---

## Features

### Privacy & Data Control
- **Free Forever & Open Source** - Completely free to use, forever. Built as open-source software with complete transparency and freedom to modify, distribute, and customize.
- **Zero Tracking & Advertising** - No telemetry, user tracking, or advertising. Your privacy is non-negotiable. We don't track your usage, sell your data, or serve you ads.
- **Complete Data Ownership** - Export your data anytime, anywhere. Your resume data belongs to you, without restrictions or data lock-in.
- **Self-Hostable** - Deploy in under 30 seconds with Docker. Take complete control of your infrastructure and ensure your data never leaves your environment.
- **Offline-First Architecture** - Works offline and on low-connectivity networks. Built for 2G networks, your data stays local and you can work without an internet connection.

### Authentication & Security
- **Flexible Account Creation** - Use your email address (or a throwaway address—no problem), or sign in seamlessly with your GitHub or Google account for quick access.
- **Two-Factor Authentication (2FA)** - Protect your account with time-based one-time passwords (TOTP). Add an extra layer of security to ensure only you can access your professional data.
- **Secure by Default** - Built with modern security best practices and enterprise-grade security standards.

### Resume Creation & Management
- **Unlimited Resume Creation** - Create as many resumes as you need under a single account. Optimize each resume for specific job applications, tailoring your narrative to match job descriptions for higher ATS (Applicant Tracking System) scores.
- **Real-Time Editing** - See changes instantly as you build. No waiting, no delays—your edits appear immediately.
- **Flexible Page Layout** - Create concise single-page resumes for quick scanning, or detailed multi-page resumes that tell your complete professional story. Switch between formats seamlessly.
- **Drag-and-Drop Customization** - Arrange your resume sections exactly how you want with intuitive drag-and-drop functionality. Customize your page layout to highlight what matters most.
- **Custom Section Builder** - Build industry-specific sections tailored to your profession. If standard sections don't fit your industry, create custom sections that reflect your unique career path.
- **Personal Notes System** - Jot down personal notes, reminders, or ideas specific to each resume. These notes are visible only to you and never appear in the final document.
- **Resume Locking** - Lock a resume to prevent accidental edits. Perfect for maintaining master templates or finalized versions while continuing to work on variations.

### AI-Powered Enhancement
- **Bring Your Own OpenAI API Key** - Use your own OpenAI API key, stored securely in your browser. We never see or store your API credentials. You control your AI usage and costs.
- **One-Click Writing Enhancement** - Enhance your writing with a single click. Improve tone, correct spelling and grammar, or adjust the voice to be more confident, professional, or casual—all powered by your own AI.
- **Multi-Language Translation** - Translate your resume into any language using ChatGPT integration and import it back for easier editing. Maintain consistency across language versions while preserving your original formatting.
- **Signal Strength Optimization** - Get intelligent AI suggestions that enhance your professional impact without compromising your authentic voice. Optimize your resume for maximum signal strength.

### Design & Customization
- **17+ Professional Templates** - Choose from a curated collection of templates ranging from modern and creative to traditional and EuroPass-compliant designs. Each template is optimized for different industries and use cases.
- **EuroPass Standard Support** - Create resumes that comply with the European standard EuroPass format, ensuring compatibility with European job applications and ATS systems.
- **Color & Branding Customization** - Personalize your resume with custom color schemes and layouts that match your personal brand or industry standards.
- **Hundreds of Google Fonts** - Choose from hundreds of professional fonts available on Google Fonts. Find the perfect typography that reflects your professional identity.
- **Print-Ready Formats** - Export your resume in standard A4 (international) or Letter (US) page formats. Print-ready PDFs that look perfect on paper.
- **Dark Mode** - Switch to dark mode for comfortable viewing in low-light environments. Reduce eye strain while building your resume.
- **Responsive Design** - Looks great on any device, from desktop to mobile. Your resume builder adapts to your screen size.

### Sharing & Analytics
- **Personalized Share Links** - Generate personalized, shareable links for your resume. Send to companies or recruiters, and they'll always see your latest version automatically.
- **View & Download Tracking** - Track engagement metrics and know when someone views or downloads your public resume. Get insights into how your resume is being received by potential employers.
- **Always Up-to-Date** - When you update your resume, all shared links automatically reflect the latest version. No need to resend links or worry about outdated copies.

### Internationalization
- **50+ Languages** - Available in multiple languages with community-driven translations. Help add or improve translations for your language through our Crowdin integration.
- **Right-to-Left (RTL) Support** - Complete support for right-to-left languages, ensuring proper layout and readability for Arabic, Hebrew, and other RTL languages.

---

## Technology Stack

Elevate is built with modern, battle-tested technologies:

### Frontend
- **React 18** with **Vite** - Lightning-fast development and builds
- **TypeScript** - Type-safe code throughout
- **TailwindCSS** - Utility-first styling
- **Framer Motion** - Smooth, consciousness-first animations
- **Radix UI** - Accessible component primitives

### Backend
- **NestJS** - Scalable, enterprise-grade Node.js framework
- **PostgreSQL** - Robust relational database
- **Prisma ORM** - Type-safe database access
- **Zod** - Runtime type validation

### Infrastructure
- **Minio/S3** - Object storage for avatars, PDFs, and previews
- **Browserless** - Headless Chrome for PDF generation
- **SMTP** - Email delivery for password recovery and notifications
- **Docker** - Containerized deployment

### Internationalization
- **LinguiJS** - i18n framework
- **Crowdin** - Translation management platform

---

## Self-Hosting

Elevate is designed to be self-hosted easily. You have complete control over your data and infrastructure.

### Quick Start with Docker

```bash
docker compose -f docker-compose.local.yml up -d --build
```

### Production Deployment

See [env.production.example](./env.production.example) for production environment configuration.

Key requirements:
- PostgreSQL database
- Minio or S3-compatible storage
- Browserless instance (for PDF generation)
- SMTP server (for email delivery)

---

## Development

### Prerequisites
- Node.js 22.13.1 or higher
- pnpm 10.20.0 or higher
- Docker (for local services)

### Setup

```bash
# Clone the repository
git clone https://github.com/Abhyudaya-Beyond/Elevate-Resume.git
cd Elevate-Resume

# Install dependencies
pnpm install

# Start development services
docker compose -f tools/compose/development.yml up -d

# Run database migrations
pnpm prisma:migrate:dev

# Start development server
pnpm dev
```

The frontend will be available at `http://localhost:5173` and the API at `http://localhost:3000`.

---

## License

Elevate is open-source software. See [LICENSE](./LICENSE) for details.

---

## Support

- **Documentation**: [GitHub Wiki](https://github.com/Abhyudaya-Beyond/Elevate-Resume/wiki)
- **Issues**: [GitHub Issues](https://github.com/Abhyudaya-Beyond/Elevate-Resume/issues)
- **Email**: support@elevate.local

---

## Acknowledgments

Elevate is built with privacy, control, and user empowerment at its core. We believe that your professional narrative belongs to you, and you should have complete ownership over how it's created, shared, and stored.

**Your resume. Your story. Your control.**

---

<div align="center">

Made with ❤️ by the Elevate Team

[⭐ Star us on GitHub](https://github.com/Abhyudaya-Beyond/Elevate-Resume) • [🐛 Report a Bug](https://github.com/Abhyudaya-Beyond/Elevate-Resume/issues) • [💡 Request a Feature](https://github.com/Abhyudaya-Beyond/Elevate-Resume/issues)

</div>
