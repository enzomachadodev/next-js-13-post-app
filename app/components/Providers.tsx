"use client";

import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Toaster } from "react-hot-toast";

type ProviderProps = {
	children: React.ReactNode;
};

const queryClient = new QueryClient();

const Providers = ({ children }: ProviderProps) => {
	return (
		<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
			<QueryClientProvider client={queryClient}>
				<Toaster />
				<SessionProvider>{children}</SessionProvider>
			</QueryClientProvider>
		</ThemeProvider>
	);
};

export default Providers;
