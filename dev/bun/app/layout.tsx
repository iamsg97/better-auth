"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@../../../demo/nextjs/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<div className="min-h-screen bg-gray-50">
					<header className="bg-white shadow-sm">
						<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
							<div className="flex justify-between h-16 items-center">
								<div className="flex-shrink-0">
									<a href="/" className="text-xl font-bold text-blue-600">
										Better Auth
									</a>
								</div>
								<nav className="flex space-x-4">
									<a
										href="/sign-in"
										className="text-gray-600 hover:text-blue-600"
									>
										Sign In
									</a>
									<a
										href="/sign-up"
										className="text-gray-600 hover:text-blue-600"
									>
										Sign Up
									</a>
									<a
										href="/dashboard"
										className="text-gray-600 hover:text-blue-600"
									>
										Dashboard
									</a>
								</nav>
							</div>
						</div>
					</header>
					<main className="py-10">
						<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
							{children}
							<Toaster richColors closeButton />
						</div>
					</main>
				</div>
			</body>
		</html>
	);
}
