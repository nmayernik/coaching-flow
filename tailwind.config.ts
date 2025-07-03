import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}"
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
  			// Design system colors from JSON tokens
  			base: {
  				white: '#ffffff',
  				black: '#000000'
  			},
  			gray: {
  				25: '#fafafa',
  				50: '#f2f2f2',
  				100: '#dddddd',
  				200: '#c8c8c8',
  				300: '#b3b3b3',
  				400: '#8c8c8c',
  				500: '#808080',
  				600: '#707070',
  				700: '#464646',
  				800: '#333333',
  				850: '#141823'
  			},
  			blue: {
  				25: '#f7fbfd',
  				50: '#ebf4fa',
  				100: '#d7eaf4',
  				200: '#afd5e9',
  				300: '#87c0de',
  				400: '#5fabd3',
  				500: '#3796c8',
  				600: '#2c78a0',
  				700: '#215a78',
  				800: '#1a475f',
  				850: '#102d3c'
  			},
  			yellow: {
  				25: '#fefcf5',
  				50: '#fdf8e7',
  				100: '#fcf1cf',
  				200: '#f9e39f',
  				300: '#f6d56f',
  				400: '#f2c840',
  				500: '#f0bd1b',
  				600: '#bf950d',
  				700: '#907009',
  				800: '#604a06',
  				850: '#483805'
  			},
  			warning: {
  				25: '#fefcf5',
  				50: '#fdf8e7',
  				100: '#fcf1cf',
  				200: '#f9e39f',
  				300: '#f6d56f',
  				400: '#f2c840',
  				500: '#f0bd1b',
  				600: '#bf950d',
  				700: '#907009',
  				800: '#604a06',
  				850: '#483805'
  			},
  			red: {
  				25: '#fef3f3',
  				50: '#fde7e7',
  				100: '#fbd0d0',
  				200: '#f7a1a1',
  				300: '#f47171',
  				400: '#f04242',
  				500: '#d21111',
  				600: '#bd0f0f',
  				700: '#8e0b0b',
  				800: '#5e0808',
  				850: '#470606'
  			},
  			success: {
  				25: '#fafcf8',
  				50: '#f1f7ee',
  				100: '#e4efdc',
  				200: '#c9dfb9',
  				300: '#adce97',
  				400: '#92be74',
  				500: '#74aa50',
  				600: '#5f8b41',
  				700: '#476831',
  				800: '#304521',
  				850: '#243418'
  			},
  			purple: {
  				25: '#fcfcfd',
  				50: '#f2eff5',
  				100: '#e4dfec',
  				200: '#c9c0d8',
  				300: '#afa0c5',
  				400: '#907caf',
  				500: '#7e649a',
  				600: '#6d4d85',
  				700: '#5b3570',
  				800: '#382145',
  				900: '#2a1934'
  			},
  			'orange-dark': {
  				25: '#fef9f6',
  				50: '#fcf1e9',
  				100: '#f9e3d2',
  				200: '#f2c6a6',
  				300: '#ecaa79',
  				400: '#e68d4c',
  				500: '#dc6f1f',
  				600: '#b35a19',
  				700: '#864413',
  				800: '#592d0d',
  				850: '#432209'
  			},
  			gold: {
  				25: '#fffdfa',
  				50: '#fff7e5',
  				100: '#fff0cc',
  				200: '#ffe099',
  				300: '#ffd166',
  				400: '#ffc133',
  				500: '#f2a900',
  				600: '#cc8e00',
  				700: '#996b00',
  				800: '#664700',
  				850: '#4d3500'
  			},
  			green: {
  				25: '#fbfdfc',
  				50: '#e5f4ec',
  				100: '#c0e4d1',
  				200: '#97d3b4',
  				300: '#6bc398',
  				400: '#47b783',
  				500: '#15aa6e',
  				600: '#0d9b63',
  				700: '#048956',
  				800: '#01784a',
  				850: '#005835'
  			},
  			'blue-light': {
  				25: '#fbfdfe',
  				50: '#ebf7fa',
  				100: '#d6f0f5',
  				200: '#ade0eb',
  				300: '#95d7e5',
  				400: '#75c3d8',
  				500: '#54afcb',
  				600: '#3e92aa',
  				700: '#277489',
  				800: '#17434f',
  				900: '#11323c'
  			}
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
