import rootHtml from '../public/index.html'

const server = Bun.serve({
	hostname: '0.0.0.0',
	port: Number(Bun.env.PORT ?? 8080),
	routes: {
		'/': rootHtml,
		'/*': new Response('Not found.', { status: 404 }),
	},
})

console.log(`Server running on: ${server.port}`)
