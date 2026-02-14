# Bookmarkly Pro

A modern, elegant bookmark management application built with React, TypeScript, and Supabase. Save, organize, and manage your favorite web links with a beautiful, responsive interface.

![Bookmarkly Pro](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## Features

- Secure Authentication - Google OAuth integration via Supabase
- Bookmark Management - Add, view, and delete bookmarks with ease
- Modern UI - Built with shadcn/ui components
- Dark Mode - Automatic theme support
- Real-time Updates - Instant synchronization with Supabase backend
- Responsive Design - Works on desktop and mobile devices
- Smooth Animations - Micro-interactions powered by Framer Motion

## Tech Stack

- Frontend Framework: React 18 with TypeScript
- Build Tool: Vite
- UI Components: shadcn/ui (Radix UI primitives)
- Styling: Tailwind CSS
- Backend: Supabase (PostgreSQL database and Authentication)
- State Management: TanStack Query (React Query)
- Animations: Framer Motion
- Routing: React Router DOM
- Form Handling: React Hook Form with Zod validation

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v18 or higher) - https://nodejs.org/
- npm or yarn (comes with Node.js)
- Supabase Account - https://supabase.com/

## Installation

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

1. Create a new project in Supabase Dashboard (https://app.supabase.com/)
2. Go to Project Settings → API
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
CREATE TABLE bookmarks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own bookmarks"
  ON bookmarks FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own bookmarks"
  ON bookmarks FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own bookmarks"
  ON bookmarks FOR DELETE
  USING (auth.uid() = user_id);

CREATE INDEX bookmarks_user_id_idx ON bookmarks(user_id);
CREATE INDEX bookmarks_created_at_idx ON bookmarks(created_at DESC);
```

### 6. Configure Google OAuth (Optional)

To enable Google sign-in:

1. Go to Authentication → Providers in Supabase Dashboard
2. Enable Google provider
3. Follow the instructions to set up Google OAuth credentials
4. Add your authorized redirect URLs

## Usage

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

```bash
npm run test
npm run test:watch
```

### Linting

```bash
npm run lint
```

## Project Structure

```
bookmarkly-pro/
├── public/
├── src/
│   ├── components/
│   │   ├── ui/
│   │   ├── Navbar.tsx
│   │   ├── BookmarkForm.tsx
│   │   └── BookmarkList.tsx
│   ├── hooks/
│   ├── integrations/
│   │   └── supabase/
│   ├── lib/
│   ├── pages/
│   │   ├── Dashboard.tsx
│   │   ├── Login.tsx
│   │   └── NotFound.tsx
│   ├── types/
│   ├── App.tsx
│   └── main.tsx
├── .env.example
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── vite.config.ts
```

## Configuration

### Tailwind CSS

Custom Tailwind configuration with:

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

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Deploy to Netlify

1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify
3. Configure environment variables in Netlify dashboard

### Other Platforms

- GitHub Pages
- Cloudflare Pages
- AWS S3 + CloudFront
- Firebase Hosting

## Challenges Faced and Solutions

### Adapting to an All-in-One Backend (Supabase)

One of the initial challenges in this project was adapting to an all-in-one backend platform.

In many previous projects, services such as PostgreSQL and Google Authentication were configured independently. However, in this project, the requirement was to use Supabase to manage everything — database, authentication, and backend services within a single platform.

While Supabase simplifies setup by consolidating services into one ecosystem, it introduced a new workflow that I was not familiar with. Configuring the database and setting up Row Level Security (RLS) policies required a learning curve.

To address this, I went through the Supabase documentation to understand proper database setup, schema design, enabling RLS, and writing secure access policies.

During the setup process, I initially missed a few configuration steps. I used AI assistance (ChatGPT) to cross-verify my configuration and resolve specific issues, which helped ensure everything was implemented correctly.

### OAuth Redirect Issue After Deployment

Another issue surfaced after deployment. The Google OAuth redirect URL was still configured to `http://localhost:3000`, which caused authentication failures in production.

Since the application was deployed on Vercel, the redirect URL needed to be updated in the Supabase Authentication settings to match the deployed domain.

After reviewing the documentation and updating the authorized redirect URL to the production deployment link, the authentication flow worked correctly.

## Contributing

Contributions are welcome. Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgments

- shadcn/ui for UI components
- Supabase for backend infrastructure
- Lucide for icons
- Tailwind CSS for styling

## Contact

For questions or support, please open an issue on GitHub.

Made with care by Nayana
