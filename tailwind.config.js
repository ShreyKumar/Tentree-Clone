module.exports = {
    content: [
        './src/**/*.{html,js,jsx,ts,tsx}', // Adjust this path based on your project structure
        './public/index.html', // Include paths for your HTML and component files
    ],
    theme: {
        extend: {
            colors: {
                primary: '#2D5548', // Deep green color representing Tentree's brand
                secondary: '#DBA97C', // Earthy beige color for accents
                accent: '#0A3531', // Darker accent green for text or buttons
                background: '#F5F5F5', // Light greyish background color
                textPrimary: '#333333', // Dark gray for body text
                textSecondary: '#666666', // Lighter gray for subtitles or secondary text
                white: '#FFFFFF',
                black: '#000000',
            },
            fontFamily: {
                sans: ['"Helvetica Neue"', 'Arial', 'sans-serif'], // Modern, clean sans-serif fonts
            },
            spacing: {
                18: '4.5rem', // Custom spacing for padding/margins
                22: '5.5rem',
                30: '7.5rem',
            },
            maxWidth: {
                '8xl': '90rem', // Extra wide container for full-width elements
            },
            boxShadow: {
                card: '0 4px 6px rgba(0, 0, 0, 0.1)', // Soft shadow for cards
            },
            borderRadius: {
                '4xl': '2rem', // Custom large border radius for rounded elements
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: 0 },
                    '100%': { opacity: 1 },
                },
            },
            animation: {
                fadeIn: 'fadeIn 1s ease-in-out',
            },
        },
    },
    plugins: [
        require('@tailwindcss/forms'), // For styling form elements
        require('@tailwindcss/typography'), // For better handling of rich text content
        require('@tailwindcss/aspect-ratio'), // Useful for responsive image grids or media
    ],
};
