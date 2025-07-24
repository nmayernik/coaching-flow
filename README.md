# Coaching Session Scheduler

A modern, responsive coaching session scheduling form built with Next.js, React, and Tailwind CSS.

## Features

- **3-Step Progressive Form**: Multi-step accordion-based form with validation
- **Student Selection**: Choose from available students with avatar indicators
- **Category & Topic Selection**: Browse coaching categories and specific topics
- **Scheduling**: Date/time selection with contact information
- **Progress Tracking**: Visual step indicators with completion status
- **Responsive Design**: Mobile-friendly interface with modern UI components

## Tech Stack

- **Next.js 15.2.4** - React framework
- **React** - UI library
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **TypeScript** - Type safety

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd coaching-form
```

2. Install dependencies:
```bash
pnpm install
```

3. Run the development server:
```bash
pnpm dev
```

4. Open [http://localhost:3001](http://localhost:3001) in your browser

## Project Structure

```
coaching-form/
├── app/                    # Next.js app directory
├── components/            
│   ├── CoachingFormAccordion.tsx  # Main form component
│   ├── ui/                # Reusable UI components
│   └── theme-provider.tsx
├── lib/                   # Utilities
├── public/               # Static assets
└── styles/              # Global styles
```

## Design System

The project uses a comprehensive design token system with:
- Primary brand colors (blue palette)
- Success, warning, and error states
- Consistent spacing and typography
- Accessible color contrasts

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Deploy with default settings

### Manual Deployment

```bash
pnpm build
pnpm start
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License. 