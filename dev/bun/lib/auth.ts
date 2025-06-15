import { PrismaClient } from "@prisma/client";
import Stripe from "stripe";
import { prismaAdapter } from "../../../packages/better-auth/dist/adapters/prisma-adapter/index";
import { betterAuth, logger } from "../../../packages/better-auth/dist/index";
import { stripe } from "../../../packages/stripe/dist/index";

const stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY!, {
	apiVersion: "2025-03-31.basil",
});

const prismaClient = new PrismaClient();

export const auth = betterAuth({
	// ... your existing config
	secret: process.env.BETTER_AUTH_SECRET || "",
	database: prismaAdapter(prismaClient, {
		provider: "sqlite",
	}),
	emailAndPassword: {
		requireEmailVerification: false, // temp: set to false for testing | ref: packages/better-auth/src/api/routes/sign-in.ts:501
		enabled: true,
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
			stripeClient: stripeClient,
			stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET!,
			createCustomerOnSignUp: true,
			subscription: {
				enabled: true,
				plans: [
					// Your existing plans
				],
			},
			onCustomerCreate: async ({ customer, stripeCustomer, user }, request) => {
				// Do something with the newly created customer
				console.log(
					`Customer ${customer.id} created for user ${user.id}, and Stripe customer ID is ${stripeCustomer.id}`,
				);
			},
			getCustomerCreateParams: async ({ user, session }, request) => {
				// Customize the Stripe customer creation parameters
				return {
					metadata: {
						referralSource: (user as any).metadata?.referralSource,
					},
				};
			},
			onCustomerEmailUpdate: async ({ user, oldEmail, newEmail }) => {
				console.log(`Customer email updated from ${oldEmail} to ${newEmail}`);
			},
			onCustomerEmailUpdateError({ user, email, error }) {
				logger.error(
					`Error updating customer email: ${email} for user ${user.id}. Error: ${error.message}`,
				);
			},
		}),
	],
	trustedOrigins: ["http://localhost:3000"],
});
