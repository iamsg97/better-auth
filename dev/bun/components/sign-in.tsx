"use client";

import { useState } from "react";
import { signIn } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Button, Card, Input, Label } from "@/components/ui/components";
import Link from "next/link";

export default function SignIn() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const router = useRouter();

	const handleSignIn = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError("");

		try {
			const result = await signIn(email, password);
			if (result.success) {
				router.push("/dashboard");
			} else {
				setError("Sign in failed. Please check your credentials.");
			}
		} catch (err: any) {
			setError(err.message || "An error occurred during sign in");
		} finally {
			setLoading(false);
		}
	};

	return (
		<Card>
			<h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
			{error && (
				<div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{error}</div>
			)}

			<form onSubmit={handleSignIn} className="space-y-4">
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

				<Button type="submit" disabled={loading} className="w-full">
					{loading ? "Signing in..." : "Sign In"}
				</Button>
			</form>

			<p className="mt-4 text-center">
				Don't have an account?{" "}
				<Link href="/sign-up" className="text-blue-600 hover:underline">
					Sign Up
				</Link>
			</p>
		</Card>
	);
}
