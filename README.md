# Panchshil Next.js Project.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app), complete with all essential development tools and configurations.

## 🚀 Features

- ⚛️ **Next.js 16** with App Router
- 📘 **TypeScript** for type safety
- 🎨 **Tailwind CSS** for styling
- 🔍 **ESLint** for code linting
- 💅 **Prettier** for code formatting
- 🪝 **Husky** for Git hooks
- 📝 **lint-staged** for pre-commit checks
- 🔐 **Environment variables** setup
- 📦 **Modern tooling** with optimized configurations

## 📋 Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

## 🛠️ Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd Panchshil-nextjs
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration values.

4. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Run ESLint and auto-fix issues
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run type-check` - Run TypeScript type checking

## 🎯 Project Structure

```
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── public/                 # Static assets
├── .husky/                # Git hooks
├── eslint.config.mjs      # ESLint configuration
├── .prettierrc            # Prettier configuration
├── next.config.ts         # Next.js configuration
├── tsconfig.json          # TypeScript configuration
└── tailwind.config.ts     # Tailwind CSS configuration
```

## 🔐 Environment Variables

Copy `.env.example` to `.env.local` and fill in your values:

- `DATABASE_URL` - Database connection string
- `NEXT_PUBLIC_API_URL` - Public API endpoint
- `NEXTAUTH_SECRET` - NextAuth secret key
- `NEXTAUTH_URL` - NextAuth URL
- `API_KEY` - Third-party API key

## 🎨 Code Quality

This project uses several tools to maintain code quality:

### ESLint

Configured with Next.js rules for React and TypeScript.

### Prettier

Automatically formats code on save and before commits.

### Husky

Git hooks that run:

- **pre-commit**: Runs lint-staged to format and lint staged files
- **pre-push**: Runs ESLint to ensure code quality

### TypeScript

Strict type checking enabled for better code quality.

## 📚 Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## 🚢 Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## 📄 License

This project is private.
