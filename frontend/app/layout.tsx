import "../styles/globals.css";

export const metadata = {
  title: "EchoRoom",
  description: "Turn Ideas into Actionable Learning",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>

      <body className="bg-gray-50 text-gray-900">
        {children}
      </body>
    </html>
  );
}
