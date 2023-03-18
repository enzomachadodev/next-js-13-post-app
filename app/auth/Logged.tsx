"use client";

import Image from "next/image";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";

type User = {
	image: string;
};

export default function Logged({ image }: User) {
	const { systemTheme, theme, setTheme } = useTheme();
	const [currentTheme, setCurrentTheme] = useState<string | undefined>("light");
	const [open, setOpen] = useState(false);
	const menuRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		setCurrentTheme(theme);
	}, [theme]);

	useEffect(() => {
		function handleClickOutside(event: MouseEvent): void {
			if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
				setOpen(false);
			}
		}

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [menuRef]);

	return (
		<div className="flex gap-8 items-center">
			<button
				onClick={() => setTheme(theme === "light" ? "dark" : "light")}
				className="bg-gray-700 text-white text-sm px-6 py-2 rounded-md"
			>
				{currentTheme}
			</button>
			<div className="relative">
				<button onClick={() => setOpen(true)}>
					<Image
						width={64}
						height={64}
						className="w-14 rounded-full"
						src={image}
						alt="profile pic"
						priority
					/>
				</button>
				{open && (
					<div
						ref={menuRef}
						className="absolute right-0 mt-2 w-48 bg-white shadow-lg shadow-gray-700/20 rounded-md py-2"
					>
						<Link
							href={"/dashboard"}
							className="w-full flex items-start px-4 py-2 text-gray-800 hover:bg-gray-700 hover:text-white"
						>
							My Profile
						</Link>
						<button
							onClick={() => {
								signOut();
								setOpen(false);
							}}
							className="w-full flex items-start px-4 py-2 text-gray-800 hover:bg-gray-700 hover:text-white"
						>
							Sign Out
						</button>
					</div>
				)}
			</div>
		</div>
	);
}
