"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Card, Input, Label } from "@/components/ui/components";
import Link from "next/link";
import { signUp } from "@/lib/auth-client";
import { toast } from "sonner";

export default function SignUp() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");
	const router = useRouter();

	return (
		<Card>
			<h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
			{error && (
				<div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{error}</div>
			)}
			{success && (
				<div className="mb-4 p-2 bg-green-100 text-green-700 rounded">
					{success}
				</div>
			)}

			<form
				onSubmit={async (e: React.FormEvent) => {
					e.preventDefault();
					setLoading(true);
					setError("");
					setSuccess("");

					if (password !== confirmPassword) {
						setError("Passwords do not match");
						setLoading(false);
						return;
					}

					await signUp.email({
						email,
						password,
						name: name,
						callbackURL: "/dashboard",
						fetchOptions: {
							onResponse: (data) => {
								const response = data.response;
								setLoading(false);
								if (response.status >= 200 && response.status < 300) {
									// Success case
									setSuccess("Account created successfully!");
									setTimeout(() => {
										router.push("/dashboard");
									}, 1500);
								} else {
									// Error case
									response
										.json()
										.then((data) => {
											setError(data.message || "Failed to sign up");
										})
										.catch(() => {
											setError("Failed to sign up");
										});
								}
							},
							onRequest: () => {
								setLoading(true);
							},
							onError: (ctx) => {
								toast.error(ctx.error?.message || "Failed to sign up");
							},
							onSuccess: async () => {
								router.push("/dashboard");
							},
						},
					});
				}}
				className="space-y-4"
			>
				<div>
					<Label htmlFor="name">Full Name</Label>
					<Input
						id="name"
						type="text"
						placeholder="Your Name"
						value={name}
						onChange={(e) => setName(e.target.value)}
						required
					/>
				</div>

				<div>
					<Label htmlFor="email">Email</Label>
					<Input
						id="email"
						type="email"
						placeholder="your@email.com"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</div>

				<div>
					<Label htmlFor="password">Password</Label>
					<Input
						id="password"
						type="password"
						placeholder="********"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</div>

				<div>
					<Label htmlFor="confirmPassword">Confirm Password</Label>
					<Input
						id="confirmPassword"
						type="password"
						placeholder="********"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>
				</div>

				<Button type="submit" disabled={loading} className="w-full">
					{loading ? "Creating Account..." : "Sign Up"}
				</Button>
			</form>

			<p className="mt-4 text-center">
				Already have an account?{" "}
				<Link href="/sign-in" className="text-blue-600 hover:underline">
					Sign In
				</Link>
			</p>
		</Card>
	);
}
