import { radixThemePreset } from 'radix-themes-tw'

export default {
    presets: [radixThemePreset],
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {},
    },
    plugins: [],
}
