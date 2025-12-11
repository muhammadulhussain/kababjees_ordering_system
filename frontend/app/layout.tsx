// app/layout.tsx
import "../styles/globals.css"; // your global styles

export const metadata = {
  title: "Kababjees Fried Chicken",
  description: "Ordering system",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
