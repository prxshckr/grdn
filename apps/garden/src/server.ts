import { resolve } from 'node:path'
import rootHtml from '../public/index.html'
import { API_ROUTES } from './server/api/index'

const server = Bun.serve({
	hostname: '0.0.0.0',
	port: Number(Bun.env.PORT ?? 8080),
	routes: {
		'/': rootHtml,
		...API_ROUTES,
		'/*': (req) => {
			const url = new URL(req.url)
			const path = `${resolve(import.meta.dirname, '..')}/public/${url.pathname}`
			return new Response(Bun.file(path))
		},
	},
})

console.log(`Server running on: ${server.port}`)
