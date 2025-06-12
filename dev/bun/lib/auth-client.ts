import { toast } from "sonner";
import {
	adminClient,
	genericOAuthClient,
	multiSessionClient,
	oidcClient,
	organizationClient,
	passkeyClient,
	twoFactorClient,
} from "../../../packages/better-auth/dist/client/plugins";
import { createAuthClient } from "../../../packages/better-auth/dist/client/react";
// import { stripeClient } from "@better-auth/stripe/client";
import { stripeClient } from "../../../packages/stripe/dist/client";

export const client = createAuthClient({
	baseURL:
		process.env.BETTER_AUTH_BASE_URL ||
		`http://localhost:${process.env.PORT || 4000}`,
	plugins: [
		organizationClient(),
		twoFactorClient({
			onTwoFactorRedirect() {
				window.location.href = "/two-factor";
			},
		}),
		passkeyClient(),
		adminClient(),
		multiSessionClient(),
		oidcClient(),
		genericOAuthClient(),
		stripeClient({
			subscription: true, //if you want to enable subscription management
		}),
	],
	fetchOptions: {
		onError(e) {
			if (e.error.status === 429) {
				toast.error("Too many requests. Please try again later.");
			}
		},
	},
});

export const {
	signUp,
	signIn,
	signOut,
	useSession,
	organization,
	useListOrganizations,
	useActiveOrganization,
} = client;

client.$store.listen("$sessionSignal", async () => {});
