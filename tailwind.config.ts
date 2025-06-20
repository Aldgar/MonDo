/* eslint-disable @typescript-eslint/no-require-imports */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	container: {
		center: true,
  		padding: '2rem',
  		screens: {
  			'2xl': '1400px'
  		}
  	},
	  fontSize: {
		'heading1-bold': ["36px", { lineHeight: "140%" }],
		'heading1-semibold': ["36px", { lineHeight: "140%" }],
		'heading2-bold': ["30px", { lineHeight: "140%" }],
		'heading2-semibold': ["30px", { lineHeight: "140%" }],
		'heading3-bold': ["24px", { lineHeight: "140%" }],
		'heading4-medium': ["20px", { lineHeight: "140%" }],
		'body-bold': ["18px", { lineHeight: "140%" }],
		'body-semibold': ["18px", { lineHeight: "140%" }],
		'body-medium': ["18px", { lineHeight: "140%" }],
		'body-normal': ["18px", { lineHeight: "140%" }],
		'body1-bold': ["18px", { lineHeight: "140%" }],
		'base-regular': ["16px", { lineHeight: "140%" }],
		'base-medium': ["16px", { lineHeight: "140%" }],
		'base-semibold': ["16px", { lineHeight: "140%" }],
		'base1-semibold': ["16px", { lineHeight: "140%" }],
		'small-regular': ["14px", { lineHeight: "140%" }],
		'small-medium': ["14px", { lineHeight: "140%" }],
		'small-semibold': ["14px", { lineHeight: "140%" }],
		'subtle-medium': ["12px", { lineHeight: "16px" }],
		'subtle-semibold': ["12px", { lineHeight: "16px" }],
		'tiny-medium': ["10px", { lineHeight: "140%" }],
		'x-small-semibold': ["7px", { lineHeight: "9.318px" }],
	  },
  	extend: {
  		colors: {
  			'primary-500': '#877EFF',
  			'secondary-500': '#FFB620',
  			blue: '#0095F6',
  			'logout-btn': '#FF5A5A',
  			'navbar-menu': 'rgba(16, 16, 18, 0.6)',
  			'dark-1': '#000000',
  			'dark-2': '#121417',
  			'dark-3': '#101012',
  			'dark-4': '#1F1F22',
  			'light-1': '#FFFFFF',
  			'light-2': '#EFEFEF',
  			'light-3': '#7878A3',
  			'light-4': '#5C5C7B',
  			'gray-1': '#697C89',
  			glassmorphism: 'rgba(16, 16, 18, 0.60)'
  		},
  		boxShadow: {
  			'count-badge': '0px 0px 6px 2px rgba(219, 188, 159, 0.30)',
  			'groups-sidebar': '-30px 0px 60px 0px rgba(28, 28, 31, 0.50)'
  		},
  		screens: {
  			xs: '400px'
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
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
