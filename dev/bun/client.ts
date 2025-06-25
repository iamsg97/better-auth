import { logger } from "better-auth";

const cookies = new Bun.CookieMap();

// const signUpResponse = await fetch(
// 	`http://localhost:4000/api/auth/sign-up/email`,
// 	{
// 		method: "POST",
// 		body: JSON.stringify({
// 			email: "sgzoid97@gmail.com",
// 			password: "Argha@003026",
// 			name: "Suvadeep Ghoshal",
// 			image: "",
// 			callbackURL: "/dashboard",
// 		}),
// 		headers: {
// 			"content-type": "application/json",
// 		},
// 	},
// );

// console.log(
// 	`Sign-up response: ${JSON.stringify(await signUpResponse.json(), null, 2)}`,
// );

// Helper function to extract cookies from response headers
function extractCookiesFromResponse(response: Response) {
	const setCookieHeaders =
		response.headers.getSetCookie?.() ||
		[response.headers.get("Set-Cookie")].filter(Boolean);

	for (const setCookie of setCookieHeaders) {
		if (setCookie) {
			// Parse cookie name=value
			const [nameValue] = setCookie.split(";");
			const [name, value] = nameValue.split("=");
			if (name && value) {
				cookies.set(name.trim(), value.trim());
			}
		}
	}
}

// Helper function to get Cookie header string from CookieMap
function getCookieHeader(): string {
	return Array.from(cookies.entries())
		.map(([name, value]) => `${name}=${value}`)
		.join("; ");
}

// Sign in
const signInResponse = await fetch(
	`http://localhost:${process.env.PORT}/api/auth/sign-in/email`,
	{
		method: "POST",
		body: JSON.stringify({
			email: "ghoshalsuvadeep@gmail.com",
			password: "Argha@003026",
			name: "Suvadeep Ghoshal",
		}),
		headers: {
			"content-type": "application/json",
		},
	},
);

// Extract and store cookies
extractCookiesFromResponse(signInResponse);

const signInData = await signInResponse.json();
logger.info(`Sign-in response: ${JSON.stringify(signInData, null, 2)}`);
logger.info(`Stored cookies: ${getCookieHeader()}`);

// Use stored cookies for change-email request
const changeEmailResponse = await fetch(
	`http://localhost:${process.env.PORT}/api/auth/change-email`,
	{
		method: "POST",
		body: JSON.stringify({
			newEmail: "suvadeepghoshal@gmail.com",
		}),
		headers: {
			"content-type": "application/json",
			Cookie: getCookieHeader(),
		},
	},
);
const changeEmailData = await changeEmailResponse.json();
logger.info(
	`Change email response: ${JSON.stringify(changeEmailData, null, 2)}`,
);

/**
 * Demo success log
 *
 * 2025-06-03T17:41:09.755Z INFO [Better Auth]: Sign-in response: {
 * "redirect": false,
 * "token": "R8FvaPDtAHQZXrYzbsHoM1rrITsOcxVw",
 * "user": {
 * 		"id": "Ac3iFGwCcb7VhD9tVVrqC656O56r15GM",
 * 		"email": "iamsg97@outlook.com",
 * 		"name": "Suvadeep Ghoshal",
 * 		"image": "",
 * 		"emailVerified": false,
 * 		"createdAt": "2025-06-02T18:06:51.952Z",
 * 		"updatedAt": "2025-06-02T18:06:51.952Z"
 * 	},
 * }
 * 2025-06-03T17:41:09.755Z INFO [Better Auth]: Stored cookies: better-auth.session_token=R8FvaPDtAHQZXrYzbsHoM1rrITsOcxVw.2tnwpRgHPB7TTpQ2GFyjNhEB9Eu1ZdXvvuDGklM5QoU%3D
 * 2025-06-03T17:41:09.766Z INFO [Better Auth]: Change email response: {
 * 	"status": true
 * }
 */
