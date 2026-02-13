hosa file create madu

Readme.md anta

# Bookmarkly Pro

A modern, elegant bookmark management application built with React, TypeScript, and Supabase. Save, organize, and manage your favorite web links with a beautiful, responsive interface.

![Bookmarkly Pro](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## ✨ Features

- 🔐 **Secure Authentication** - Google OAuth integration via Supabase
- 📚 **Bookmark Management** - Add, view, and delete bookmarks with ease
- 🎨 **Modern UI** - Beautiful interface built with shadcn/ui components
- 🌙 **Dark Mode** - Automatic theme support
- ⚡ **Real-time Updates** - Instant synchronization with Supabase backend
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile devices
- 🎭 **Smooth Animations** - Delightful micro-interactions with Framer Motion

## 🚀 Tech Stack

- **Frontend Framework:** React 18 with TypeScript
- **Build Tool:** Vite
- **UI Components:** shadcn/ui (Radix UI primitives)
- **Styling:** Tailwind CSS
- **Backend:** Supabase (PostgreSQL database + Authentication)
- **State Management:** TanStack Query (React Query)
- **Animations:** Framer Motion
- **Routing:** React Router DOM
- **Form Handling:** React Hook Form + Zod validation

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** - Comes with Node.js
- **Supabase Account** - [Sign up](https://supabase.com/)

## 🛠️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/Nayana-22/bookmarkly-pro.git
cd bookmarkly-pro
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up Supabase

1. Create a new project in [Supabase Dashboard](https://app.supabase.com/)
2. Go to **Project Settings** → **API**
3. Copy your project credentials

### 4. Configure environment variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Update the `.env` file with your Supabase credentials:

```env
VITE_SUPABASE_PROJECT_ID=your_project_id
VITE_SUPABASE_PUBLISHABLE_KEY=your_publishable_key
VITE_SUPABASE_URL=https://your_project_id.supabase.co
```

### 5. Set up the database

Run the following SQL in your Supabase SQL Editor to create the `bookmarks` table:

```sql
-- Create bookmarks table
CREATE TABLE bookmarks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Enable Row Level Security
ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own bookmarks"
  ON bookmarks FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own bookmarks"
  ON bookmarks FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own bookmarks"
  ON bookmarks FOR DELETE
  USING (auth.uid() = user_id);

-- Create index for better performance
CREATE INDEX bookmarks_user_id_idx ON bookmarks(user_id);
CREATE INDEX bookmarks_created_at_idx ON bookmarks(created_at DESC);
```

### 6. Configure Google OAuth (Optional)

To enable Google sign-in:

1. Go to **Authentication** → **Providers** in Supabase Dashboard
2. Enable **Google** provider
3. Follow the instructions to set up Google OAuth credentials
4. Add your authorized redirect URLs

## 🎯 Usage

### Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

Create an optimized production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

### Testing

Run tests:

```bash
npm run test
```

Run tests in watch mode:

```bash
npm run test:watch
```

### Linting

Check code quality:

```bash
npm run lint
```

## 📁 Project Structure

```
bookmarkly-pro/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable UI components
│   │   ├── ui/         # shadcn/ui components
│   │   ├── Navbar.tsx
│   │   ├── BookmarkForm.tsx
│   │   └── BookmarkList.tsx
│   ├── hooks/          # Custom React hooks
│   ├── integrations/   # Third-party integrations
│   │   └── supabase/   # Supabase client and types
│   ├── lib/            # Utility functions
│   ├── pages/          # Page components
│   │   ├── Dashboard.tsx
│   │   ├── Login.tsx
│   │   └── NotFound.tsx
│   ├── types/          # TypeScript type definitions
│   ├── App.tsx         # Main application component
│   └── main.tsx        # Application entry point
├── .env.example        # Environment variables template
├── package.json        # Project dependencies
├── tailwind.config.ts  # Tailwind CSS configuration
├── tsconfig.json       # TypeScript configuration
└── vite.config.ts      # Vite configuration
```

## 🔧 Configuration

### Tailwind CSS

The project uses a custom Tailwind configuration with:

- Custom color schemes
- Typography plugin
- Animation utilities
- Responsive breakpoints

### TypeScript

Strict TypeScript configuration for type safety and better developer experience.

### Vite

Optimized build configuration with:

- React SWC for fast compilation
- Path aliases for cleaner imports
- Environment variable handling

## 🌐 Deployment

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Nayana-22/bookmarkly-pro)

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Deploy to Netlify

1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify
3. Configure environment variables in Netlify dashboard

### Other Platforms

The application can be deployed to any static hosting service that supports SPA routing:

- GitHub Pages
- Cloudflare Pages
- AWS S3 + CloudFront
- Firebase Hosting

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [Supabase](https://supabase.com/) for the backend infrastructure
- [Lucide](https://lucide.dev/) for the icon set
- [Tailwind CSS](https://tailwindcss.com/) for the styling system

## 📧 Contact

For questions or support, please open an issue on GitHub.

---

Made with ❤️ by [Nayana](https://github.com/Nayana-22)
