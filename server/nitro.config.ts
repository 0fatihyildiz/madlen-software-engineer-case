//https://nitro.unjs.io/config
export default defineNitroConfig({
	srcDir: 'src',
	compatibilityDate: "2024-12-09",

	routeRules: {
		'/**': {
			cors: true
		},
	},

	imports: {
		dirs: ['./src/db/**'],
		imports: [
			{ from: 'zod', name: 'z' },
		],
	},

	experimental: {
		openAPI: true,
	},
})