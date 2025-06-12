export default function Home() {
	return (
		<div className="text-center">
			<h1 className="text-4xl font-bold mt-10 mb-6">
				Welcome to Better Auth Demo
			</h1>
			<p className="text-lg mb-8">
				A simple demo of Better Auth with Stripe integration
			</p>

			<div className="flex justify-center space-x-4">
				<a
					href="/sign-up"
					className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
				>
					Sign Up
				</a>
				<a
					href="/sign-in"
					className="px-6 py-3 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition"
				>
					Sign In
				</a>
			</div>
		</div>
	);
}
