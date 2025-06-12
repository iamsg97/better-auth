import { auth } from "./lib/auth";

const PORT = process.env.PORT || 4000;

Bun.serve({
	fetch(req) {
		// Add CORS headers for preflight requests
		if (req.method === "OPTIONS") {
			return new Response(null, {
				headers: {
					"Access-Control-Allow-Origin": "http://localhost:3000",
					"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
					"Access-Control-Allow-Headers": "Content-Type, Authorization",
					"Access-Control-Allow-Credentials": "true",
				},
			});
		}

		return auth.handler(req);
	},
	port: PORT,
});
console.log(`Server running on port ${PORT}`);
