/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ['class'],
    content: [
        './pages/**/*.{ts,tsx}',
        './components/**/*.{ts,tsx}',
        './app/**/*.{ts,tsx}',
        './src/**/*.{ts,tsx}',
    ],
    theme: {
        container: {
            center: true,
            padding: '2rem',
            screens: {
                '2xl': '1400px',
            },
        },
        extend: {
            keyframes: {
                'accordion-down': {
                    from: { height: 0 },
                    to: { height: 'var(--radix-accordion-content-height)' },
                },
                'accordion-up': {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: 0 },
                },
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
            },
            colors: {
                primary: '#252329',
                sidebar: '#120F13',
                'search-bar': '#3C393F',
                'lighter-gray': '#F2F2F2',
                'light-gray': '#E0E0E0',
                'medium-gray': '#828282',
                'mild-gray': '#BDBDBD',
                'dark-gray': '#252329',
                'black-bg': '#0B090C',
                'blue-btn': '#2F80ED',
                'logout-btn': '#EB5757',
                'modal-backdrop': 'rgba(18, 15, 19, 0.50)',
            },
            boxShadow: {
                'top-bar': '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
            },
            letterSpacing: {
                base: '-0.63px',
            },
        },
    },
    plugins: [import('tailwindcss-animate')],
}
