import rootHtml from "../public/index.html"

Bun.serve({
	routes: {
		"/": rootHtml,
		"/*": new Response("Not found.", { status: 404 }),
	},
})
