import "./globals.css";
import Nav from "./components/Nav";
import Providers from "./components/Providers";

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<head>
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="crossorigin" />
				<link
					href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,700;1,400;1,700&display=swap"
					rel="stylesheet"
				/>
				<link
					href="https://fonts.googleapis.com/css2?family=Courier+Prime&display=swap"
					rel="stylesheet"
				/>
			</head>
			<body className={`mx-4 md:mx-48 xl:mx-961 bg-gray-200`}>
				<Providers>
					<Nav />
					{children}
				</Providers>
			</body>
		</html>
	);
}
