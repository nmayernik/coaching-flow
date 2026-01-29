import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/bhds-react-monorepo/packages/bhds-react/src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
  	extend: {
  		fontFamily: {
  			sans: ['Mulish', 'sans-serif'],
  		},
  		colors: {
  			// Existing shadcn/ui colors
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			},
  			// BHDS design tokens (from @bh-enterpriseux/bhds-styles)
  			base: {
  				white: 'var(--bhds-colors-common-white)',
  				black: 'var(--bhds-colors-common-black)'
  			},
  			gray: {
  				25: 'var(--bhds-colors-gray-25)',
  				50: 'var(--bhds-colors-gray-50)',
  				100: 'var(--bhds-colors-gray-100)',
  				200: 'var(--bhds-colors-gray-200)',
  				300: 'var(--bhds-colors-gray-300)',
  				400: 'var(--bhds-colors-gray-400)',
  				500: 'var(--bhds-colors-gray-500)',
  				600: 'var(--bhds-colors-gray-600)',
  				700: 'var(--bhds-colors-gray-700)',
  				800: 'var(--bhds-colors-gray-800)',
  				850: 'var(--bhds-colors-gray-850)'
  			},
  			blue: {
  				25: 'var(--bhds-colors-blue-25)',
  				50: 'var(--bhds-colors-blue-50)',
  				100: 'var(--bhds-colors-blue-100)',
  				200: 'var(--bhds-colors-blue-200)',
  				300: 'var(--bhds-colors-blue-300)',
  				400: 'var(--bhds-colors-blue-400)',
  				500: 'var(--bhds-colors-blue-500)',
  				600: 'var(--bhds-colors-blue-600)',
  				700: 'var(--bhds-colors-blue-700)',
  				800: 'var(--bhds-colors-blue-800)',
  				850: 'var(--bhds-colors-blue-850)'
  			},
  			yellow: {
  				25: 'var(--bhds-colors-yellow-25)',
  				50: 'var(--bhds-colors-yellow-50)',
  				100: 'var(--bhds-colors-yellow-100)',
  				200: 'var(--bhds-colors-yellow-200)',
  				300: 'var(--bhds-colors-yellow-300)',
  				400: 'var(--bhds-colors-yellow-400)',
  				500: 'var(--bhds-colors-yellow-500)',
  				600: 'var(--bhds-colors-yellow-600)',
  				700: 'var(--bhds-colors-yellow-700)',
  				800: 'var(--bhds-colors-yellow-800)',
  				850: 'var(--bhds-colors-yellow-850)'
  			},
  			warning: {
  				25: 'var(--bhds-colors-yellow-25)',
  				50: 'var(--bhds-colors-yellow-50)',
  				100: 'var(--bhds-colors-yellow-100)',
  				200: 'var(--bhds-colors-yellow-200)',
  				300: 'var(--bhds-colors-yellow-300)',
  				400: 'var(--bhds-colors-yellow-400)',
  				500: 'var(--bhds-colors-yellow-500)',
  				600: 'var(--bhds-colors-yellow-600)',
  				700: 'var(--bhds-colors-yellow-700)',
  				800: 'var(--bhds-colors-yellow-800)',
  				850: 'var(--bhds-colors-yellow-850)'
  			},
  			red: {
  				25: 'var(--bhds-colors-red-25)',
  				50: 'var(--bhds-colors-red-50)',
  				100: 'var(--bhds-colors-red-100)',
  				200: 'var(--bhds-colors-red-200)',
  				300: 'var(--bhds-colors-red-300)',
  				400: 'var(--bhds-colors-red-400)',
  				500: 'var(--bhds-colors-red-500)',
  				600: 'var(--bhds-colors-red-600)',
  				700: 'var(--bhds-colors-red-700)',
  				800: 'var(--bhds-colors-red-800)',
  				850: 'var(--bhds-colors-red-850)'
  			},
  			success: {
  				25: 'var(--bhds-colors-green-25)',
  				50: 'var(--bhds-colors-green-50)',
  				100: 'var(--bhds-colors-green-100)',
  				200: 'var(--bhds-colors-green-200)',
  				300: 'var(--bhds-colors-green-300)',
  				400: 'var(--bhds-colors-green-400)',
  				500: 'var(--bhds-colors-green-500)',
  				600: 'var(--bhds-colors-green-600)',
  				700: 'var(--bhds-colors-green-700)',
  				800: 'var(--bhds-colors-green-800)',
  				850: 'var(--bhds-colors-green-850)'
  			},
  			purple: {
  				25: 'var(--bhds-colors-purple-25)',
  				50: 'var(--bhds-colors-purple-50)',
  				100: 'var(--bhds-colors-purple-100)',
  				200: 'var(--bhds-colors-purple-200)',
  				300: 'var(--bhds-colors-purple-300)',
  				400: 'var(--bhds-colors-purple-400)',
  				500: 'var(--bhds-colors-purple-500)',
  				600: 'var(--bhds-colors-purple-600)',
  				700: 'var(--bhds-colors-purple-700)',
  				800: 'var(--bhds-colors-purple-800)',
  				900: 'var(--bhds-colors-purple-900)'
  			},
  			'orange-dark': {
  				25: 'var(--bhds-colors-orange-25)',
  				50: 'var(--bhds-colors-orange-50)',
  				100: 'var(--bhds-colors-orange-100)',
  				200: 'var(--bhds-colors-orange-200)',
  				300: 'var(--bhds-colors-orange-300)',
  				400: 'var(--bhds-colors-orange-400)',
  				500: 'var(--bhds-colors-orange-500)',
  				600: 'var(--bhds-colors-orange-600)',
  				700: 'var(--bhds-colors-orange-700)',
  				800: 'var(--bhds-colors-orange-800)',
  				850: 'var(--bhds-colors-orange-850)'
  			},
  			gold: {
  				25: 'var(--bhds-colors-gold-25)',
  				50: 'var(--bhds-colors-gold-50)',
  				100: 'var(--bhds-colors-gold-100)',
  				200: 'var(--bhds-colors-gold-200)',
  				300: 'var(--bhds-colors-gold-300)',
  				400: 'var(--bhds-colors-gold-400)',
  				500: 'var(--bhds-colors-gold-500)',
  				600: 'var(--bhds-colors-gold-600)',
  				700: 'var(--bhds-colors-gold-700)',
  				800: 'var(--bhds-colors-gold-800)',
  				850: 'var(--bhds-colors-gold-850)'
  			},
  			green: {
  				25: 'var(--bhds-colors-emerald-25)',
  				50: 'var(--bhds-colors-emerald-50)',
  				100: 'var(--bhds-colors-emerald-100)',
  				200: 'var(--bhds-colors-emerald-200)',
  				300: 'var(--bhds-colors-emerald-300)',
  				400: 'var(--bhds-colors-emerald-400)',
  				500: 'var(--bhds-colors-emerald-500)',
  				600: 'var(--bhds-colors-emerald-600)',
  				700: 'var(--bhds-colors-emerald-700)',
  				800: 'var(--bhds-colors-emerald-800)',
  				850: 'var(--bhds-colors-emerald-850)'
  			},
  			teal: {
  				25: 'var(--bhds-colors-teal-25)',
  				50: 'var(--bhds-colors-teal-50)',
  				100: 'var(--bhds-colors-teal-100)',
  				200: 'var(--bhds-colors-teal-200)',
  				300: 'var(--bhds-colors-teal-300)',
  				400: 'var(--bhds-colors-teal-400)',
  				500: 'var(--bhds-colors-teal-500)',
  				600: 'var(--bhds-colors-teal-600)',
  				700: 'var(--bhds-colors-teal-700)',
  				800: 'var(--bhds-colors-teal-800)',
  				900: 'var(--bhds-colors-teal-900)'
  			},
  			'blue-light': {
  				25: 'var(--bhds-colors-teal-25)',
  				50: 'var(--bhds-colors-teal-50)',
  				100: 'var(--bhds-colors-teal-100)',
  				200: 'var(--bhds-colors-teal-200)',
  				300: 'var(--bhds-colors-teal-300)',
  				400: 'var(--bhds-colors-teal-400)',
  				500: 'var(--bhds-colors-teal-500)',
  				600: 'var(--bhds-colors-teal-600)',
  				700: 'var(--bhds-colors-teal-700)',
  				800: 'var(--bhds-colors-teal-800)',
  				900: 'var(--bhds-colors-teal-900)'
  			},
  			// Magenta (BHDS)
  			magenta: {
  				100: '#F7D4E2',
  				700: '#821741'
  			},
  			// BHDS semantic tokens
  			'action-secondary-background-default': 'var(--bhds-semantic-action-secondary-background-default)',
  			'action-secondary-background-hover': 'var(--bhds-semantic-action-secondary-background-hover)',
  			'action-secondary-border-default': 'var(--bhds-semantic-action-secondary-border-default)',
  			'action-secondary-foreground-default': 'var(--bhds-semantic-action-secondary-foreground-default)',
  			'state-disabled-subtle-background': 'var(--bhds-semantic-state-disabled-subtle-background)',
  			'state-disabled-border': 'var(--bhds-semantic-state-disabled-border)',
  			'state-disabled-foreground': 'var(--bhds-semantic-state-disabled-foreground)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
