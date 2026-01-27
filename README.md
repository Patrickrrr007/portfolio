# Pat's Portfolio

A modern, responsive portfolio website with smooth animations and clean design.

## 🚀 Quick Deploy to Netlify

### Method 1: Drag & Drop (Easiest)
1. Go to [Netlify](https://app.netlify.com/)
2. Sign up or log in
3. Drag and drop the entire `portfolio-netlify` folder to Netlify
4. Done! Your site is live 🎉

### Method 2: GitHub + Netlify (Recommended)
1. Create a new GitHub repository
2. Push this folder to your repo:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin YOUR_REPO_URL
   git push -u origin main
   ```
3. Go to [Netlify](https://app.netlify.com/)
4. Click "New site from Git"
5. Connect your GitHub repository
6. Deploy settings:
   - Build command: (leave empty)
   - Publish directory: (leave empty or use `.`)
7. Click "Deploy site"

## 📝 Customization

### Update Your Information
Edit `index.html` and replace:

1. **Personal Info** (around line 200):
   - Your name in the hero section
   - Your tagline/description

2. **Projects** (around line 250):
   - Update project titles, descriptions, and tags
   - Add your actual project links
   - Replace placeholder projects with your own

3. **Social Links** (around line 450):
   - Replace email: `your.email@example.com`
   - Replace GitHub: `https://github.com/yourusername`
   - Replace LinkedIn: `https://linkedin.com/in/yourprofile`
   - Replace Twitter: `https://twitter.com/yourusername`

4. **Skills** (around line 380):
   - Add or remove skill badges as needed

### Change Colors
The site uses a purple gradient theme. To change colors, find and replace in `index.html`:
- Purple: `#667eea` and `#764ba2`
- You can use any color picker to find your preferred colors

## 🎨 Features

- ✨ Smooth scroll animations
- 🎯 Project filtering (All, Web, AI)
- 📱 Fully responsive design
- 🌙 Dark theme
- 💫 Gradient effects
- 📧 Contact form (frontend only - needs backend for actual email sending)

## 📦 File Structure

```
portfolio-netlify/
├── index.html          # Main website file
├── netlify.toml        # Netlify configuration
└── README.md          # This file
```

## 🔧 Advanced: Adding Backend for Contact Form

The contact form currently shows an alert. To make it actually send emails:

1. **Option 1: Netlify Forms**
   - Add `data-netlify="true"` to the `<form>` tag
   - Netlify will handle form submissions automatically

2. **Option 2: FormSpree**
   - Sign up at [formspree.io](https://formspree.io/)
   - Update form action to your FormSpree endpoint

3. **Option 3: EmailJS**
   - Sign up at [emailjs.com](https://www.emailjs.com/)
   - Add their SDK and configure

## 📱 Testing Locally

Simply open `index.html` in your browser to preview the site locally.

## 🌐 Custom Domain

After deploying to Netlify:
1. Go to Site Settings > Domain Management
2. Add your custom domain
3. Follow Netlify's instructions to configure DNS

## 📄 License

Feel free to use this template for your own portfolio!

---

Made with ❤️ and lots of ☕
# portfolio
