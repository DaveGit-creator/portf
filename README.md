# My Portfolio Website

A fully responsive, modern portfolio website showcasing your projects, skills, and experience.

## 📁 Project Structure

```
portf/
├── index.html          # Home page
├── about.html          # About & Education page
├── work.html           # Projects showcase page
├── contact.html        # Contact & Contact form page
├── styles.css          # All styling and responsive design
├── script.js           # Interactive features and functionality
└── README.md          # This file
```

## 🚀 Features

### ✅ Complete
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **4 Main Pages**:
  - **Home**: Hero section, current roles, work experience, featured projects, skills
  - **About**: Personal introduction, timeline, education, interests
  - **Work**: Project portfolio with filtering capabilities
  - **Contact**: Contact information, social links, and contact form

- **Interactive Elements**:
  - Mobile hamburger menu
  - Smooth scrolling navigation
  - Project filtering by category
  - Contact form with validation
  - Scroll-to-top button
  - Hover animations and transitions

- **Professional Design**:
  - Modern color scheme with gradient accents
  - Consistent typography and spacing
  - Clear visual hierarchy
  - Accessible and semantic HTML

## 🎨 Customization Guide

### 1. **Update Personal Information**

In **index.html**, **about.html**, **work.html**, and **contact.html**:
- Replace "Your Name" with your actual name
- Update your title/subtitle in the hero section
- Add your actual bio and descriptions

### 2. **Add Your Contact Information**

In **contact.html**:
- Replace placeholder email: `your.email@example.com`
- Replace phone number: `+1 (234) 567-8900`
- Update location: `City, State, Country`

### 3. **Add Social Media Links**

In all pages (footer and contact page):
- Update GitHub link: Change `https://github.com` to your profile
- Update LinkedIn: Change `https://linkedin.com` to your profile
- Update Twitter: Change `https://twitter.com` to your profile
- Update Instagram: Change `https://instagram.com` to your profile

### 4. **Update Experience & Education**

In **index.html**:
- Edit job titles, companies, and dates in the "Recent Work Experience" section
- Update featured projects with real project information

In **about.html**:
- Update your background story in the timeline
- Replace university and certification details in the education section

### 5. **Add Your Projects**

In **work.html**:
- Edit project titles, descriptions, and technologies
- Update GitHub and live demo links
- Modify or remove projects as needed
- Change `data-category` to organize projects (web, mobile, design, etc.)

### 6. **Update Skills**

In **index.html**:
- Replace skill tags in the Frontend, Backend, and Tools categories
- Add or remove skills as needed

## 📱 Responsive Design Breakpoints

- **Desktop**: 1200px and above
- **Tablet**: 768px to 1199px
- **Mobile**: Below 768px
- **Small Mobile**: Below 480px

## 🎯 Key Sections

### Home Page (`index.html`)
- Hero section with call-to-action buttons
- Current roles cards
- Recent work experience timeline
- Featured projects grid
- Skills section organized by category
- Newsletter/CTA section

### About Page (`about.html`)
- Personal introduction with image placeholder
- Journey timeline
- Education cards with details
- Interests and passions grid

### Work Page (`work.html`)
- Project filtering buttons
- Project cards with technology badges
- GitHub and live demo links
- Category filtering functionality

### Contact Page (`contact.html`)
- Contact information cards
- Social media links
- Contact form with validation
- Response time expectations

## 🔧 How to Use

1. **Download/Clone** this project to your computer
2. **Open** any HTML file in your web browser (or use a local server)
3. **Customize** the content with your information
4. **Update** links and social media profiles
5. **Deploy** to GitHub Pages, Netlify, Vercel, or any web hosting service

### Quick Start

#### Option 1: Local Development
```bash
# Simply open index.html in your browser
# Or use a local server (Python)
python -m http.server 8000

# Then visit http://localhost:8000
```

#### Option 2: Deploy to GitHub Pages
1. Push this repository to GitHub
2. Go to Settings → Pages
3. Select main branch as source
4. Your site will be available at `username.github.io/portf`

## 🎨 Color Scheme

The website uses a modern color palette:
- **Primary**: `#6366f1` (Indigo)
- **Secondary**: `#8b5cf6` (Purple)
- **Accent**: `#ec4899` (Pink)
- **Dark**: `#0f172a` (Almost Black)
- **Light**: `#f8fafc` (Off White)

You can customize these in `styles.css` by modifying the CSS variables in the `:root` selector.

## 📝 Form Handling

The contact form now submits to a backend API and can send real email notifications.

### Backend Setup
1. Copy `.env.example` to `.env`
2. Set your SMTP values:
   - `SMTP_HOST`
   - `SMTP_PORT`
   - `SMTP_SECURE`
   - `SMTP_USER`
   - `SMTP_PASS`
   - `SMTP_FROM`
   - `CONTACT_TO_EMAIL`
3. Install dependencies and start the server:
```bash
npm install
npm start
```

### What changed
- Added `server.js` to handle `/api/contact`
- Added `package.json` for Node dependencies
- Updated `script.js` so the form sends data to the backend

## 🚀 Deployment Options

## ⚙️ Backend & Database Setup

Requirements:
- Node.js 18+ and npm
- MySQL server (or compatible)

1. Copy `.env.example` to `.env` and fill values:

```
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@example.com
SMTP_PASS=your-email-password
SMTP_FROM=portfolio@example.com
CONTACT_TO_EMAIL=you@example.com
DB_HOST=localhost
DB_USER=root
DB_PASS=your_db_password
DB_NAME=portfolio
JWT_SECRET=your_jwt_secret
```

2. Install dependencies and run migrations (create database/schema):

```bash
npm install
# create the database and run schema SQL (example using mysql CLI)
mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS portfolio;"
mysql -u root -p portfolio < sql/schema.sql
mysql -u root -p portfolio < sql/seed.sql
```

3. Start the server locally:

```bash
npm start
# or for development
npm run dev
```

4. Contact form endpoint: `POST /api/contact` — the frontend already posts here.

5. Authentication (demo): `POST /api/auth/login` accepts `email` and `password` (see `sql/seed.sql` demo user).

Security notes:
- This project includes demo/placeholder authentication and seed data — update password handling and secrets before production.


### GitHub Pages (Free)
1. Push to GitHub
2. Enable Pages in repository settings
3. Live in minutes at username.github.io

### Netlify (Free)
1. Connect GitHub repo
2. Auto-deploys on push
3. Custom domain support

### Vercel (Free)
1. Import project
2. Auto-deploys
3. Fast CDN

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## ✨ Tips for Best Results

1. **Add a profile photo**: Replace the avatar placeholder with your actual photo
2. **Use real project descriptions**: Make descriptions engaging and specific
3. **Keep content updated**: Regularly update your work and skills
4. **Test responsiveness**: Check your site on different devices
5. **SEO optimization**: Add meta descriptions and keywords
6. **Fast loading**: Optimize images before uploading
7. **Regular backups**: Keep a local copy of your changes

## 🐛 Troubleshooting

### Mobile menu not working?
- Check that JavaScript is enabled in your browser
- Verify script.js is in the same directory

### Form not submitting?
- Check browser console for errors (F12)
- Ensure form fields have correct `name` attributes
- Implement a backend service for actual email sending

### Styling looks broken?
- Clear browser cache (Ctrl+Shift+Delete)
- Verify styles.css is in the same directory
- Check file paths for external resources

## 📚 Resources

- [MDN Web Docs](https://developer.mozilla.org/)
- [CSS Tricks](https://css-tricks.com/)
- [Font Awesome Icons](https://fontawesome.com/)
- [Google Fonts](https://fonts.google.com/)

## 📄 License

Feel free to use this template for your personal portfolio. Customize it as needed!

## 💡 Next Steps

1. Replace all placeholder content with your information
2. Add your actual projects and descriptions
3. Update all social media and contact links
4. Test on different devices and browsers
5. Deploy to a hosting service
6. Share your portfolio!

---

**Made with ❤️ and code. Good luck with your portfolio!**
