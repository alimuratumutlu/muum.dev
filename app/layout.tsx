import { Metadata } from "next";
import { Inter } from "next/font/google";
import LocalFont from "next/font/local";
import "../global.css";

export const metadata: Metadata = {
	title: {
		default: "muum.dev",
		template: "%s | muum.dev",
	},
	description: "Co-founder of unkey.dev and founder of muum-app.io",
	openGraph: {
		title: "muum.dev",
		description: "Co-founder of unkey.dev and founder of muum-app.io",
		url: "https://muum.dev",
		siteName: "muum.dev",
		images: [
			{
				url: "https://muum.dev/og.png",
				width: 1920,
				height: 1080,
			},
		],
		locale: "en-US",
		type: "website",
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
	twitter: {
		title: "MuumDev",
		card: "summary_large_image",
	},
	icons: {
		shortcut: "/favicon.png",
	},
};
const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
});

const calSans = LocalFont({
	src: "../public/fonts/CalSans-SemiBold.ttf",
	variable: "--font-calsans",
	weight: "800",
});

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className={[inter.variable, calSans.variable].join(" ")}>
			<body
				className={`bg-black ${
					process.env.NODE_ENV === "development" ? "debug-screens" : undefined
				}`}
			>
				{children}
			</body>
		</html>
	);
}
