const API_ROOT = '/api'

export const API_ROUTES = {
	[`${API_ROOT}/status`]: () =>
		new Response(JSON.stringify({ status: 'ok' }), {
			headers: { 'Content-Type': 'application/json' },
		}),
	[`${API_ROOT}/hello`]: (req: Request) => new Response('Hello from API!'),
	// Add more API endpoints here...
}
