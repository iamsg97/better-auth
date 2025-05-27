import { betterAuth, logger } from "better-auth";
import { stripe } from "@better-auth/stripe";
import Stripe from "stripe";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";

const stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY!, {
	apiVersion: "2025-04-30.basil",
});

const prismaClient = new PrismaClient();

export const auth = betterAuth({
	// ... your existing config
	secret: process.env.BETTER_AUTH_SECRET || "",
	database: prismaAdapter(prismaClient, {
		provider: "sqlite",
	}),
	emailAndPassword: {
		requireEmailVerification: true,
		enabled: false,
		sendResetPassword: async ({ user, url }, request) => {
			logger.debug(`Incoming request: ${JSON.stringify(request, null, 2)}`);
			logger.info(`User details: ${JSON.stringify(user, null, 2)}`);
			logger.info(`URL details: ${url}`);
		},
	},
	user: {
		// Ref: packages/better-auth/src/types/options.ts:289
		changeEmail: {
			enabled: true,
			// Ref: packages/better-auth/src/api/routes/update-user.ts:785
			sendChangeEmailVerification: async ({ user, url }, request) => {
				// Below loggers are for debugging purposes by Suvadeep Ghoshal [don't commit]
				logger.debug(`Incoming request: ${JSON.stringify(request, null, 2)}`);
				logger.info(`User details: ${JSON.stringify(user, null, 2)}`);
				logger.info(`URL details: ${url}`);
			},
		},
	},
	plugins: [
		stripe({
			stripeClient,
			stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET!,
			createCustomerOnSignUp: true,
		}),
	],
});
