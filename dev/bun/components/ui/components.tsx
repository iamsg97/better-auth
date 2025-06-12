"use client";

export function Button({
	children,
	onClick,
	type = "button",
	disabled = false,
	className = "",
}: {
	children: React.ReactNode;
	onClick?: () => void;
	type?: "button" | "submit" | "reset";
	disabled?: boolean;
	className?: string;
}) {
	return (
		<button
			type={type}
			onClick={onClick}
			disabled={disabled}
			className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
		>
			{children}
		</button>
	);
}

export function Input({
	type = "text",
	placeholder,
	value,
	onChange,
	id,
	required = false,
}: {
	type?: string;
	placeholder?: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	id?: string;
	required?: boolean;
}) {
	return (
		<input
			id={id}
			type={type}
			placeholder={placeholder}
			value={value}
			onChange={onChange}
			required={required}
			className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
		/>
	);
}

export function Card({ children }: { children: React.ReactNode }) {
	return (
		<div className="bg-white shadow-md rounded-md p-6 w-full max-w-md">
			{children}
		</div>
	);
}

export function Label({
	htmlFor,
	children,
}: {
	htmlFor?: string;
	children: React.ReactNode;
}) {
	return (
		<label
			htmlFor={htmlFor}
			className="block text-sm font-medium text-gray-700 mb-1"
		>
			{children}
		</label>
	);
}
