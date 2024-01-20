import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    important: true,
    theme: {
        screens: {
            'sm': '640px',
            // => @media (min-width: 640px) { ... }

            'md': '768px',
            // => @media (min-width: 768px) { ... }

            'lg': '1024px',
            // => @media (min-width: 1024px) { ... }

            'xl': '1280px',
            // => @media (min-width: 1280px) { ... }

            '2xl': '1536px',
            // => @media (min-width: 1536px) { ... }
        },
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic':
                    'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
            colors: {
                primary: "#001628",
                secondary: "#2B2C28",
                tertiary: "#3C3D3A",
                negative: "#ef4444",
                positive: "#22c55e",
                // gray: "#161b22",
                // darkGray: "#0d1117",
                white: "#fefeff",
                blue: "#157efb",
                //bg #f4f4f5

            },
            blur: {
                xs: '2px',
                lg: '10px',

            }
        },
    },
    plugins: [],
}
export default config
