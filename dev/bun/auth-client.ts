import { createAuthClient } from "better-auth/client";
import { stripeClient } from "@better-auth/stripe/client";

export const client = createAuthClient({
	// ... your existing config
	plugins: [
		stripeClient({
			subscription: true, //if you want to enable subscription management
		}),
	],
});
