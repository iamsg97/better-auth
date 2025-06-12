"use client";

import { useEffect, useState } from "react";
import { client, changeEmail } from "@/lib/auth-client";
import { Button, Card, Input, Label } from "@/components/ui/components";
import { useRouter } from "next/navigation";

export default function Dashboard() {
	const [user, setUser] = useState<any>(null);
	const [loading, setLoading] = useState(true);
	const [newEmail, setNewEmail] = useState("");
	const [emailChangeMessage, setEmailChangeMessage] = useState("");
	const router = useRouter();

	useEffect(() => {
		async function getUser() {
			try {
				const session = await client.getSession();
				if (!session) {
					router.push("/sign-in");
					return;
				}
				setUser(session.user);
			} catch (error) {
				console.error("Failed to get session:", error);
				router.push("/sign-in");
			} finally {
				setLoading(false);
			}
		}

		getUser();
	}, [router]);

	const handleSignOut = async () => {
		try {
			await client.signOut();
			router.push("/sign-in");
		} catch (error) {
			console.error("Failed to sign out:", error);
		}
	};

	const handleEmailChange = async (e: React.FormEvent) => {
		e.preventDefault();
		setEmailChangeMessage("");

		try {
			const result = await changeEmail(newEmail);
			setEmailChangeMessage(
				"Email change initiated. Please check your inbox for verification.",
			);
			setNewEmail("");
		} catch (error: any) {
			setEmailChangeMessage(
				`Error: ${error.message || "Failed to change email"}`,
			);
		}
	};

	if (loading) {
		return <div className="text-center py-10">Loading...</div>;
	}

	return (
		<div className="max-w-4xl mx-auto py-8">
			<h1 className="text-3xl font-bold mb-8">Dashboard</h1>

			{user && (
				<Card>
					<div className="mb-6">
						<h2 className="text-xl font-semibold mb-2">User Profile</h2>
						<p>
							<strong>Name:</strong> {user.name}
						</p>
						<p>
							<strong>Email:</strong> {user.email}
						</p>
						<p>
							<strong>User ID:</strong> {user.id}
						</p>
					</div>

					<div className="mb-6">
						<h3 className="text-lg font-semibold mb-2">Change Email</h3>
						{emailChangeMessage && (
							<div
								className={`p-2 mb-2 rounded ${
									emailChangeMessage.startsWith("Error")
										? "bg-red-100 text-red-700"
										: "bg-green-100 text-green-700"
								}`}
							>
								{emailChangeMessage}
							</div>
						)}
						<form onSubmit={handleEmailChange} className="flex items-end gap-2">
							<div className="flex-1">
								<Label htmlFor="newEmail">New Email</Label>
								<Input
									id="newEmail"
									type="email"
									placeholder="new@email.com"
									value={newEmail}
									onChange={(e) => setNewEmail(e.target.value)}
									required
								/>
							</div>
							<Button type="submit">Change Email</Button>
						</form>
					</div>

					<Button
						onClick={handleSignOut}
						className="bg-red-600 hover:bg-red-700"
					>
						Sign Out
					</Button>
				</Card>
			)}
		</div>
	);
}
